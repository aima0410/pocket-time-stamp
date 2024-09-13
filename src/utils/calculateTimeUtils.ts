// ---- Types ----
import LogData from 'src/types/LogData';

export function calculateWorkingTime(log: LogData) {
  const startTime = new Date(`${log.date} ${log.startTime}`).getTime();
  const endTime = new Date(`${log.date} ${log.endTime}`).getTime();
  const subtractionResult = endTime - startTime;
  const milliseconds = subtractionResult;
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}時間 ${minutes}分`;
}
