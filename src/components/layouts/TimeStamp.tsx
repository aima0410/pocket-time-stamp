// ---- React ----
import { useState } from 'react';
// ---- Types ----
import AppStatus from 'src/types/AppStatus';
// ---- Components ----
import StandbyPanel from '@ui-elements/StandbyPanel';
import StampingPanel from '@ui-elements/StampingPanel';
import EditActivityPanel from '@ui-elements/EditActivityPanel';

interface Props {
  appStatus: AppStatus;
  switchAppStatus: (newMode: AppStatus) => void;
  activities: Array<string>;
  updateActivities: (newActivitiesList: Array<string>) => void;
}

export default function TimeStamp({
  appStatus,
  switchAppStatus,
  activities,
  updateActivities,
}: Props) {
  // ----  ----
  const [timedActivity, setTimedActivity] = useState<string | null>(null);
  const trackTimedActivity = (newTimedActivity: string | null) => {
    setTimedActivity(newTimedActivity);
  };

  return (
    <>
      <section>
        {appStatus === 'StandbyMode' && (
          <StandbyPanel
            switchAppStatus={switchAppStatus}
            activities={activities}
            trackTimedActivity={trackTimedActivity}
          />
        )}
        {appStatus === 'PlayMode' && timedActivity !== null && (
          <StampingPanel
            switchAppStatus={switchAppStatus}
            timedActivity={timedActivity}
            trackTimedActivity={trackTimedActivity}
          />
        )}
        {appStatus === 'EditActivitiesMode' && (
          <EditActivityPanel
            switchAppStatus={switchAppStatus}
            activites={activities}
            updateActivities={updateActivities}
          />
        )}
      </section>
    </>
  );
}
