interface Line {
  startTime: string;
  endTime: string;
  activity: string;
}

export interface DayData {
  date: string;
  timeLine: Array<Line>;
}

interface ActivityTime {
  activity: string;
  totalTime: number;
}

export interface MonthData {
  date: string;
  MonthData: Array<ActivityTime>;
}

export interface TotalData extends ActivityTime {}
