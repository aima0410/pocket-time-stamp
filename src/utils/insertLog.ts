// ---- Types ----
import LogData from 'src/types/LogData';
import { DailyData, Line } from 'src/types/ReportsData';
// ---- Utils ----
import { sortDailyDataByDate, sortTimelineDescending } from './sortUtils';

interface InsertLogArgument {
  unconfirmedNewLog: LogData;
  existingDailyData: Array<DailyData>;
}

/**
 * 既存データを編集済のログで上書きする関数
 * @param unconfirmedNewLog 編集済の上書きしたいエントリーログ
 * @param existingDailyData 「編集前のログ」を除去した既存配列データ
 * @returns insertedDailyData - editedLogで上書きしたdailyData
 **/
export default function insertLog({
  unconfirmedNewLog,
  existingDailyData,
}: InsertLogArgument): Array<DailyData> {
  const updatedLogs: Array<DailyData> = JSON.parse(JSON.stringify(existingDailyData));

  const targetDateIndex = updatedLogs.findIndex(
    (dayData) => dayData.date === unconfirmedNewLog.date,
  );

  if (targetDateIndex === -1) {
    updatedLogs.push({
      date: unconfirmedNewLog.date,
      timeLine: [
        {
          startTime: unconfirmedNewLog.startTime,
          endTime: unconfirmedNewLog.endTime,
          activity: unconfirmedNewLog.activity,
        },
      ],
    });
  } else {
    const targetTimeLine = updatedLogs[targetDateIndex].timeLine;
    const newTimeLine: Array<Line> = [];

    const editedStart = new Date(`1970-01-01T${unconfirmedNewLog.startTime}`);
    const editedEnd = new Date(`1970-01-01T${unconfirmedNewLog.endTime}`);

    for (const existingLog of targetTimeLine) {
      const existingStart = new Date(`1970-01-01T${existingLog.startTime}`);
      const existingEnd = new Date(`1970-01-01T${existingLog.endTime}`);

      if (editedEnd <= existingStart || editedStart >= existingEnd) {
        // 重複しない場合は既存のログをそのまま追加
        newTimeLine.push(existingLog);
      } else {
        // 重複する場合、重複しない部分を追加
        if (existingStart < editedStart) {
          newTimeLine.push({
            startTime: existingLog.startTime,
            endTime: unconfirmedNewLog.startTime,
            activity: existingLog.activity,
          });
        }
        if (existingEnd > editedEnd) {
          newTimeLine.push({
            startTime: unconfirmedNewLog.endTime,
            endTime: existingLog.endTime,
            activity: existingLog.activity,
          });
        }
      }
    }

    // 新しいログを追加
    newTimeLine.push({
      startTime: unconfirmedNewLog.startTime,
      endTime: unconfirmedNewLog.endTime,
      activity: unconfirmedNewLog.activity,
    });

    // 更新されたタイムラインを開始時刻でソート
    const sortedTimeLine = sortTimelineDescending(newTimeLine);

    // 更新されたタイムラインで既存のデータを置き換え
    updatedLogs[targetDateIndex].timeLine = sortedTimeLine;
  }

  // 全体のログを日付でソート（最新の日付が先頭に来るように）
  const insertedDailyData = sortDailyDataByDate(updatedLogs);

  return insertedDailyData;
}
