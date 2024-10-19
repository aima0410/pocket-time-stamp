'use client';

// ---- Types ----
import AppStatus from 'src/types/AppStatus';
import { DailyData } from 'src/types/ReportsData';
// ---- Components ----
import TimeLine from '@ui-parts/TimeLine';
// ---- KumaUI ----
import { css } from '@kuma-ui/core';

// ========== CSS宣言 ==========
const headerStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 40px 0 20px;
  text-align: left;
`;

const logoWrapperStyle = css`
  position: relative;
  bottom: 6px;
  margin-right: 10px;
`;

const logoStyle = css`
  margin-bottom: 7px;
  color: var(--lighr-color);
  font-size: clamp(16px, 3vw, 36px);
`;

const captionStyle = css`
  color: #fff;
  opacity: 0.8;
  font-size: 13px;
`;

const deleteButtonStyle = css`
  background-color: var(--other-parts-bg-color);
  color: #e7e7e7;
`;

// ========== 型定義 ==========
interface Props {
  appStatus: AppStatus;
  switchAppStatus: (newMode: AppStatus) => void;
  isDemo: boolean;
  toggleDemoAndResetData: (isDemo: boolean) => void;
  todayData: DailyData;
}

// ========== コンポーネント関数 ==========
export default function Header({
  appStatus,
  switchAppStatus,
  isDemo,
  toggleDemoAndResetData,
  todayData,
}: Props) {

  // -------- JSX --------
  return (
    <header className={headerStyle}>
      <div className={logoWrapperStyle}>
        <h1 className={logoStyle}>
          <a href="/">
            Pocket<span></span>Time<span></span>Stamp
          </a>
        </h1>
        <p className={captionStyle}>日々の過ごし方を可視化するタイムスタンプアプリ</p>
      </div>

      <div>
        <TimeLine date={todayData.date} timeLine={todayData.timeLine} />
      </div>

      <div>
        <button style={{ marginRight: '16px' }} onClick={() => toggleDemoAndResetData(!isDemo)}>
          {isDemo ? 'デモOFF' : 'デモON'}
        </button>
        <button
          className={deleteButtonStyle}
          onClick={() => {
            switchAppStatus('DeleteMode');
          }}
        >
          全データの初期化
        </button>
      </div>
    </header>
  );
}
