export interface Line {
  startTime: string;
  endTime: string;
  activity: string;
}

export interface DailyData {
  date: string;
  timeLine: Array<Line>;
}

export interface RecordedTime {
  activity: string;
  totalTime: number;
}

export interface MonthlyData {
  date: string;
  recordedTime: Array<RecordedTime>;
}

export interface TotalData extends RecordedTime {}
