'use client';

// ---- React ----
import { useState } from 'react';
// ---- Types ----
import AppStatus from 'src/types/AppStatus';
// ---- Components ----
import Controler from '@layouts/Controler';
import PendingLogs from '@layouts/PendingLogs';
import ConfirmedLogs from '@layouts/ConfirmedLogs';

export default function DoneTimeLogger() {
  const [status, setStatus] = useState<AppStatus>('StandbyMode');
  const [activities, setActivities] = useState<Array<string>>([
    '運動',
    '語学学習',
    '個人開発',
    '読書',
  ]);

  // Modeを変更
  const switchStatusState = (newMode: AppStatus) => {
    setStatus(newMode);
  };

  const updateActivitiesState = (newActivitiesList: Array<string>) => {
    setActivities(newActivitiesList);
  };
  return (
    <>
      <Controler
        status={status}
        switchStatusState={switchStatusState}
        activities={activities}
        updateActivitiesState={updateActivitiesState}
      />
      <PendingLogs status={status} activities={activities} />
      <ConfirmedLogs status={status} />
    </>
  );
}
