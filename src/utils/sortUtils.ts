// ---- Types ----
import LogData from 'src/types/LogData';
import CollectionData from 'src/types/CollectionData';

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
