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
        data.timeLine = [...sortTimelineDescending(data.timeLine)];
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
 * 特定のログを除外して新しいログを追加する関数
 * @param dailyData 既存の日次データ配列
 * @param newLog 追加する新しいログ
 * @param editedLog 除外する既存のログ
 * @returns 更新された日次データ配列
 */

export const updateLogInDailyData = (
  dailyData: Array<DailyData>,
  newLog: LogData,
  editedLog: LogData,
): Array<DailyData> => {
  // 既存のデータから編集対象のログを除外
  const newData: Array<DailyData> = dailyData.map((data) => ({
    date: data.date,
    timeLine: data.timeLine.filter((log) => {
      const logDateTime = `${data.date} ${log.startTime}`;
      const editedDateTime = `${editedLog.date} ${editedLog.startTime}`;
      return logDateTime !== editedDateTime;
    }),
  }));

  // 新しいログを追加
  return addLogToDailyData(newData, newLog);
};
