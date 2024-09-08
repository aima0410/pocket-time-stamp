// ---- Types ----
import AppStatus from 'src/types/AppStatus';

interface Props {
  handleClickSwitchingAppStatus: (newMode: AppStatus) => void;
}

export default function EditActivityPanel({ handleClickSwitchingAppStatus }: Props) {
  return (
    <>
      <section>
        <button
          onClick={() => {
            handleClickSwitchingAppStatus('StandbyMode');
          }}
        >
          完了
        </button>
      </section>
    </>
  );
}
