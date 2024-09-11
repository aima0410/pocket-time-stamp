// ---- React ----
import { useState, useEffect } from 'react';
// ---- Types ----
import AppStatus from 'src/types/AppStatus';
import LogData from 'src/types/LogData';

// ========== 型定義 ==========
interface Props {
  switchAppStatus: (newMode: AppStatus) => void;
  timedActivity: string;
  trackTimedActivity: (newTimedActivity: string | null) => void;
}

// ========== コンポーネント関数 ==========
export default function StampingPanel({
  switchAppStatus,
  timedActivity,
  trackTimedActivity,
}: Props) {
  // -------- state --------
  const [isHoverMessage, setIsHoverMessage] = useState(false);
  // {isHoverMessage && <p>記録後に履歴から編集できるよ！</p>}
  const [enteredEndTime, setEnteredEndTime] = useState<string>('');
  const [timedLog, setTimedLog] = useState<LogData>({
    date: undefined,
    dayOfWeek: undefined,
    activity: undefined,
    startTime: undefined,
    endTime: undefined,
    restTime: undefined,
  });

  // -------- set関数 --------
  const updateEnteredEndTime = (latestEnteredEndTime: string) => {
    setEnteredEndTime(latestEnteredEndTime);
  };

  const updateTimedLog = (newTimedLog: LogData) => {
    setTimedLog(newTimedLog);
  };

  const handleMouseIsHoverMessage = (boo: boolean) => {
    setIsHoverMessage(boo);
  };

  // 終了時刻を現在時刻に
  const handleClickNowTimeButton = () => {
    const currentDate = new Date();
    const nowTime = currentDate.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    });
    updateEnteredEndTime(nowTime);
  };

  // 終了のスタンプボタン
  const handleClickExitTimerButton = () => {
    const endTime = enteredEndTime;
    const newLog = { ...timedLog, endTime: endTime };

    // ローカルストレージに保存
    const storedLogs = localStorage.getItem('logs');
    const logs = storedLogs ? JSON.parse(storedLogs) : [];
    logs.push(newLog);
    localStorage.setItem('logs', JSON.stringify(logs));

    trackTimedActivity(null);
    switchAppStatus('StandbyMode');
  };

  // -------- useEffect --------
  useEffect(() => {
    // ---- 日時 ----
    const currentDate = new Date();
    const date = currentDate.toLocaleDateString('ja-JP');
    const dayOfWeek = currentDate.getDay();
    const defaultTime = currentDate.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    });
    const startTime = defaultTime;
    const defaultEnteredEndTime = defaultTime;

    const newLog: LogData = {
      ...timedLog,
      date: date,
      dayOfWeek: dayOfWeek,
      activity: timedActivity,
      startTime: startTime,
    };

    setEnteredEndTime(defaultEnteredEndTime);
    updateTimedLog(newLog);
  }, []);

  // -------- JSX --------
  return (
    <>
      <section>
        <table
          onMouseEnter={() => {
            handleMouseIsHoverMessage(true);
          }}
          onMouseLeave={() => {
            handleMouseIsHoverMessage(false);
          }}
        >
          <tbody>
            <tr>
              <th>活動内容</th>
              <td>{timedActivity}</td>
            </tr>
            <tr>
              <th>日　　程</th>
              <td>{timedLog.date}</td>
            </tr>
            <tr>
              <th>開始時刻</th>
              <td>{timedLog.startTime}</td>
            </tr>
          </tbody>
        </table>
        <div>
          <p>終了時刻</p>
          <input
            type="time"
            value={enteredEndTime}
            onChange={(e) => {
              updateEnteredEndTime(e.target.value);
            }}
          />
          <button onClick={handleClickNowTimeButton}>いま</button>
        </div>
        <button
          onClick={() => {
            trackTimedActivity(null);
            switchAppStatus('StandbyMode');
          }}
        >
          キャンセル
        </button>
        <button onClick={handleClickExitTimerButton}>タイマー終了</button>
      </section>
    </>
  );
}
