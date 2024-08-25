'use client';
import { link } from 'fs';
// ---- Types ----
import AppStatus from 'src/types/AppStatus';

export function StartTimeRecordPanel({ activities }: { activities: Array<string> }) {
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
          <button>+ 新規作成</button>
        </li>
      </ul>
    </>
  );
}

export function EndTimeRecordPanel() {
  return (
    <>
      <p>開始時刻 00:00</p>
      <p>ボタンをクリックすると終了時刻が記録されます。記録内容はあとから編集可能です。</p>
      <button>終了</button>
    </>
  );
}

export function CreateNewActivity() {
  return (
    <section>
      <fieldset>
        <legend>活動内容の新規作成</legend>
        <input type="text" name="" />
        <button>追加</button>
      </fieldset>
    </section>
  );
}

interface Props {
  status: AppStatus;
  activities: Array<string>;
}

export default function Controler({ status, activities }: Props) {
  return (
    <section>
      <fieldset>
        <StartTimeRecordPanel activities={activities} />
      </fieldset>
      {status === 'PlayMode' && <EndTimeRecordPanel />}
      {status === 'CreateActivityMode' && <CreateNewActivity />}
    </section>
  );
}
