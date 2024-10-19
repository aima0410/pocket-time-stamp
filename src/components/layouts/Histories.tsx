'use client';

// ---- React ----
import { useState } from 'react';
// ---- Types ----
import AppStatus from 'src/types/AppStatus';
import LogData from 'src/types/LogData';
// ---- Components ----
import LogsTable from '@ui-elements/LogsTable';
import EditLogPanel from '@ui-elements/EditLogPanel';
import { DailyData } from 'src/types/ReportsData';
// ---- KumaUI ---
import { css } from '@kuma-ui/core';

// ========== CSS宣言 ==========
const wrapperStyle = css`
  width: 100%;
  height: 100%;
  padding: 0 10px;
`;

// ========== 型定義 ==========
interface Props {
  appStatus: AppStatus;
  switchAppStatus: (newMode: AppStatus) => void;
  activities: Array<string>;
  dailyData: Array<DailyData>;
  updateDailyData: (newData: Array<DailyData>) => void;
  displayLogs: Array<LogData>;
}

// ========== コンポーネント関数 ==========
export default function Histories({
  appStatus,
  switchAppStatus,
  activities,
  dailyData,
  updateDailyData,
  displayLogs,
}: Props) {
  // -------- useState：宣言 --------
  const [editedLog, setEditedLog] = useState<LogData | null>(null);

  // -------- useState：stateの更新管理 --------
  const trackEditedLog = (targetLog: LogData | null) => {
    setEditedLog(targetLog);
  };

  // -------- JSX --------
  return (
    <>
      <div className={wrapperStyle}>
        <LogsTable
          switchAppStatus={switchAppStatus}
          dailyData={dailyData}
          updateDailyData={updateDailyData}
          trackEditedLog={trackEditedLog}
          displayLogs={displayLogs}
        />
        {appStatus === 'EditLogMode' && editedLog && (
          <EditLogPanel
            activities={activities}
            switchAppStatus={switchAppStatus}
            dailyData={dailyData}
            updateDailyData={updateDailyData}
            editedLog={editedLog}
            trackEditedLog={trackEditedLog}
          />
        )}
      </div>
    </>
  );
}
