// ---- Types ----
import LogData from 'src/types/LogData';
import { DailyData, Line } from 'src/types/ReportsData';
// ---- Utils ----
import { sortDailyDataByDate, sortTimelineDescending } from '@utils/sortUtils';
import { mergeAdjacentLogs } from '@utils/timeLineUtils';

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
  // 深い階層まで既存データをまとめてコピー
  const updatedLogs: Array<DailyData> = JSON.parse(JSON.stringify(existingDailyData));

  // 上書きしたいログと同じ日付を持つ既存ログを検索
  const targetDateIndex = updatedLogs.findIndex(
    (dayData) => dayData.date === unconfirmedNewLog.date,
  );

  // どの既存ログとも日付が被らなかった場合はそのまま追加
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
    // 日付が同じ既存ログのタイムラインを取得
    const targetTimeLine = updatedLogs[targetDateIndex].timeLine;

    // エントリータイムラインの作成
    const newTimeLine: Array<Line> = [];

    // 上書きしたいログのDateを取得
    const unconfirmedStart = new Date(`1970-01-01T${unconfirmedNewLog.startTime}`);
    const unconfirmedEnd = new Date(
      `1970-01-01T${unconfirmedNewLog.endTime === '00:00' ? '24:00' : unconfirmedNewLog.endTime}`,
    );

    // タイムラインから既存ログを一つずつ取り出してエントリーデータに追加
    for (const existingLog of targetTimeLine) {
      // 既存ログのDateを取得
      const existingStart = new Date(`1970-01-01T${existingLog.startTime}`);
      const existingEnd = new Date(
        `1970-01-01T${existingLog.endTime === '00:00' ? '24:00' : existingLog.endTime}`,
      );

      if (unconfirmedEnd <= existingStart || unconfirmedStart >= existingEnd) {
        // 重複しない場合は既存のログをそのまま追加
        newTimeLine.push(existingLog);
      } else {
        // 重複する場合、重複しない部分を追加
        if (existingStart < unconfirmedStart) {
          newTimeLine.push({
            startTime: existingLog.startTime,
            endTime: unconfirmedNewLog.startTime,
            activity: existingLog.activity,
          });
        }
        if (existingEnd > unconfirmedEnd) {
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

    // 隣接するログをマージ
    const mergedTimeLine = mergeAdjacentLogs(sortedTimeLine);

    // 作成したタイムラインでエントリーデータを更新
    updatedLogs[targetDateIndex].timeLine = mergedTimeLine;
  }

  // エントリーデータをまとめで日付でソート（最新の日付が先頭に来るように）
  const insertedDailyData = sortDailyDataByDate(updatedLogs);

  return insertedDailyData;
}
