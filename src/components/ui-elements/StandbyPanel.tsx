// ---- Types ----
import AppStatus from 'src/types/AppStatus';

interface Props {
  handleClickSwitchingAppStatus: (newMode: AppStatus) => void;
  activities: Array<string>;
  handleClickTimedActivity: (newTimedActivity: string | null) => void;
  handleClickEditedActivity: (newEditedActivity: string | null) => void;
}

export default function StandbyPanel({
  handleClickSwitchingAppStatus,
  activities,
  handleClickTimedActivity,
  handleClickEditedActivity,
}: Props) {
  const activitiesList = activities.map((activity) => {
    return (
      <li key={activity}>
        <button
          onClick={() => {
            handleClickTimedActivity(activity);
            handleClickSwitchingAppStatus('PlayMode');
          }}
        >
          {activity}
        </button>
      </li>
    );
  });

  return (
    <>
      <section>
        <ul>{activitiesList}</ul>
      </section>
    </>
  );
}
