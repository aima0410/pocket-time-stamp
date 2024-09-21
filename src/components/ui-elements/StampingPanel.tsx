// ---- React ----
import { useState, useEffect } from 'react';
// ---- Types ----
import AppStatus from 'src/types/AppStatus';
import LogData from 'src/types/LogData';
import { DailyData, Line } from 'src/types/ReportsData';
// ---- Utils ----
import { addLogToDailyData } from '@utils/timeLineUtils';
import { sortTimelineDescending } from '@utils/sortUtils';

// ========== 型定義 ==========
interface Props {
  switchAppStatus: (newMode: AppStatus) => void;
  timedActivity: string;
  trackTimedActivity: (newTimedActivity: string | null) => void;
  dailyData: Array<DailyData>;
  updateDailyData: (newData: Array<DailyData>) => void;
}

// ========== コンポーネント関数 ==========
export default function StampingPanel({
  switchAppStatus,
  timedActivity,
  trackTimedActivity,
  dailyData,
  updateDailyData,
}: Props) {
  // -------- useState：宣言 --------
  const [isHoverMessage, setIsHoverMessage] = useState(false);
  // {isHoverMessage && <p>記録後に履歴から編集できるよ！</p>}
  const [enteredEndTime, setEnteredEndTime] = useState<string>('');
  const [timedLog, setTimedLog] = useState<LogData>({
    date: '',
    activity: '',
    startTime: '',
    endTime: '',
  });

  // -------- useState：更新関数 --------
  const updateEnteredEndTime = (time: string) => {
    setEnteredEndTime(time);
  };

  const trackTimedLogInfo = (newLog: LogData) => {
    setTimedLog(newLog);
  };

  // -------- イベントハンドラ --------
  const handleMouseHover = (boo: boolean) => {
    setIsHoverMessage(boo);
  };

  const handleChangeEndTimeInput = (newEndTime: string) => {
    setEnteredEndTime(newEndTime);
  };

  const handleClickGetNowTimeButton = () => {
    const currentDate = new Date();
    const nowTime = currentDate.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    });
    setEnteredEndTime(nowTime);
  };

  const handleClickCancelTimerButton = () => {
    trackTimedActivity(null);
    switchAppStatus('StandbyMode');
  };

  const handleClickCompleteTimerButton = () => {
    const comparisonEndTime = new Date(
      // 入力が'00:00'の場合はDateオブジェクト用に'24:00'に修正
      `${timedLog.date} ${enteredEndTime === '00:00' ? '24:00' : enteredEndTime}`,
    ).getTime();
    const comparisonStartTime = new Date(`${timedLog.date} ${timedLog.startTime}`).getTime();

    let endTime: string = enteredEndTime;
    let entryDailyData: Array<DailyData> = JSON.parse(JSON.stringify(dailyData));

    // もし終了時刻が開始時刻より早かった場合は「日付を超えた」と判定
    if (comparisonEndTime < comparisonStartTime) {
      if (window.confirm('終了時刻が日付を超えていますがよろしかったですか？')) {
        window.alert('日付を超えた記録は翌日分に保存されました。');
        // ---- 翌日分のログを作成 ----
        const nextDate = new Date(timedLog.date);
        nextDate.setDate(nextDate.getDate() + 1);
        const nextDateString = nextDate.toLocaleDateString('ja-JP', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
        // ---- 翌日分の新規ログ作成 ----
        const newLog: LogData = {
          ...timedLog,
          date: nextDateString,
          startTime: '00:00',
          endTime: endTime,
        };

        // ---- 翌日分の新規ログをエントリデータに追加 ----
        entryDailyData = addLogToDailyData(dailyData, newLog);
        endTime = '00:00';
      } else {
        return;
      }
    }
    // ---- 本日分の新規ログ作成 ----
    const newLog: LogData = { ...timedLog, endTime: endTime };

    // ---- 本日分の新規ログをエントリデータに追加 ----
    entryDailyData = addLogToDailyData(entryDailyData, newLog);

    // ---- エントリデータを保存 ----
    updateDailyData(entryDailyData);

    // ---- タイムスタンプ終了の後処理 ----
    trackTimedActivity(null);
    switchAppStatus('StandbyMode');
  };

  // -------- useEffect：初回マウント時の処理 --------
  useEffect(() => {
    // ---- 日時 ----
    // 現在の日時を取得
    const currentDate = new Date();
    const date = currentDate.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const defaultTime = currentDate.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    });

    // 現在の時刻より、終了時刻の遅いログを検出
    const currentTime = currentDate.getTime();
    // 日付が同じデータを検出
    const targetData: DailyData | undefined = dailyData.find((data) => data.date === date);
    let overlappingTimeLine: Array<Line> | undefined = undefined;

    if (targetData) {
      const filteredTargetTimeLine = targetData.timeLine.filter((log: Line) => {
        const pastStartTime = new Date(`${date} ${log.startTime}`).getTime();
        const pastEndTime = new Date(`${date} ${log.endTime}`).getTime();
        return pastStartTime < currentTime && currentTime < pastEndTime;
      }) as Array<Line> | undefined;
      overlappingTimeLine = filteredTargetTimeLine
        ? sortTimelineDescending(filteredTargetTimeLine)
        : undefined;
    }

    // 開始時刻を「現在時刻」または「既存の最新ログの終了時刻」に設定
    const startTime = overlappingTimeLine ? overlappingTimeLine[0].endTime : defaultTime;

    const newLog: LogData = {
      ...timedLog,
      date: date,
      activity: timedActivity,
      startTime: startTime,
    };

    updateEnteredEndTime(defaultTime);
    trackTimedLogInfo(newLog);
  }, []);

  // -------- JSX --------
  return (
    <>
      <section>
        <table
          onMouseEnter={() => {
            handleMouseHover(true);
          }}
          onMouseLeave={() => {
            handleMouseHover(false);
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
            min={timedLog.startTime}
            onChange={(e) => {
              const newEndTime = e.target.value;
              handleChangeEndTimeInput(newEndTime);
            }}
          />
          <button onClick={handleClickGetNowTimeButton}>いま</button>
        </div>
        <button onClick={handleClickCancelTimerButton}>キャンセル</button>
        <button onClick={handleClickCompleteTimerButton}>タイマー終了</button>
      </section>
    </>
  );
}
