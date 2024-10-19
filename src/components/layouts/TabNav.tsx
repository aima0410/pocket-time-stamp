'use client';

// ---- Next ----
import Link from 'next/link';
// ---- Types ----
import Tab from 'src/types/Tab';
// ---- Construction ----
import navTabList from '@assets/navTabInfo';
// ---- KumaUI ----
import { css } from '@kuma-ui/core';

// ========== CSS宣言 ==========
const navStyle = css`
  width: 28%;
  height: 100%;
  padding: 10px 0 0;
  background-color: var(--base-parts-bg-color);
  border-radius: 20px 0 0 20px;
`;

const wrapperStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const linkStyle = css`
  display: block;
  padding: 20px 0;
  height: 100%;
`;

const linkEnStyle = css`
  display: block;
  width: 100%;
  margin-bottom: -6px;
  font-family: var(--en);
`;

const linkJaStyle = css`
  display: inline-block;
  width: 100%;
  font-size: 12px;
`;

// ========== 型定義 ==========
interface Props {
  currentTab: Tab;
}

// ========== コンポーネント関数 ==========
export default function TabNav({ currentTab }: Props) {
  // -------- JSX --------
  return (
    <nav className={navStyle}>
      <ul className={wrapperStyle}>
        {navTabList.map((tab) => (
          <li key={tab.type} className={currentTab === tab.type ? 'selected tab' : 'tab'}>
            <Link href={tab.url} className={linkStyle}>
              <span className={linkEnStyle}>{tab.type}</span>
              <span className={linkJaStyle}>{tab.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
