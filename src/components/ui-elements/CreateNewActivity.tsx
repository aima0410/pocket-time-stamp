'use client';

import { useState } from 'react';
// ---- Types ----
import AppStatus from 'src/types/AppStatus';

interface Props {
  switchStatusState: (newMode: AppStatus) => void;
  activities: Array<string>;
  updateActivitiesState: (newActivitiesList: Array<string>) => void;
}

export default function CreateNewActivity({
  switchStatusState,
  activities,
  updateActivitiesState,
}: Props) {
  const [isComposing, setIsComposing] = useState(false);
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

  const handleClickCloseModal = () => {
    switchStatusState('StandbyMode');
  };

  return (
    <section onClick={handleClickCloseModal}>
      <fieldset onClick={(e: React.MouseEvent<HTMLFieldSetElement>) => e.stopPropagation()}>
        <legend>活動内容の新規作成</legend>
        <input
          type="text"
          name=""
          onClick={(e: React.MouseEvent<HTMLInputElement>) => e.stopPropagation()}
          onChange={handleChangeNewActivityInput}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          onKeyDown={(e: React.KeyboardEvent) =>
            e.key === 'Enter' && isComposing === false && addNewActivity()
          }
        />
        <button onClick={handleClickCloseModal}>キャンセル</button>
        <button onClick={handleClickAddButton}>追加</button>
      </fieldset>
    </section>
  );
}
