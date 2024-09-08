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
  handleClickSwitchingAppStatus: (newMode: AppStatus) => void;
  activities: Array<string>;
  handleClickUpdateActivities: (newActivitiesList: Array<string>) => void;
}

export default function TimeStamp({
  appStatus,
  handleClickSwitchingAppStatus,
  activities,
  handleClickUpdateActivities,
}: Props) {
  const [timedActivity, setTimedActivity] = useState<string | null>(null);
  const [editedActivity, setEditedActivity] = useState<string | null>(null);

  const handleClickTimedActivity = (newTimedActivity: string | null) => {
    setTimedActivity(newTimedActivity);
  };

  const handleClickEditedActivity = (newEditedActivity: string | null) => {
    setEditedActivity(newEditedActivity);
  };

  return (
    <>
      <section>
        {appStatus === 'StandbyMode' && (
          <StandbyPanel
            handleClickSwitchingAppStatus={handleClickSwitchingAppStatus}
            activities={activities}
            handleClickTimedActivity={handleClickTimedActivity}
            handleClickEditedActivity={handleClickEditedActivity}
          />
        )}
        {appStatus === 'PlayMode' && (
          <StampingPanel
            handleClickSwitchingAppStatus={handleClickSwitchingAppStatus}
            timedActivity={timedActivity}
            handleClickTimedActivity={handleClickTimedActivity}
          />
        )}
        {appStatus === 'EditActivityMode' && (
          <EditActivityPanel handleClickSwitchingAppStatus={handleClickSwitchingAppStatus} />
        )}
      </section>
    </>
  );
}
