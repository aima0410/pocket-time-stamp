// ---- Types ----
import AppStatus from 'src/types/AppStatus';

interface Props {
  switchAppStatus: (newMode: AppStatus) => void;
  activities: Array<string>;
  trackTimedActivity: (newTimedActivity: string | null) => void;
}

export default function StandbyPanel({
  switchAppStatus,
  activities,
  trackTimedActivity,
}: Props) {
  const activitiesList = activities.map((activity) => {
    return (
      <li key={activity}>
        <button
          onClick={() => {
            trackTimedActivity(activity);
            switchAppStatus('PlayMode');
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
            switchAppStatus('EditActivitiesMode');
          }}
        >
          アクティビティを編集する
        </a>
      </section>
    </>
  );
}
