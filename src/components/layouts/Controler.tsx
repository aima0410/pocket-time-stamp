'use client';

import { useState } from 'react';
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
  activities,
  updateActivitiesState,
}: {
  switchStatusState: (newMode: AppStatus) => void;
  activities: Array<string>;
  updateActivitiesState: (newActivitiesList: Array<string>) => void;
}) {
  const [newActivity, setNewActivity] = useState('');

  const handleChangeNewActivityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewActivity(e.target.value);
  };

  const addNewActivity = () => {
    const newActivitiesList = [...activities, newActivity];
    updateActivitiesState(newActivitiesList);
    switchStatusState('StandbyMode');
  };

  const handleClickAddButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    addNewActivity();
  };

  const handleClickCloseModalButton = () => {
    switchStatusState('StandbyMode');
  };

  return (
    <section onClick={handleClickCloseModalButton}>
      <fieldset onClick={(e: React.MouseEvent<HTMLFieldSetElement>) => e.stopPropagation()}>
        <legend>活動内容の新規作成</legend>
        <input
          type="text"
          name=""
          onClick={(e: React.MouseEvent<HTMLInputElement>) => e.stopPropagation()}
          onChange={handleChangeNewActivityInput}
          onKeyDown={(e) => e.key === 'Enter' && addNewActivity()}
        />
        <button onClick={handleClickCloseModalButton}>キャンセル</button>
        <button onClick={handleClickAddButton}>追加</button>
      </fieldset>
    </section>
  );
}

interface Props {
  status: AppStatus;
  activities: Array<string>;
  switchStatusState: (newMode: AppStatus) => void;
  updateActivitiesState: (newActivitiesList: Array<string>) => void;
}

export default function Controler({
  status,
  activities,
  switchStatusState,
  updateActivitiesState,
}: Props) {
  return (
    <section>
      <fieldset>
        <StartTimeRecordPanel activities={activities} switchStatusState={switchStatusState} />
      </fieldset>
      {status === 'PlayMode' && <EndTimeRecordPanel />}
      {status === 'CreateActivityMode' && (
        <CreateNewActivity
          switchStatusState={switchStatusState}
          activities={activities}
          updateActivitiesState={updateActivitiesState}
        />
      )}
    </section>
  );
}
