// ---- Types ----
import CollectionData from 'src/types/CollectionData';
import { DailyData, Line } from 'src/types/ReportsData';

// ========================================

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

// ========================================
export function sortTimelineDescending(timeline: Array<Line>): Array<Line> {
  return [...timeline].sort((a, b) => {
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

// ========================================
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
