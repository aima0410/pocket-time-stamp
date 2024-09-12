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
}

// ========== コンポーネント関数 ==========
export default function Histories({ appStatus, switchAppStatus, activities }: Props) {
  // -------- useState：宣言 --------
  const [logs, setLogs] = useState<Array<LogData>>([]);
  const [editedLog, setEditedLog] = useState<LogData>();

  // -------- useState：stateの更新管理 --------
  const trackEditedLog = (targetLog: LogData) => {
    setEditedLog(targetLog);
  };

  // -------- useEffect：初回マウント時の処理 --------
  useEffect(() => {
    const storedLogs = localStorage.getItem('logs');
    if (storedLogs) {
      const existLogs = JSON.parse(storedLogs);
      setLogs(existLogs);
    }
  }, []);

  return (
    <>
      <section>
        <LogsTable switchAppStatus={switchAppStatus} logs={logs} trackEdtidLog={trackEditedLog} />
        {appStatus === 'EditLogMode' && (
          <EditLogPanel activities={activities} switchAppStatus={switchAppStatus} />
        )}
      </section>
    </>
  );
}
