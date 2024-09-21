// ---- React ----
import { useEffect, useState } from 'react';
// ---- Types ----
import AppStatus from 'src/types/AppStatus';
import LogData from 'src/types/LogData';
import { DailyData, Line } from 'src/types/ReportsData';
// ---- Utils ----
import { exclusionSomeLogInDailyData } from '@utils/timeLineUtils';
import insertLog from '@utils/insertLog';

// ========== 型定義 ==========
interface Props {
  activities: Array<string>;
  switchAppStatus: (newMode: AppStatus) => void;
  dailyData: Array<DailyData>;
  updateDailyData: (newData: Array<DailyData>) => void;
  editedLog: LogData;
  trackEditedLog: (targetLog: LogData | null) => void;
}

// ========== コンポーネント関数 ==========
export default function EditLogPanel({
  activities,
  switchAppStatus,
  dailyData,
  updateDailyData,
  editedLog,
  trackEditedLog,
}: Props) {
  // -------- useState：宣言 --------
  const [unconfirmedNewLog, setUnconfirmedNewLog] = useState<LogData>({
    date: editedLog.date,
    activity: editedLog.activity,
    startTime: editedLog.startTime,
    endTime: editedLog.endTime,
  });
  const [currentDate, setCurrentDate] = useState<string>('');
  const [timeWarning, setTimeWarning] = useState<string>('');

  // -------- useState：stateの更新処理 --------
  const updateUnconfirmedNewLog = (log: LogData) => {
    setUnconfirmedNewLog(log);
    validateTimes(log.startTime, log.endTime);
  };

  const fixCurrentDate = () => {
    const now = new Date();
    const currentDateJP = now.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    setCurrentDate(currentDateJP);
  };

  // 時間の検証を行う関数
  const validateTimes = (startTime: string, endTime: string) => {
    const start = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${endTime}`);
    if (end < start) {
      setTimeWarning('終了時刻が開始時刻より前になっています。記録は翌日に跨いだ状態です');
    } else {
      setTimeWarning('');
    }
  };

  // -------- イベントハンドラ --------
  const handleChangeDate = (date: string) => {
    const nowDate = new Date().getDate();
    const enteredDate = new Date(date).getDate();
    if (nowDate < enteredDate) {
      window.alert('選択可能な日付を超えています。');
      return;
    }
    const dateJP = date.replaceAll('-', '/');
    const newLog = { ...unconfirmedNewLog, date: dateJP };
    updateUnconfirmedNewLog(newLog);
  };

  const handleClickUpdateButton = () => {
    const start = new Date(`${unconfirmedNewLog.date} ${unconfirmedNewLog.startTime}`);
    const end = new Date(`${unconfirmedNewLog.date} ${unconfirmedNewLog.endTime}`);

    if (end < start) {
      if (window.confirm('終了時刻が日付を超えていますが、よろしいですか？')) {
        // 日付をまたぐ処理
        const nextDay = new Date(start);
        nextDay.setDate(nextDay.getDate() + 1);
        const nextDayString = nextDay.toLocaleDateString('ja-JP', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });

        const midnightLog: LogData = {
          ...unconfirmedNewLog,
          endTime: '24:00',
        };

        const nextDayLog: LogData = {
          ...unconfirmedNewLog,
          date: nextDayString,
          startTime: '00:00',
        };

        let updatedDailyData = exclusionSomeLogInDailyData(dailyData, editedLog);
        updatedDailyData = insertLog({
          unconfirmedNewLog: midnightLog,
          existingDailyData: updatedDailyData,
        });
        updatedDailyData = insertLog({
          unconfirmedNewLog: nextDayLog,
          existingDailyData: updatedDailyData,
        });

        updateDailyData(updatedDailyData);
        switchAppStatus('StandbyMode');
        trackEditedLog(null);
      }
    } else {
      // 新しいデータを作成
      const existingDailyData = exclusionSomeLogInDailyData(dailyData, editedLog);
      const insertedDailyData = insertLog({
        unconfirmedNewLog: unconfirmedNewLog,
        existingDailyData: existingDailyData,
      });

      // 更新処理
      updateDailyData(insertedDailyData);
      switchAppStatus('StandbyMode');
      trackEditedLog(null);
    }
  };

  // -------- useEffect --------
  useEffect(() => {
    fixCurrentDate();
    validateTimes(unconfirmedNewLog.startTime, unconfirmedNewLog.endTime);
  }, []);

  // -------- JSX --------
  return (
    <section>
      <ul>
        <li>
          <select
            value={unconfirmedNewLog.activity ?? activities[0]}
            onChange={(e) => {
              const newSelectedActivity = e.target.value;
              const newLog = { ...unconfirmedNewLog, activity: newSelectedActivity };
              updateUnconfirmedNewLog(newLog);
            }}
          >
            {activities.map((activity) => (
              <option key={activity} value={activity}>
                {activity}
              </option>
            ))}
          </select>
        </li>
        <li>
          <h3>日程</h3>
          <div>
            <input
              type="date"
              value={unconfirmedNewLog.date.replaceAll('/', '-')}
              max={currentDate.replaceAll('/', '-')}
              onChange={(e) => {
                handleChangeDate(e.target.value);
              }}
            />
          </div>
        </li>
        <li>
          <h3>開始時刻</h3>
          <div>
            <input
              type="time"
              value={unconfirmedNewLog.startTime}
              onChange={(e) => {
                const newStartTime = e.target.value;
                const newLog = { ...unconfirmedNewLog, startTime: newStartTime };
                updateUnconfirmedNewLog(newLog);
              }}
            />
          </div>
        </li>
        <li>
          <h3>終了時刻</h3>
          <div>
            <input
              type="time"
              value={unconfirmedNewLog.endTime}
              onChange={(e) => {
                const newEndTime = e.target.value;
                const newLog = { ...unconfirmedNewLog, endTime: newEndTime };
                updateUnconfirmedNewLog(newLog);
              }}
            />
          </div>
        </li>
      </ul>
      {timeWarning && <p style={{ color: 'red' }}>{timeWarning}</p>}
      <button onClick={handleClickUpdateButton}>更新</button>
      <button onClick={() => switchAppStatus('StandbyMode')}>キャンセル</button>
    </section>
  );
}
