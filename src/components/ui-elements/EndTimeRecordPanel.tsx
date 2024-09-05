'use client';

// ---- Types ----
import AppStatus from 'src/types/AppStatus';

interface Props {
  switchStatusState: (newMode: AppStatus) => void;
}

export default function EndTimeRecordPanel({ switchStatusState }: Props) {
  return (
    <>
      <p>開始時刻 00:00</p>
      <p>ボタンをクリックすると終了時刻が記録されます。記録内容はあとから編集可能です。</p>
      <button onClick={()=>{switchStatusState('StandbyMode')}}>終了</button>
    </>
  );
}
