// ---- Types ----
import { Line } from 'src/types/ReportsData';

export function calculateWorkingTime(date: string, log: Line) {
  // -- startTime --
  const startTime = new Date(`${date} ${log.startTime}`).getTime();

  // -- endTime --
  let endDate = new Date(`${date} ${log.endTime}`);
  log.endTime === '00:00' && endDate.setDate(endDate.getDate() + 1);
  const endTime = endDate.getTime();

  // -- WorkingTime --
  const subtractionResult = endTime - startTime;
  const milliseconds = subtractionResult;
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}時間 ${minutes}分`;
}
