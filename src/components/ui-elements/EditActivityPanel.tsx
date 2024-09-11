// ---- Types ----
import AppStatus from 'src/types/AppStatus';

interface Props {
  switchAppStatus: (newMode: AppStatus) => void;
}

export default function EditActivityPanel({ switchAppStatus }: Props) {
  return (
    <>
      <section>
        <button
          onClick={() => {
            switchAppStatus('StandbyMode');
          }}
        >
          完了
        </button>
      </section>
    </>
  );
}
