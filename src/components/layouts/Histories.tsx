// ---- React ----
import { useState, useEffect } from 'react';
// ---- Types ----
import AppStatus from 'src/types/AppStatus';
import LogData from 'src/types/LogData';
// ---- Components ----
import LogsTable from '@ui-elements/LogsTable';
import EditLogPanel from '@ui-elements/EditLogPanel';

// ========== 型定義 ==========
interface Props {
  appStatus: AppStatus;
  switchAppStatus: (newMode: AppStatus) => void;
  activities: Array<string>;
  logs: Array<LogData>;
  updateLogs: (newLogs: Array<LogData>) => void;
}

// ========== コンポーネント関数 ==========
export default function Histories({ appStatus, switchAppStatus, activities, logs, updateLogs }: Props) {
  // -------- useState：宣言 --------
  const [editedLog, setEditedLog] = useState<LogData | null>(null);

  // -------- useState：stateの更新管理 --------
  const trackEditedLog = (targetLog: LogData) => {
    setEditedLog(targetLog);
  };

  return (
    <>
      <section>
        <LogsTable
          switchAppStatus={switchAppStatus}
          logs={logs}
          updateLogs={updateLogs}
          trackEdtidLog={trackEditedLog}
        />
        {appStatus === 'EditLogMode' && editedLog && (
          <EditLogPanel
            activities={activities}
            switchAppStatus={switchAppStatus}
            logs={logs}
            updateLogs={updateLogs}
            editedLog={editedLog}
            trackEditedLog={trackEditedLog}
          />
        )}
      </section>
    </>
  );
}
