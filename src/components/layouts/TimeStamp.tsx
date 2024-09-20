// ---- React ----
import { useState } from 'react';
// ---- Types ----
import AppStatus from 'src/types/AppStatus';
import { DailyData } from 'src/types/ReportsData';
// ---- Components ----
import StandbyPanel from '@ui-elements/StandbyPanel';
import StampingPanel from '@ui-elements/StampingPanel';
import EditActivityPanel from '@ui-elements/EditActivityPanel';

interface Props {
  appStatus: AppStatus;
  switchAppStatus: (newMode: AppStatus) => void;
  activities: Array<string>;
  updateActivities: (newActivitiesList: Array<string>) => void;
  dailyData: Array<DailyData>;
  updateDailyData: (newData: Array<DailyData>) => void;
}

export default function TimeStamp({
  appStatus,
  switchAppStatus,
  activities,
  updateActivities,
  dailyData,
  updateDailyData,
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
            dailyData={dailyData}
            updateDailyData={updateDailyData}
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
