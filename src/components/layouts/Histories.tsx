// ---- React ----
import { useState, useEffect } from 'react';
// ---- Types ----
import AppStatus from 'src/types/AppStatus';
import LogData from 'src/types/LogData';
// ---- Components ----
import LogsTable from '@ui-elements/LogsTable';
import EditLogPanel from '@ui-elements/EditLogPanel';
import { DailyData } from 'src/types/ReportsData';

// ========== 型定義 ==========
interface Props {
  appStatus: AppStatus;
  switchAppStatus: (newMode: AppStatus) => void;
  activities: Array<string>;
  dailyData: Array<DailyData>;
  updateDailyData: (newData: Array<DailyData>) => void;
}

// ========== コンポーネント関数 ==========
export default function Histories({
  appStatus,
  switchAppStatus,
  activities,
  dailyData,
  updateDailyData,
}: Props) {
  // -------- useState：宣言 --------
  const [editedLog, setEditedLog] = useState<LogData | null>(null);

  // -------- useState：stateの更新管理 --------
  const trackEditedLog = (targetLog: LogData | null) => {
    setEditedLog(targetLog);
  };

  return (
    <>
      <section>
        <LogsTable
          switchAppStatus={switchAppStatus}
          dailyData={dailyData}
          updateDailyData={updateDailyData}
          trackEditedLog={trackEditedLog}
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
      </section>
    </>
  );
}
