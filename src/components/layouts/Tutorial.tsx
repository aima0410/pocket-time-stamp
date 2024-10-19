'use client';

// ---- Next ----
import Image from 'next/image';
// ---- Images ----
import stamp3DIcon from '@assets/images/stamp3d.svg';
// ---- KumaUI ----
import { css } from '@kuma-ui/core';

// ========== CSS宣言 ==========
const stampIconStyle = css`
  position: relative;
  left: 10px;
  display: inline-block;
  width: 120px;
  height: 120px;
  margin-bottom: 10px;
`;

const logoStyle = css`
  margin-bottom: 10px;
  color: var(--base-heading-color);
`;

const captionStyle = css`
  margin-bottom: 33px;
  color: #484848;
  font-size: 13px;
`;

// ========== 型定義 ==========
interface Props {
  toggleTutorialMode: (isTutorial: boolean) => void;
  toggleDemo: (isDemo: boolean) => void;
}

// ========== コンポーネント関数 ==========
export default function Tutorial({ toggleTutorialMode, toggleDemo }: Props) {
  // -------- JSX --------
  return (
    <section className="board">
      <header>
        <Image
          src={stamp3DIcon}
          alt="スタンプのアイコン"
          className={stampIconStyle}
          width={100}
          height={100}
        />
        <h1 className={logoStyle}>
          Pocket<span></span>Time<span></span>Stamp
        </h1>
        <p className={captionStyle}>日々の過ごし方を可視化するタイムスタンプアプリ</p>
      </header>
      <div>
        <button
          style={{ marginRight: '20px' }}
          onClick={() => {
            toggleTutorialMode(false);
          }}
        >
          はじめる
        </button>
        <button
          style={{ backgroundColor: 'var(--other-parts-bg-color)' }}
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
