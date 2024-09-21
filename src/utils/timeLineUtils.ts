// ---- Types ----
import { DailyData, Line } from 'src/types/ReportsData';
import LogData from 'src/types/LogData';
// ---- Utils ----
import { sortTimelineDescending } from './sortUtils';

// ========== 関数の宣言 ==========
/**
 * 新しいログをdailyDataに追加する関数
 * @param dailyData 既存の日次データ配列
 * @param newLog 追加する新しいログ
 * @returns 更新された日次データ配列
 */
export const addLogToDailyData = (
  dailyData: Array<DailyData>,
  newLog: LogData,
): Array<DailyData> => {
  // 新規タイムラインエントリを作成
  const newTimeLine: Line = {
    startTime: newLog.startTime,
    endTime: newLog.endTime,
    activity: newLog.activity,
  };

  // データを複製
  const newDailyData: Array<DailyData> = [...dailyData];

  // データ内に同じ日付のログがあるか確認
  const sameDateLog = newDailyData.find((data) => data.date === newLog.date);
  if (sameDateLog) {
    // ある場合：エントリをその日付のタイムライン配列へ直接追加
    newDailyData.forEach((data) => {
      if (data.date === sameDateLog.date) {
        data.timeLine.unshift(newTimeLine);
        // 並び替え
        const sortedTimeLine: Array<Line> = sortTimelineDescending(data.timeLine);
        // 隣接したログの統合
        data.timeLine = mergeAdjacentLogs(sortedTimeLine);
      }
    });
  } else {
    // ない場合：新しくログを作成してそこにエントリを追加
    const newDailyLog: DailyData = { date: newLog.date, timeLine: [newTimeLine] };
    newDailyData.unshift(newDailyLog);
  }

  return newDailyData;
};

// --------------------

/**
 * 特定のログを除外する関数
 * @param dailyData 既存の日次データ配列
 * @param editedLog 除外する既存のログ
 * @returns 特定のログを除外したデータ
 */
export const exclusionSomeLogInDailyData = (
  dailyData: Array<DailyData>,
  someLog: LogData,
): Array<DailyData> => {
  const excludedData: Array<DailyData> = dailyData.map((data) => ({
    date: data.date,
    timeLine: data.timeLine.filter((log) => {
      const logDateTime = `${data.date} ${log.startTime}`;
      const editedDateTime = `${someLog.date} ${someLog.startTime}`;
      return logDateTime !== editedDateTime;
    }),
  }));
  return excludedData;
};

// --------------------

/**
 * 隣接するログをマージする関数
 * @param timeLine ソート済みのタイムライン
 * @returns マージされたタイムライン
 */
export function mergeAdjacentLogs(timeLine: Array<Line>): Array<Line> {
  const mergedTimeLine: Array<Line> = [];

  for (let i = 0; i < timeLine.length; i++) {
    const currentLog = timeLine[i];

    if (mergedTimeLine.length === 0) {
      mergedTimeLine.push(currentLog);
      continue;
    }

    const lastMergedLog = mergedTimeLine[mergedTimeLine.length - 1];

    // 現在のログと直前のログのアクティビティが同じで、時間が連続している場合
    if (
      lastMergedLog.activity === currentLog.activity &&
      lastMergedLog.startTime === currentLog.endTime
    ) {
      // ログをマージ
      lastMergedLog.startTime = currentLog.startTime;
    } else {
      // マージできない場合は新しいログとして追加
      mergedTimeLine.push(currentLog);
    }
  }

  return mergedTimeLine;
}
