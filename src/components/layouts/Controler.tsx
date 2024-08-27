'use client';

// ---- Types ----
import AppStatus from 'src/types/AppStatus';
// ---- Components ----
import StartTimeRecordPanel from './StartTimeRecordPanel';
import EndTimeRecordPanel from './EndTimeRecordPanel';
import CreateNewActivity from '@ui-elements/CreateNewActivity';

interface Props {
  status: AppStatus;
  activities: Array<string>;
  switchStatusState: (newMode: AppStatus) => void;
  updateActivitiesState: (newActivitiesList: Array<string>) => void;
}

export default function Controler({
  status,
  activities,
  switchStatusState,
  updateActivitiesState,
}: Props) {
  return (
    <section>
      <fieldset>
        <StartTimeRecordPanel activities={activities} switchStatusState={switchStatusState} />
      </fieldset>
      {status === 'PlayMode' && <EndTimeRecordPanel />}
      {status === 'CreateActivityMode' && (
        <CreateNewActivity
          switchStatusState={switchStatusState}
          activities={activities}
          updateActivitiesState={updateActivitiesState}
        />
      )}
    </section>
  );
}
