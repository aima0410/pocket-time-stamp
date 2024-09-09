'use client';

// ---- Next ----
import Link from 'next/link';
// ---- Types ----
import Tab from 'src/types/Tab';

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
    <nav>
      <ul>
        {tabList.map((tab) => (
          <li key={tab.type}>
            <Link href={tab.url} className={currentTab === tab.type ? 'selected-tab' : ''}>
              {tab.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
