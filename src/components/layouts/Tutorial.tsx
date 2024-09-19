// ========== 型定義 ==========
interface Props {
  toggleTutorialMode: (isTutorial: boolean) => void;
  toggleDemo: (isDemo: boolean) => void;
}

// ========== コンポーネント関数 ==========
export default function Tutorial({ toggleTutorialMode, toggleDemo }: Props) {
  return (
    <>
      tutorial
      <button
        onClick={() => {
          toggleTutorialMode(false);
        }}
      >
        はじめる
      </button>
      <button
        onClick={() => {
          toggleDemo(true);
          toggleTutorialMode(false);
        }}
      >
        デモを見る
      </button>
    </>
  );
}
