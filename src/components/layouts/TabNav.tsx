'use client';

// ---- Next ----
import Link from 'next/link';
// ---- Types ----
import Tab from 'src/types/Tab';
// ---- KumaUI ----
import { css } from '@kuma-ui/core';

interface Props {
  currentTab: Tab;
}
export default function TabNav({ currentTab }: Props) {
  // タブのリスト
  const tabList = [
    { name: 'ホーム', type: 'Home', url: '/' },
    { name: 'タイムスタンプ作成', type: 'CreateTimeStamp', url: '/time-stamp' },
    { name: '直近の履歴', type: 'RecentHistories', url: '/histories' },
    { name: 'レポート', type: 'Reports', url: '/reports' },
    { name: 'コレクション', type: 'Collection', url: '/collection' },
  ];

  return (
    <nav
      className={css`
        width: 28%;
        height: 100%;
        padding: 10px 0 0;
        background-color: var(--base-parts-bg-color);
        border-radius: 20px 0 0 20px;
      `}
    >
      <ul
        className={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        `}
      >
        {tabList.map((tab) => (
          <li key={tab.type} className={currentTab === tab.type ? 'selected tab' : 'tab'}>
            <Link
              href={tab.url}
              className={css`
                display: block;
                padding: 20px 0;
                height: 100%;
              `}
            >
              <span
                className={css`
                  display: block;
                  width: 100%;
                  margin-bottom: -6px;
                  font-family: var(--en);
                `}
              >
                {tab.type}
              </span>
              <span
                className={css`
                  display: inline-block;
                  width: 100%;
                  font-size: 12px;
                `}
              >
                {tab.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
