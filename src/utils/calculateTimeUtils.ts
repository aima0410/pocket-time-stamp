// ---- Types ----
import { Line } from 'src/types/ReportsData';
import { getMilliseconds } from '@utils/calculate';

export function calculateWorkingTime(log: Line) {
  const milliseconds = getMilliseconds(log.startTime, log.endTime);

  // -- WorkingTime --
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}時間 ${minutes}分`;
}
