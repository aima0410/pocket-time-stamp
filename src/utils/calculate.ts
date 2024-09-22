export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getMilliseconds(startTime: string, endTime: string) {
  // -- startTime --
  const startTimeForCalc = new Date(`2000/01/01 ${startTime}`).getTime();

  // -- endTime --
  let endDate = new Date(`2000/01/01 ${endTime}`);
  endTime === '00:00' && endDate.setDate(endDate.getDate() + 1);
  const endTimeForCalc = endDate.getTime();

  const milliseconds = endTimeForCalc - startTimeForCalc;
  return milliseconds;
}
