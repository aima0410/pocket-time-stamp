// ---- Types ----
import AppStatus from 'src/types/AppStatus';
import LogData from 'src/types/LogData';
// ---- Utils ----
import { calculateWorkingTime } from '@utils/calculateTimeUtils';

//
interface Props {
  switchAppStatus: (newMode: AppStatus) => void;
  logs: Array<LogData>;
  trackEdtidLog: (targetLog: LogData) => void;
}

export default function LogsTable({ switchAppStatus, logs, trackEdtidLog }: Props) {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>日程</th>
            <th>開始時刻</th>
            <th>終了時刻</th>
            <th>休息タイム</th>
            <th>実働時間</th>
            <th>活動内容</th>
            <th>編集</th>
            <th>削除</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={`${log.date}/${log.startTime}-${log.endTime}`}>
              <td>{log.date}</td>
              <td>{log.startTime}</td>
              <td>{log.endTime}</td>
              <td>{log.restTime}分</td>
              <td>{calculateWorkingTime(log)}</td>
              <td>{log.activity}</td>
              <td>
                <button
                  onClick={() => {
                    trackEdtidLog(log);
                    switchAppStatus('EditLogMode');
                  }}
                >
                  編集
                </button>
              </td>
              <td>
                <button onClick={() => {}}>削除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
