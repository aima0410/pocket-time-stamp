interface Line {
  startTime: string;
  endTime: string;
  activity: string;
}

export interface DailyData {
  date: string;
  timeLine: Array<Line>;
}

interface ActivityTime {
  activity: string;
  totalTime: number;
}

export interface MonthlyData {
  date: string;
  recordedTime: Array<ActivityTime>;
}

export interface TotalData extends ActivityTime {}
