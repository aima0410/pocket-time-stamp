// ---- Types ----
import AppStatus from 'src/types/AppStatus';

interface Props {
  handleClickSwitchingAppStatus: (newMode: AppStatus) => void;
  activities: Array<string>;
  handleClickTimedActivity: (newTimedActivity: string | null) => void;
}

export default function StandbyPanel({
  handleClickSwitchingAppStatus,
  activities,
  handleClickTimedActivity,
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
        <h2>新規タイムスタンプを作成</h2>
        <ul>{activitiesList}</ul>
        <a
          href=""
          onClick={(e) => {
            e.preventDefault();
            handleClickSwitchingAppStatus('EditActivitiesMode');
          }}
        >
          アクティビティを編集する
        </a>
      </section>
    </>
  );
}
