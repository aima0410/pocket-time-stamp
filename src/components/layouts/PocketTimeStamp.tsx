'use client';

// ---- React ----
import { useState } from 'react';
// ---- Types ----
import AppStatus from 'src/types/AppStatus';
// ---- Components ----
import Controler from '@layouts/Controler';
import Logs from '@layouts/Logs';
import Reports from '@layouts/Reports';

export default function PocketTimeStamp() {
  const [appStatus, setAppStatus] = useState<AppStatus>('StandbyMode');
  const [activities, setActivities] = useState<Array<string>>(['運動', '読書', '個人開発']);

  const handleClickSwitchingAppStatus = (newMode: AppStatus) => {
    setAppStatus(newMode);
  };

  const handleClickUpdateActivities = (newActivitiesList: Array<string>) => {
    setActivities(newActivitiesList);
  };

  return (
    <>
      <h2>{appStatus}</h2>
      <Controler
        appStatus={appStatus}
        handleClickSwitchingAppStatus={handleClickSwitchingAppStatus}
        activities={activities}
        handleClickUpdateActivities={handleClickUpdateActivities}
      />
      <Logs />
      <Reports />
    </>
  );
}
