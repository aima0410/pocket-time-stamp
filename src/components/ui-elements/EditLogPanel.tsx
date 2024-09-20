// ---- React ----
import { useState } from 'react';
// ---- Types ----
import AppStatus from 'src/types/AppStatus';
import LogData from 'src/types/LogData';
import { DailyData, Line } from 'src/types/ReportsData';
// ---- Utils ----
import { updateLogInDailyData } from '@utils/updateTimeLineUtils';

// ========== 型定義 ==========
interface Props {
  activities: Array<string>;
  switchAppStatus: (newMode: AppStatus) => void;
  dailyData: Array<DailyData>;
  updateDailyData: (newData: Array<DailyData>) => void;
  editedLog: LogData;
  trackEditedLog: (targetLog: LogData) => void;
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

  // -------- useState：stateの更新処理 --------
  const updateUnconfirmedNewLog = (log: LogData) => {
    setUnconfirmedNewLog(log);
  };

  // -------- イベントハンドラ --------
  const handleClickUpdateButton = () => {
    // 新しいデータを作成
    const newData = updateLogInDailyData(dailyData, unconfirmedNewLog, editedLog);
    // 更新処理
    updateDailyData(newData);
    switchAppStatus('StandbyMode');
  };

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
              onChange={(e) => {
                const newDate = e.target.value.replaceAll('-', '/');
                const newLog = { ...unconfirmedNewLog, date: newDate };
                updateUnconfirmedNewLog(newLog);
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
      <button onClick={handleClickUpdateButton}>更新</button>
      <button onClick={() => switchAppStatus('StandbyMode')}>キャンセル</button>
    </section>
  );
}
