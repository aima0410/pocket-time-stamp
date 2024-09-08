// ---- Types ----
import AppStatus from 'src/types/AppStatus';

interface Props {
  handleClickSwitchingAppStatus: (newMode: AppStatus) => void;
  timedActivity: string | null;
  handleClickTimedActivity: (newTimedActivity: string | null) => void;
}

export default function StampingPanel({
  handleClickSwitchingAppStatus,
  timedActivity,
  handleClickTimedActivity,
}: Props) {
  return (
    <>
      <section>
        <p>
          活動内容 {timedActivity}
        </p>
        <p>開始時刻 00:00</p>
        <button>キャンセル</button>
        <button
          onClick={() => {
            handleClickSwitchingAppStatus('StandbyMode');
          }}
        >
          タイマー終了
        </button>
      </section>
    </>
  );
}
