// ---- Constants ----
import levelTable from '@assets/LevelTable';
// ---- Utils ----
import { getRandomInt } from '@utils/calculate';

// デモデータ作成に使う関数①
export function getRandomLevel() {
  return getRandomInt(1, levelTable.length);
}

// デモデータ作成に使う関数①
export function getRandomDemoXP(level: number) {
  const max = levelTable[level - 1].requiredExp;
  return getRandomInt(0, max);
}

// 次のレベルアップまでに必要な残りの経験値
export function getRemainingReqExpForNext(level: number, XP: number) {
  const nextLevel = level + 1;
  const targetNextData = levelTable.find((data) => data.level === nextLevel);

  if (targetNextData) {
    const remainingReqExpForNext = targetNextData.totalExp - XP;
    return remainingReqExpForNext;
  }
}

// タイムスタンプ作成時などに獲得する経験値のランダム生成
export function getRandomXP(currentLevel: number): number {
  // 現在のレベルと次のレベルの情報を取得
  const currentLevelData = levelTable.find((data) => data.level === currentLevel);
  const nextLevelData = levelTable.find((data) => data.level === currentLevel + 1);

  if (!currentLevelData || !nextLevelData) {
    throw new Error('レベルデータが見つかりません');
  }

  // 基本となるXP値を、次のレベルアップに必要な経験値の5%〜10%に設定
  const baseXPMin = Math.round(nextLevelData.requiredExp * 0.05);
  const baseXPMax = Math.round(nextLevelData.requiredExp * 0.1);

  // baseXPMinとbaseXPMaxの間でランダムな値を生成
  const randomXP = Math.floor(Math.random() * (baseXPMax - baseXPMin + 1)) + baseXPMin;

  // 低レベルでのブーストを計算
  let boostFactor;
  if (currentLevel < 20) {
    boostFactor = Math.max(0, 2 - currentLevel / 20);
  } else if (currentLevel < 50) {
    boostFactor = Math.max(0, 1 - currentLevel / 50);
  } else {
    boostFactor = 0;
  }

  // ブーストを適用したXPを計算
  const boostedXP = Math.round(randomXP * (1 + boostFactor));

  return boostedXP;
}

// 使い方の例　＝＝＝＝＝＝
// try {
//   getRandomDemoXP(2);
// } catch (error) {
//   (error as Error).message;
// }
