// ---- Types ----
import { Line, RecordedTime, DailyData, MonthlyData, TotalData } from 'src/types/ReportsData';
import { getMilliseconds } from '@utils/calculate';

/**
 * 日次データから月次データを作成する関数
 * @param dailyData - 日次データの配列
 * @returns 月次データの配列
 * @description
 * この関数はdailyDataを受け取り、それをmonthlyDataに変換します。
 * 各日のtimeLineデータを集計し、月ごとの各アクティビティのtotalTimeを計算。
 */

export function createMonthlyData(dailyData: Array<DailyData>): Array<MonthlyData> {
  // dailyDataを深い階層までまとめてコピー
  const copiedDailyData: Array<DailyData> = JSON.parse(JSON.stringify(dailyData));
  // monthlyDataのエントリーを用意
  const monthlyData: Array<MonthlyData> = [];
  // エントリーに追加した年月をリストで管理
  let storedDateList: Array<string> = [];

  // ---- dailyDataからmonthlyDataを作成 ----
  copiedDailyData.forEach((data) => {
    // 現在処理中の年月を作成
    const [year, month] = data.date.split('/');
    const processingDate = year + '/' + month;

    // 現在処理中の年月と同じdateを持つデータがすでにエントリーに存在しているかどうか
    const targetStoredDate = storedDateList.find((storedDate) => storedDate === processingDate);

    if (targetStoredDate === undefined) {
      // ---- 存在していない場合 ----
      // 現在処理中の年月をエントリーに追加
      monthlyData.push({ date: processingDate, recordedTime: [] } as MonthlyData);
      // 現在処理中の年月を管理リストに追加
      storedDateList.push(processingDate);
    }

    // エントリーから現在処理中のdailyDataと同じ年月を持つログのインデックスを取得
    const targetMonthDataIndex = monthlyData.findIndex((m) => m.date === processingDate);

    // 現在処理中のdailyDataのtimeLineから、recordedTimeのエントリーを作成
    const entryRecordedTime: Array<RecordedTime> = data.timeLine.map((t) => {
      // ---- totalTimeの作成 ----
      const milliseconds = getMilliseconds(t.startTime, t.endTime);
      const minutes = Math.round(milliseconds / 1000 / 60);

      // ---- recordedTimeのログを作成 ----
      return { activity: t.activity, totalTime: minutes } as RecordedTime;
    });

    // monthlyDataとrecordedTimeのエントリーを統合
    entryRecordedTime.forEach((processingEntryRecordedTime) => {
      // monthlyDataのエントリーに、現在処理中のrecordedTimeエントリーと同じアクティビティを持つログのインデックスを検索
      const targetRecordedTimeIndex = monthlyData[targetMonthDataIndex].recordedTime.findIndex(
        (r) => r.activity === processingEntryRecordedTime.activity,
      );

      if (targetRecordedTimeIndex === -1) {
        // ---- 存在しない場合 ----
        // monthlyDataエントリーに現在処理中のrecordedTimeエントリーをそのままプッシュ
        monthlyData[targetMonthDataIndex].recordedTime.push(processingEntryRecordedTime);
      } else {
        // ---- 存在する場合 ----
        // monthlyDataエントリーの既存ログのtotalTimeに現在処理中のrecordedTimeエントリーを加算
        monthlyData[targetMonthDataIndex].recordedTime[targetRecordedTimeIndex].totalTime +=
          processingEntryRecordedTime.totalTime;
      }
    });

    // RecordedTimeの配列をtotalTimeの降順にソート
    monthlyData[targetMonthDataIndex].recordedTime.sort((a, b) => b.totalTime - a.totalTime);
  });

  return monthlyData;
}
// ========================================
/**
 * monthlyDataからtotalDataを作成する関数
 * @param monthlyData - 月次データの配列
 * @returns totalData - 累計データの配列
 * @description
 * この関数はmonthlyDataを受け取り、それをtotalDataに変換します。
 * 各月のrecordedTimeデータを集計し、月ごとの各アクティビティのtotalTimeを計算。
 */
export function createTotalData(monthlyData: Array<MonthlyData>): Array<TotalData> {
  const totalData: Array<TotalData> = [];

  // recordedTimeからtotalDataを作成
  monthlyData.forEach((data) => {
    data.recordedTime.forEach((processingRecord) => {
      const targetEntryIndex = totalData.findIndex(
        (entry) => entry.activity === processingRecord.activity,
      );

      if (targetEntryIndex === -1) {
        // ---- 存在しない場合 ----
        // 現在処理中のrecordedTimeをそのままtotalDataにプッシュ
        totalData.push({
          activity: processingRecord.activity,
          totalTime: processingRecord.totalTime,
        } as TotalData);
      } else {
        // ---- 存在する場合 ----
        // 同じアクティビティのtotalTimeに加算
        totalData[targetEntryIndex].totalTime += processingRecord.totalTime;
      }
    });
  });

  // totalTimeで降順に並び替え
  totalData.sort((a, b) => b.totalTime - a.totalTime);

  return totalData;
}
