'use client';
// ---- Types ----
import AppStatus from 'src/types/AppStatus';

export function StartTimeRecordPanel() {
  return (
    <>
      <p>ボタンをクリックすると開始時刻が記録されます。記録内容はあとから編集可能です。</p>
      <ul>
        <li>
          <button>運動</button>
        </li>
        <li>
          <button>語学学習</button>
        </li>
        <li>
          <button>個人開発</button>
        </li>
        <li>
          <button>読書</button>
        </li>
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
}

export default function Controler({ status }: Props) {
  return (
    <section>
      <fieldset>
        <StartTimeRecordPanel />
      </fieldset>
      {status === 'PlayMode' && <EndTimeRecordPanel />}
      {status === 'CreateActivityMode' && <CreateNewActivity />}
    </section>
  );
}
