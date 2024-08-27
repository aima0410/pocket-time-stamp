'use client';

// ---- Types ----
import AppStatus from 'src/types/AppStatus';

interface Props {
  activities: Array<string>;
  switchStatusState: (newMode: AppStatus) => void;
}

export default function StartTimeRecordPanel({ activities, switchStatusState }: Props) {
  return (
    <>
      <p>ボタンをクリックすると開始時刻が記録されます。記録内容はあとから編集可能です。</p>
      <ul>
        {activities.map((activity) => (
          <li>
            <button>{activity}</button>
          </li>
        ))}
        <li>
          <button onClick={() => switchStatusState('CreateActivityMode')}>+ 新規作成</button>
        </li>
      </ul>
    </>
  );
}
