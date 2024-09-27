// ---- React ----
import { useState, useEffect } from 'react';
// ---- Types ----
import AppStatus from 'src/types/AppStatus';
import LogData from 'src/types/LogData';
import Pokemon from 'src/types/Pokemon';
import CollectionData from 'src/types/CollectionData';
import { DailyData, Line } from 'src/types/ReportsData';
// ---- Utils ----
import { addLogToDailyData } from '@utils/timeLineUtils';
import { sortTimelineDescending } from '@utils/sortUtils';
import { grownCollection } from '@utils/collectionUtils';
// ---- KumaUI ----
import { css } from '@kuma-ui/core';

// ========== 型定義 ==========
interface Props {
  switchAppStatus: (newMode: AppStatus) => void;
  timedActivity: string;
  trackTimedActivity: (newTimedActivity: string | null) => void;
  dailyData: Array<DailyData>;
  updateDailyData: (newData: Array<DailyData>) => void;
  pokemonList: Array<Pokemon>;
  collectionData: Array<CollectionData>;
  updateCollectionData: (newData: Array<CollectionData>) => void;
  selectedCollectionData: CollectionData;
  trackExpGained: (newInfo: { exp: number; isEvolution: boolean; isLevelUp: boolean }) => void;
}

// ========== コンポーネント関数 ==========
export default function StampingPanel({
  switchAppStatus,
  timedActivity,
  trackTimedActivity,
  dailyData,
  updateDailyData,
  pokemonList,
  collectionData,
  updateCollectionData,
  selectedCollectionData,
  trackExpGained,
}: Props) {
  // -------- useState：宣言 --------
  const [isHoverMessage, setIsHoverMessage] = useState(false);
  // {isHoverMessage && <p>記録後に履歴から編集できるよ！</p>}
  const [errorMessage, setErrorMessage] = useState<string>('');
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

    // ---- タイムスタンプ終了の後処理① ----
    trackTimedActivity(null);
    switchAppStatus('DoneMode');

    // ---- タイムスタンプ終了の後処理②：ポケモンの経験値獲得 ----
    const grownCollectionData: Array<CollectionData> = grownCollection(collectionData, pokemonList);
    updateCollectionData(grownCollectionData);

    const targetGrownCollectionData = grownCollectionData.find(
      (data) => data.id === selectedCollectionData.id,
    );
    if (targetGrownCollectionData) {
      const expGained = targetGrownCollectionData.XP - selectedCollectionData.XP;
      const isEvolution = targetGrownCollectionData.name !== selectedCollectionData.name;
      const isLevelUp = targetGrownCollectionData.level !== selectedCollectionData.level;
      trackExpGained({ exp: expGained, isEvolution, isLevelUp });
    }
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
      // 同じ日付のTimeLineから、終了時刻が現在時刻より大きいLogデータのみfilterして配列を返す。
      const filteredTargetTimeLine = targetData.timeLine.filter((log: Line) => {
        // const pastStartTime = new Date(`${date} ${log.startTime}`).getTime();
        const pastEndTime = new Date(`${date} ${log.endTime}`).getTime();
        return currentTime < pastEndTime;
      }) as Array<Line>;
      // filterで獲得したデータがあればソートしてoverlappingTimeLineに追加。
      // なければundefinedを返す。
      overlappingTimeLine =
        filteredTargetTimeLine.length === 0
          ? undefined
          : sortTimelineDescending(filteredTargetTimeLine);
    }

    // 開始時刻を「現在時刻」または「既存の最新ログの終了時刻」に設定
    const startTime = overlappingTimeLine ? overlappingTimeLine[0].endTime : defaultTime;
    const endTime = startTime;

    const newLog: LogData = {
      ...timedLog,
      date: date,
      activity: timedActivity,
      startTime: startTime,
      endTime: endTime,
    };

    updateEnteredEndTime(endTime);
    trackTimedLogInfo(newLog);
  }, []);

  useEffect(() => {
    if (timedLog.startTime === enteredEndTime) {
      setErrorMessage('終了時刻を変更してください。');
    } else {
      setErrorMessage('');
    }
  }, [enteredEndTime]);

  // -------- JSX --------
  return (
    <>
      <div className="modal-back">
        <div
          className={`modal ${css`
            justify-content: center;
            align-items: center;
            padding-top: 80px;
            overflow-y: hidden;
          `}`}
        >
          {isHoverMessage && (
            <div
              className={css`
                position: absolute;
                top: 16px;
                right: 16px;
                color: #4d4d4d;
                z-index: 9999;
                padding: 30px;
                box-shadow: 0 3px 6px #3333339c;
                background-color: #ffb0d8;
                line-height: 1.7em;
                border-radius: 10px;
              `}
            >
              作成後にRecentHistoriesから編集できるよ！
            </div>
          )}
          <div
            className={css`
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              border-radius: 10px;
              padding: 50px 70px;
              border: solid 1px #333;
              margin-bottom: 30px;
            `}
          >
            <table
              onMouseOver={() => {
                handleMouseHover(true);
              }}
              onMouseLeave={() => {
                handleMouseHover(false);
              }}
              className={css`
                position: relative;
                padding-top: 30px;
                margin-bottom: 30px;
              `}
            >
              <tbody className="stampMode">
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
              <h3
                className={css`
                  padding-top: 10px;
                  font-size: 20px;
                  font-weight: 600;
                  margin-bottom: 16px;
                  color: #545454;
                `}
              >
                終了時刻
              </h3>
              <div
                className={css`
                  display: flex;
                  justify-content: center;
                  position: relative;
                  left: 25px;
                  margin-bottom: 10px;
                `}
              >
                <input
                  type="time"
                  value={enteredEndTime}
                  min={timedLog.startTime}
                  onChange={(e) => {
                    const newEndTime = e.target.value;
                    handleChangeEndTimeInput(newEndTime);
                  }}
                  className={css`
                    width: 100px;
                    text-align: center;
                    font-size: 20px;
                    padding-left: 8px;
                    margin-right: 10px;
                  `}
                  autoFocus
                />
                <button
                  className={css`
                    display: block;
                    width: 60px;
                    height: 60px;
                    padding: 0;
                    margin: 0;
                    font-size: 12px;
                    border-radius: 50%;
                  `}
                  onClick={handleClickGetNowTimeButton}
                >
                  いま
                </button>
              </div>
              <div
                className={css`
                  margin-bottom: 10px;
                  color: #ea4b4b;
                  font-size: 13px;
                `}
              >
                {errorMessage}
              </div>
            </div>
          </div>
          <button
            onClick={handleClickCompleteTimerButton}
            disabled={timedLog.startTime === enteredEndTime}
          >
            タイマー終了
          </button>
          <button className="cancel" onClick={handleClickCancelTimerButton}>
            キャンセル
          </button>
        </div>
      </div>
    </>
  );
}
