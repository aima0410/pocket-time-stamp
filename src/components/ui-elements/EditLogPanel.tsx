// ---- React ----
import { useEffect, useState } from 'react';
// ---- Types ----
import AppStatus from 'src/types/AppStatus';
import LogData from 'src/types/LogData';
import { DailyData, Line } from 'src/types/ReportsData';
// ---- Utils ----
import { exclusionSomeLogInDailyData } from '@utils/timeLineUtils';
import insertLog from '@utils/insertLog';
// ---- KumaUI ----
import { css } from '@kuma-ui/core';

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
  // 未確認の新しいログを更新し、時間の検証を行う関数
  const updateUnconfirmedNewLog = (log: LogData) => {
    setUnconfirmedNewLog(log);
    validateTimes(log.startTime, log.endTime);
  };

  // 現在の日付を設定する関数
  const fixCurrentDate = () => {
    const now = new Date();
    const currentDateJP = now.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    setCurrentDate(currentDateJP);
  };

  // 開始時間と終了時間の妥当性を検証する関数
  const validateTimes = (startTime: string, endTime: string) => {
    const start = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${endTime}`);
    if (end < start && endTime !== '00:00') {
      setTimeWarning('終了時刻が日付を超えています。');
    } else if (endTime === startTime) {
      setTimeWarning('活動時間が0分なため更新できません。');
    } else {
      setTimeWarning('');
    }
  };

  // -------- イベントハンドラ --------
  // 日付変更時のハンドラー
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

  // 更新ボタンクリック時のハンドラー
  const handleClickUpdateButton = () => {
    const start = new Date(`${unconfirmedNewLog.date} ${unconfirmedNewLog.startTime}`);
    const end = new Date(
      `${unconfirmedNewLog.date} ${unconfirmedNewLog.endTime === '00:00' ? '24:00' : unconfirmedNewLog.endTime}`,
    );

    // 既存のデータから編集対象のログを除外します
    let entryDailyData = exclusionSomeLogInDailyData(dailyData, editedLog);

    if (end < start && window.confirm('終了時刻が日付を超えていますが、よろしいですか？')) {
      // 日付をまたぐ場合の処理
      const nextDay = new Date(start);
      nextDay.setDate(nextDay.getDate() + 1);
      const nextDayString = nextDay.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });

      // 日付をまたぐログを2つに分割します
      const midnightLog: LogData = { ...unconfirmedNewLog, endTime: '00:00' };
      const nextDayLog: LogData = {
        ...unconfirmedNewLog,
        date: nextDayString,
        startTime: '00:00',
      };

      // 分割したログをそれぞれinsertLog関数で挿入します
      entryDailyData = insertLog({
        unconfirmedNewLog: midnightLog,
        existingDailyData: entryDailyData,
      });
      entryDailyData = insertLog({
        unconfirmedNewLog: nextDayLog,
        existingDailyData: entryDailyData,
      });
    } else {
      // 日付をまたがない通常の場合、そのままinsertLog関数で挿入します
      entryDailyData = insertLog({ unconfirmedNewLog, existingDailyData: entryDailyData });
    }

    // 更新されたデータを親コンポーネントに渡し、アプリの状態を更新します
    updateDailyData(entryDailyData);
    switchAppStatus('StandbyMode');
    trackEditedLog(null);
  };

  // -------- useEffect --------
  useEffect(() => {
    fixCurrentDate();
    validateTimes(unconfirmedNewLog.startTime, unconfirmedNewLog.endTime);
  }, []);

  // -------- JSX --------
  return (
    <div className="modal-back">
      <div className="modal">
        <ul>
          <li className="editLogList">
            <select
              className={css`
                padding: 20px 30px;
                font-size: 20px;
                font-weight: 600;
                border: solid 2px #333;
                border-radius: 6px;
              `}
              value={unconfirmedNewLog.activity ?? editedLog.activity}
              onChange={(e) => {
                const newSelectedActivity = e.target.value;
                const newLog = { ...unconfirmedNewLog, activity: newSelectedActivity };
                updateUnconfirmedNewLog(newLog);
              }}
            >
              {!activities.includes(editedLog.activity) && <option>{editedLog.activity}</option>}
              {activities.map((activity) => (
                <option key={activity} value={activity}>
                  {activity}
                </option>
              ))}
            </select>
          </li>
          <li className="editLogList">
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
          <li className="editLogList">
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
          <li className="editLogList">
            <h3>終了時刻</h3>
            <div
              className={css`
                position: relative;
                width: 460px;
              `}
            >
              <input
                type="time"
                value={unconfirmedNewLog.endTime}
                onChange={(e) => {
                  const newEndTime = e.target.value;
                  const newLog = { ...unconfirmedNewLog, endTime: newEndTime };
                  updateUnconfirmedNewLog(newLog);
                }}
              />
              <div
                className={css`
                  position: relative;
                `}
              >
                {timeWarning && (
                  <p
                    className={css`
                      position: absolute;
                      top: 5px;
                      left: 0;
                      text-align: center;
                      color: red;
                      width: 100%;
                      font-size: 13px;
                    `}
                  >
                    {timeWarning}
                  </p>
                )}
              </div>
            </div>
          </li>
        </ul>
        <button
          onClick={handleClickUpdateButton}
          disabled={unconfirmedNewLog.endTime === unconfirmedNewLog.startTime}
        >
          更新
        </button>
        <button className="cancel" onClick={() => switchAppStatus('StandbyMode')}>
          キャンセル
        </button>
      </div>
    </div>
  );
}
