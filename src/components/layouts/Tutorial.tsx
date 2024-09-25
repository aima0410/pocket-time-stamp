// ---- Next ----
import Image from 'next/image';
// ---- Images ----
import stamp3DIcon from '@assets/images/stamp3d.svg';
// ---- KumaUI ----
import { css } from '@kuma-ui/core';

// ========== 型定義 ==========
interface Props {
  toggleTutorialMode: (isTutorial: boolean) => void;
  toggleDemo: (isDemo: boolean) => void;
}

// ========== コンポーネント関数 ==========
export default function Tutorial({ toggleTutorialMode, toggleDemo }: Props) {
  return (
    <section
      className='board'
    >
      <header>
        <Image
          src={stamp3DIcon}
          alt="スタンプのアイコン"
          className={css`
            position: relative;
            left: 10px;
            display: inline-block;
            width: 120px;
            height: 120px;
            margin-bottom: 10px;
          `}
          width={100}
          height={100}
        />
        <h1
          className={css`
            margin-bottom: 10px;
            color: var(--base-heading-color);
          `}
        >
          Pocket<span></span>Time<span></span>Stamp
        </h1>
        <p
          className={css`
            margin-bottom: 33px;
            color: #484848;
            font-size: 13px;
          `}
        >
          日々の過ごし方を可視化するタイムスタンプアプリ
        </p>
      </header>
      <div>
        <button
          className={css`
            margin-right: 20px;
          `}
          onClick={() => {
            toggleTutorialMode(false);
          }}
        >
          はじめる
        </button>
        <button
          className={css`
            background-color: var(--oter-parts-bg-color);
          `}
          onClick={() => {
            toggleDemo(true);
            toggleTutorialMode(false);
          }}
        >
          デモを見る
        </button>
      </div>
    </section>
  );
}
