// ---- Types ----
import LogData from 'src/types/LogData';
import CollectionData from 'src/types/CollectionData';
import { DailyData, Line } from 'src/types/ReportsData';

interface insertLogArgument {
  newLog: LogData;
  existingLogs: Array<LogData>;
}

export function insertLog({ newLog, existingLogs }: insertLogArgument) {
  const newStart = new Date(`${newLog.date} ${newLog.startTime}`);
  const newEnd = new Date(`${newLog.date} ${newLog.endTime}`);

  let updatedLogs = [];

  for (const log of existingLogs) {
    const existingStart = new Date(`${log.date} ${log.startTime}`);
    const existingEnd = new Date(`${log.date} ${log.endTime}`);

    if (log.date !== newLog.date) {
      // 日付が異なるログはそのまま追加
      updatedLogs.push(log);
    } else {
      // 日付が同じ場合、重なりを処理する
      if (newEnd <= existingStart || newStart >= existingEnd) {
        // 重なっていない場合
        updatedLogs.push(log);
      } else if (newStart <= existingStart && newEnd >= existingEnd) {
        // 新規ログが既存ログを完全に包含する場合
        // 既存ログを破棄する（何もしない）
      } else if (newStart > existingStart && newEnd < existingEnd) {
        // 新規ログが既存ログの中に収まる場合
        // 既存ログを前半と後半に分割して追加
        updatedLogs.push({ ...log, endTime: newLog.startTime });
        updatedLogs.push({ ...log, startTime: newLog.endTime });
      } else if (newStart > existingStart && newStart < existingEnd) {
        // 新規ログの開始時刻が既存ログの途中にあり、終了時刻が既存ログの終了時刻を超えている場合
        updatedLogs.push({ ...log, endTime: newLog.startTime });
      } else if (newEnd > existingStart && newEnd < existingEnd) {
        // 新規ログの開始時刻が既存ログの開始時刻より前で、終了時刻が既存ログの途中にある場合
        updatedLogs.push({ ...log, startTime: newLog.endTime });
      }
    }
  }

  // 新規ログを追加する
  updatedLogs.push(newLog);

  // 日付と開始時刻でログをソートする
  updatedLogs.sort((a, b) => {
    if (a.date !== b.date) {
      return a.date.localeCompare(b.date);
    } else {
      return a.startTime.localeCompare(b.startTime);
    }
  });

  return updatedLogs;
}

export function sortPokemonCollection(pokemonArray: Array<CollectionData>): Array<CollectionData> {
  return pokemonArray.sort((a, b) => {
    // selected: true のオブジェクトを先頭に
    if (a.selected && !b.selected) return -1;
    if (b.selected && !a.selected) return 1;

    // レベルで降順ソート
    if (a.level !== b.level) return b.level - a.level;

    // レベルが同じ場合、XPで降順ソート
    return b.XP - a.XP;
  });
}

export function sortTimelineDescending(timeline: Array<Line>): Array<Line> {
  return timeline.sort((a, b) => {
    // "00:00"形式の文字列を分と秒に分割
    const [aHours, aMinutes] = a.startTime.split(':').map(Number);
    const [bHours, bMinutes] = b.startTime.split(':').map(Number);

    // 分単位の総時間に変換
    const aTime = aHours * 60 + aMinutes;
    const bTime = bHours * 60 + bMinutes;

    // 降順にソート（bTime - aTime）
    return bTime - aTime;
  });
}

/**
 * DailyDataの配列を日付順にソートする関数
 * @param dailyDataArray ソートするDailyDataの配列
 * @returns 日付順にソートされた新しいDailyDataの配列（最新のものが先頭）
 */
export function sortDailyDataByDate(dailyDataArray: Array<DailyData>): Array<DailyData> {
  return [...dailyDataArray].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime(); // 降順（最新が先頭）
  });
}
