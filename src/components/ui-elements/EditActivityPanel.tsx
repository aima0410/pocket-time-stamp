// ---- React ----
import { useState } from 'react';
// ---- Types ----
import AppStatus from 'src/types/AppStatus';

// ========== 型定義 ==========
interface Props {
  switchAppStatus: (newMode: AppStatus) => void;
  activites: Array<string>;
  updateActivities: (newActivitiesList: Array<string>) => void;
}

// ========== コンポーネント関数 ==========
export default function EditActivityPanel({ switchAppStatus, activites, updateActivities }: Props) {
  // -------- useState：宣言 --------
  const [editedActivity, setEdtiedActivity] = useState<string | null>(null);
  const [isCreateNewActivity, setIsCreateNewActivity] = useState(false);
  const [isSameActivity, setIsSameActivity] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isComposition, setIsComposition] = useState(false);
  const [unconfirmedActivityList, setUnconfirmedActivityList] = useState([...activites]);

  // -------- イベントハンドラ --------
  const handleClickEditButton = (newEditedActivity: string) => {
    setEdtiedActivity(newEditedActivity);
    setInputValue(newEditedActivity);
  };

  const handleClickDeleteButton = (activityToDelete: string) => {
    if (window.confirm(`本当に「${activityToDelete}」を削除しますか？`)) {
      const newActivityList = unconfirmedActivityList.filter((a) => a !== activityToDelete);
      setUnconfirmedActivityList(newActivityList);
      setEdtiedActivity(null);
    }
  };

  const handleChangeActivityInput = (newActivityName: string) => {
    if (editedActivity !== newActivityName) {
      const isSameData = unconfirmedActivityList.every((a) => a === newActivityName);
      if (isSameData !== isSameActivity) {
        setIsSameActivity(isSameData);
      } //！！！！！！この処理未完成。同じアクティビティを登録できないようにしたい。
    }
    setInputValue(newActivityName);
  };

  const handleClickCancelInputButton = () => {
    setEdtiedActivity(null);
  };

  const handleClickAddButton = () => {
    const newActivityList = [...unconfirmedActivityList, inputValue];
    setUnconfirmedActivityList(newActivityList);
    setEdtiedActivity(null);
    setInputValue('');
    setIsCreateNewActivity(false);
  };

  const handleClickUpdateButton = () => {
    if (inputValue === '' && editedActivity) {
      handleClickDeleteButton(editedActivity);
    } else {
      const newActivityList = unconfirmedActivityList.map((a) =>
        a === editedActivity ? inputValue : a,
      );
      setUnconfirmedActivityList(newActivityList);
      setEdtiedActivity(null);
    }
  };

  const handleClickCompleteButton = () => {
    updateActivities(unconfirmedActivityList);
    switchAppStatus('StandbyMode');
  };

  return (
    <>
      <section>
        <ul>
          {unconfirmedActivityList.map((activity) =>
            editedActivity === activity ? (
              <li key={activity}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => handleChangeActivityInput(e.target.value)}
                  onCompositionStart={() => setIsComposition(true)}
                  onCompositionEnd={() => setIsComposition(false)}
                  onKeyDown={(e) => {
                    !isComposition &&
                      e.key === 'Enter' &&
                      isSameActivity &&
                      handleClickUpdateButton();
                  }}
                />
                <button onClick={handleClickUpdateButton} disabled={isSameActivity}>
                  更新
                </button>
                <button onClick={handleClickCancelInputButton}>キャンセル</button>
              </li>
            ) : (
              <li key={activity}>
                <span
                  onClick={() => {
                    handleClickEditButton(activity);
                  }}
                >
                  {activity}
                </span>
                <button onClick={() => handleClickEditButton(activity)}>編集</button>
                <button onClick={() => handleClickDeleteButton(activity)}>削除</button>
              </li>
            ),
          )}
          <li>
            {isCreateNewActivity ? (
              <>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => handleChangeActivityInput(e.target.value)}
                  onCompositionStart={() => setIsComposition(true)}
                  onCompositionEnd={() => setIsComposition(false)}
                  onKeyDown={(e) => {
                    !isComposition &&
                      e.key === 'Enter' &&
                      inputValue !== '' &&
                      handleClickAddButton();
                  }}
                  autoFocus
                />
                <button
                  onClick={handleClickAddButton}
                  disabled={inputValue === '' || isSameActivity}
                >
                  追加
                </button>
                <button
                  onClick={() => {
                    setEdtiedActivity(null);
                    setIsCreateNewActivity(false);
                  }}
                >
                  キャンセル
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setEdtiedActivity('');
                  setIsCreateNewActivity(true);
                }}
                disabled={editedActivity !== null}
              >
                ＋新規追加
              </button>
            )}
          </li>
        </ul>
        <button onClick={handleClickCompleteButton} disabled={editedActivity !== null}>
          確定
        </button>
        <button onClick={() => switchAppStatus('StandbyMode')} disabled={editedActivity !== null}>
          キャンセル
        </button>
      </section>
    </>
  );
}
