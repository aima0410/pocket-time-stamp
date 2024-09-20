// ---- React ----
import { useCallback } from 'react';
// ---- Types ----
import AppStatus from 'src/types/AppStatus';
import LogData from 'src/types/LogData';
import { DailyData, Line } from 'src/types/ReportsData';
// ---- Utils ----
import { calculateWorkingTime } from '@utils/calculateTimeUtils';

// ========== 型定義 ==========
interface Props {
  switchAppStatus: (newMode: AppStatus) => void;
  dailyData: Array<DailyData>;
  updateDailyData: (newData: Array<DailyData>) => void;
  trackEditedLog: (targetLog: LogData) => void;
}

// ========== コンポーネント関数 ==========
export default function LogsTable({
  switchAppStatus,
  dailyData,
  updateDailyData,
  trackEditedLog,
}: Props) {
  // -------- イベントハンドラ --------
  const handleClickDeleteButton = useCallback(
    (logToDelete: LogData) => {
      if (window.confirm(`本当に削除しますか？`)) {
        const newData = dailyData.map((data) => {
          const newTimeLine = data.timeLine.filter((log) => {
            const existData = `${data.date} ${log.startTime}`;
            const toDeleteData = `${logToDelete.date} ${logToDelete.startTime}`;
            return existData !== toDeleteData;
          });
          return { date: data.date, timeLine: newTimeLine };
        });

        updateDailyData(newData);
      }
    },
    [dailyData],
  );

  const handleClickEditButton = (logToEdit: LogData) => {
    trackEditedLog(logToEdit);
    switchAppStatus('EditLogMode');
  };

  // -------- JSX --------
  return (
    <table>
      <thead>
        <tr>
          <th>日程</th>
          <th>開始時刻</th>
          <th>終了時刻</th>
          <th>実働時間</th>
          <th>活動内容</th>
          <th>編集</th>
          <th>削除</th>
        </tr>
      </thead>
      <tbody>
        {dailyData.map((data) => (
          // ↓TableRowコンポーネントは同一ファイル内で宣言
          <TableRow
            key={data.date}
            switchAppStatus={switchAppStatus}
            trackEditedLog={trackEditedLog}
            date={data.date}
            timeLine={data.timeLine}
            handleClickEditButton={handleClickEditButton}
            handleClickDeleteButton={handleClickDeleteButton}
          />
        ))}
      </tbody>
    </table>
  );
}

// ========== 型定義 ==========
interface TableRowProps {
  switchAppStatus: (newMode: AppStatus) => void;
  trackEditedLog: (targetLog: LogData) => void;
  date: string;
  timeLine: Array<Line>;
  handleClickEditButton: (logToEdit: LogData) => void;
  handleClickDeleteButton: (logToDelete: LogData) => void;
}

// ========== コンポーネント関数 ==========
function TableRow({
  switchAppStatus,
  trackEditedLog,
  date,
  timeLine,
  handleClickEditButton,
  handleClickDeleteButton,
}: TableRowProps) {
  // -------- JSX --------
  return (
    <>
      {timeLine.map((log) => (
        <tr key={`${date}-${log.startTime}-${log.endTime}`}>
          <td>{date}</td>
          <td>{log.startTime}</td>
          <td>{log.endTime}</td>
          <td>{calculateWorkingTime(date, log)}</td>
          <td>{log.activity}</td>
          <td>
            <button
              onClick={() => {
                handleClickEditButton({
                  date: date,
                  startTime: log.startTime,
                  endTime: log.endTime,
                  activity: log.activity,
                });
              }}
            >
              編集
            </button>
          </td>
          <td>
            <button
              onClick={() => {
                handleClickDeleteButton({
                  date: date,
                  startTime: log.startTime,
                  endTime: log.endTime,
                  activity: log.activity,
                });
              }}
            >
              削除
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}
