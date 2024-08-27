'use client';

// ---- Types ----
import AppStatus from 'src/types/AppStatus';

export function StartTimeRecordPanel({
  activities,
  switchStatusState,
}: {
  activities: Array<string>;
  switchStatusState: (newMode: AppStatus) => void;
}) {
  const handleClickCreateNewActivity = () => {
    switchStatusState('CreateActivityMode');
  };

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
          <button onClick={handleClickCreateNewActivity}>+ 新規作成</button>
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

export function CreateNewActivity({
  switchStatusState,
}: {
  switchStatusState: (newMode: AppStatus) => void;
}) {
  const handleClickAddNewActivity = () => {
    switchStatusState('StandbyMode');
  };

  const handleClickCloseModal = () => {
    switchStatusState('StandbyMode');
  };

  return (
    <section onClick={handleClickCloseModal}>
      <fieldset>
        <legend>活動内容の新規作成</legend>
        <input type="text" name="" />
        <button onClick={handleClickCloseModal}>キャンセル</button>
        <button onClick={handleClickAddNewActivity}>追加</button>
      </fieldset>
    </section>
  );
}

interface Props {
  status: AppStatus;
  activities: Array<string>;
  switchStatusState: (newMode: AppStatus) => void;
}

export default function Controler({ status, activities, switchStatusState }: Props) {
  return (
    <section>
      <fieldset>
        <StartTimeRecordPanel activities={activities} switchStatusState={switchStatusState} />
      </fieldset>
      {status === 'PlayMode' && <EndTimeRecordPanel />}
      {status === 'CreateActivityMode' && (
        <CreateNewActivity switchStatusState={switchStatusState} />
      )}
    </section>
  );
}
