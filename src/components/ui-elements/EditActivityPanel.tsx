'use client';

// ---- React ----
import { useState } from 'react';
// ---- Utils ----
import { mergeIdenticalActivity } from '@utils/activityUtils';
// ---- Types ----
import AppStatus from 'src/types/AppStatus';
// ---- KumaUI ----
import { css } from '@kuma-ui/core';

// ========== CSS宣言 ===========
const heading3Style = css`
  font-size: 30px;
  text-align: center;
  font-weight: 600;
  color: #666;
  margin-bottom: 30px;
`;

const ulStyle = css`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 390px;
`;

const liStyle = css`
  display: flex;
  width: 100%;
  margin-bottom: 20px;
`;

const activityTxtStyle = css`
  display: block;
  width: 200px;
  padding: 10px 3px;
  text-align: left;
  margin-right: 10px;
  border: solid 2px #666;
`;

const confirmButtonStyle = css`
  margin-top: 24px;
  width: 80%;
`;

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
  const [errorMessage, setErrorMessage] = useState('');
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
    const trimmedName = newActivityName.trim();
    const LowerCasedName = trimmedName.toLowerCase();
    // 編集中の活動名と、新しく入力された活動名が一致しないとき

    // 同じ活動名がすでにエントリーに存在するかどうか
    const isSameData = unconfirmedActivityList.includes(LowerCasedName);

    if (isSameData && editedActivity !== trimmedName) {
      setErrorMessage('そのアクティビティはすでに存在しています。');
    } else {
      setErrorMessage('');
    }
    setInputValue(trimmedName);
  };

  const handleClickCancelInputButton = () => {
    setEdtiedActivity(null);
    setInputValue('');
  };

  const handleClickAddButton = () => {
    const newActivityList = [...unconfirmedActivityList, inputValue];
    const mergedActivities = mergeIdenticalActivity(newActivityList);
    setUnconfirmedActivityList(mergedActivities);
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
      setInputValue('');
      setUnconfirmedActivityList(newActivityList);
      setEdtiedActivity(null);
    }
  };

  const handleClickCompleteButton = () => {
    updateActivities(unconfirmedActivityList);
    switchAppStatus('StandbyMode');
  };

  // -------- JSX --------
  return (
    <div className="modal-back">
      <section className="modal">
        <h3 className={heading3Style}>アクティビティの編集</h3>
        <ul className={ulStyle}>
          {unconfirmedActivityList.map((activity) =>
            editedActivity === activity ? (
              <li key={activity} className={liStyle}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => handleChangeActivityInput(e.target.value)}
                  onCompositionStart={() => setIsComposition(true)}
                  onCompositionEnd={() => setIsComposition(false)}
                  onKeyDown={(e) => {
                    !isComposition &&
                      e.key === 'Enter' &&
                      errorMessage === '' &&
                      handleClickUpdateButton();
                  }}
                  autoFocus
                />
                <button
                  className="modalBtn"
                  onClick={handleClickUpdateButton}
                  disabled={errorMessage !== ''}
                >
                  更新
                </button>
                <button className="modalBtn cancel" onClick={handleClickCancelInputButton}>
                  キャンセル
                </button>
                {errorMessage}
              </li>
            ) : (
              <li key={activity} className={liStyle} style={{ justifyContent: 'flex-start' }}>
                <span
                  onClick={() => {
                    handleClickEditButton(activity);
                  }}
                  className={activityTxtStyle}
                >
                  {activity}
                </span>
                <button className="modalBtn" onClick={() => handleClickEditButton(activity)}>
                  編集
                </button>
                <button
                  className="modalBtn delete"
                  onClick={() => handleClickDeleteButton(activity)}
                >
                  削除
                </button>
              </li>
            ),
          )}
          <li className={liStyle}>
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
                      errorMessage === '' &&
                      handleClickAddButton();
                  }}
                  autoFocus
                />
                {errorMessage}
                <button
                  onClick={handleClickAddButton}
                  disabled={inputValue === '' || errorMessage !== ''}
                  className="modalBtn add"
                >
                  追加
                </button>
                <button
                  onClick={() => {
                    setEdtiedActivity(null);
                    setIsCreateNewActivity(false);
                  }}
                  className="cancel modalBtn"
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
                className="modalBtn add change"
              >
                ＋新規追加
              </button>
            )}
          </li>
        </ul>
        <button
          className={confirmButtonStyle}
          onClick={handleClickCompleteButton}
          disabled={editedActivity !== null}
        >
          確定
        </button>
        <button
          className="cancel all"
          onClick={() => switchAppStatus('StandbyMode')}
          disabled={editedActivity !== null}
        >
          キャンセル
        </button>
      </section>
    </div>
  );
}
