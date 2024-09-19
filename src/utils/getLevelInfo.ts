// ---- Constants ----
import levelTable from '@assets/LevelTable';
// ---- Utils ----
import { getRandomInt } from '@utils/calculate';

export function getRandomLevel() {
  return getRandomInt(1, levelTable.length);
}

export function getRandomXP(level: number) {
  const max = levelTable[level - 1].requiredExp;
  return getRandomInt(0, max);
}
