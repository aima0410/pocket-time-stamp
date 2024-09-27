// ---- React ----
import { useState } from 'react';
// ---- Types ----
import AppStatus from 'src/types/AppStatus';
import CollectionData from 'src/types/CollectionData';
import { DailyData } from 'src/types/ReportsData';
// ---- KumaUI ----
import { css } from '@kuma-ui/core';

// ========== 型定義 ==========
interface Props {
  switchAppStatus: (newMode: AppStatus) => void;
  toggleTutorialMode: (isTutorial: boolean) => void;
  isDemo: boolean;
  toggleDemoAndResetData: (isDemo: boolean) => void;
  defaultActivities: Array<string>;
  updateDailyData: (newDailyData: Array<DailyData>) => void;
  updateCollectionData: (newCollection: Array<CollectionData>) => void;
  updateActivities: (newActivities: Array<string>) => void;
}

// ========== コンポーネント関数 ==========
export default function FinalConfirmationDialog({
  switchAppStatus,
  toggleTutorialMode,
  isDemo,
  defaultActivities,
  updateDailyData,
  updateCollectionData,
  updateActivities,
}: Props) {
  // -------- useState：宣言 --------
  const [inputValue, setInputValue] = useState('');

  // -------- JSX --------
  return (
    <div className="modal-back">
      <div
        className={`modal ${css`
          justify-content: center;
        `}`}
      >
        <h3
          className={css`
            margin-top: 30px;
            margin-bottom: 50px;
            font-size: 30px;
            font-weight: 600;
            color: #666;
          `}
        >
          本当にすべてのデータを
          <br />
          削除しますか？
        </h3>
        <p
          className={css`
            margin-bottom: 30px;
          `}
        >
          同意する場合は「Delete」と入力してください。
        </p>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          className={css`
            width: 80%;
            margin-bottom: 50px;
            text-align: center;
          `}
          autoFocus
        />
        <button
          onClick={() => {
            updateDailyData([]);
            updateCollectionData([]);
            updateActivities(defaultActivities);

            !isDemo && localStorage.setItem('activities', JSON.stringify(defaultActivities));

            !isDemo && toggleTutorialMode(true);

            switchAppStatus('StandbyMode');
            // toggleDemoAndResetData(false);
            !isDemo && window.location.reload();
          }}
          className={css`
            margin-right: 10px;
            background-color: #ec5050;
          `}
          disabled={inputValue !== 'Delete'}
        >
          全データを初期化
        </button>
        <button className="cancel" onClick={() => switchAppStatus('StandbyMode')}>
          キャンセル
        </button>
      </div>
    </div>
  );
}
