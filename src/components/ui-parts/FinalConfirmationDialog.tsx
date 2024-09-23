// ---- React ----
import { useState } from 'react';
// ---- Types ----
import AppStatus from 'src/types/AppStatus';
import CollectionData from 'src/types/CollectionData';
import { DailyData } from 'src/types/ReportsData';

// ========== 型定義 ==========
interface Props {
  switchAppStatus: (newMode: AppStatus) => void;
  toggleTutorialMode: (isTutorial: boolean) => void;
  isDemo: boolean;
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
    <div>
      <h3>本当にすべてのデータを削除しますか？</h3>
      <p>同意する場合は「Delete」と入力してください。</p>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <button onClick={() => switchAppStatus('StandbyMode')}>キャンセル</button>
      <button
        onClick={() => {
          updateDailyData([]);
          updateCollectionData([]);
          updateActivities(defaultActivities);

          !isDemo && localStorage.setItem('activities', JSON.stringify(defaultActivities));

          toggleTutorialMode(true);
          switchAppStatus('StandbyMode');
        }}
        disabled={inputValue !== 'Delete'}
      >
        全データを初期化
      </button>
    </div>
  );
}
