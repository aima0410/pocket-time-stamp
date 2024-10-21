'use client';

// ---- React ----
import { useCallback, useState } from 'react';
// ---- Types ----
import AppStatus from 'src/types/AppStatus';
import LogData from 'src/types/LogData';
import { DailyData } from 'src/types/ReportsData';
// ---- Utils ----
import { calculateWorkingTime } from '@utils/calculateTimeUtils';
// ---- KumaUI ----
import { css } from '@kuma-ui/core';

// ========== CSS宣言 ==========
const tableStyle = css`
  overflow-y: scroll;
  width: 100%;
`;

const buttonStyle = css`
  padding: 10px 20px;
  font-size: 14px;
`;

// ========== 型定義 ==========
interface Props {
  switchAppStatus: (newMode: AppStatus) => void;
  dailyData: Array<DailyData>;
  updateDailyData: (newData: Array<DailyData>) => void;
  trackEditedLog: (targetLog: LogData) => void;
  displayLogs: Array<LogData>;
}

// ========== コンポーネント関数 ==========
export default function LogsTable({
  switchAppStatus,
  dailyData,
  updateDailyData,
  trackEditedLog,
  displayLogs,
}: Props) {
  // -------- useState：宣言 --------
  const [visibleItems, setVisibleItems] = useState<number>(50);

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

  const handleLoadMore = useCallback(() => {
    setVisibleItems((prevItems) => prevItems + 50);
  }, []);

  // -------- JSX --------
  return (
    <div className="logs">
      <table className={tableStyle}>
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
          {displayLogs.slice(0, visibleItems).map((log, index) => (
            <tr key={`${log.date}-${log.startTime}-${index}`}>
              <td>{log.date}</td>
              <td>{log.startTime}</td>
              <td>{log.endTime}</td>
              <td>{calculateWorkingTime(log)}</td>
              <td>{log.activity}</td>
              <td>
                <button className={buttonStyle} onClick={() => handleClickEditButton(log)}>
                  編集
                </button>
              </td>
              <td>
                <button
                  className={buttonStyle}
                  style={{ backgroundColor: '#333' }}
                  onClick={() => handleClickDeleteButton(log)}
                >
                  削除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {visibleItems < displayLogs.length && (
        <button style={{ margin: '20px 0' }} onClick={handleLoadMore}>
          もっと見る
        </button>
      )}
    </div>
  );
}
