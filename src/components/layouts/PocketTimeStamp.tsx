'use client';

// ---- Next ----
import { usePathname } from 'next/navigation';
// ---- React ----
import { useEffect, useState } from 'react';
// ---- Types ----
import AppStatus from 'src/types/AppStatus';
import Tab from 'src/types/Tab';
// ---- Utils ----
import getCurrentTab from 'src/utils/getCurrentTab';
// ---- Components ----
import TodayTimeLine from '@ui-parts/TodayTimeLine';
import TabNav from '@layouts/TabNav';
import Home from '@layouts/Home';
import TimeStamp from '@layouts/TimeStamp';
import Histories from '@layouts/Histories';
import Reports from '@layouts/Reports';
import Collection from './Collection';
import { trackDynamicDataAccessed } from 'next/dist/server/app-render/dynamic-rendering';

// ========== コンポーネント関数 ==========
export default function PocketTimeStamp() {
  // -------- useState：宣言 --------
  const [appStatus, setAppStatus] = useState<AppStatus>('StandbyMode');
  const [activities, setActivities] = useState<Array<string>>([]);

  // -------- useState：stateの更新処理 --------
  const switchAppStatus = (newMode: AppStatus) => {
    setAppStatus(newMode);
  };

  const updateActivities = (newActivitiesList: Array<string>) => {
    // リスト内容に変更があるかどうかチェック
    const beforeArr = [...activities].sort();
    const afterArr = [...newActivitiesList].sort();
    const isSameArr = beforeArr.every((beforeActive, i) => beforeActive === afterArr[i]);

    if (!isSameArr) {
      localStorage.setItem('activities', JSON.stringify(newActivitiesList));
      setActivities(newActivitiesList);
    }
  };

  // -------- usePathname：現在選択しているタブを追跡 --------
  const pathname = usePathname();
  const currentTab: Tab = getCurrentTab(pathname);

  // -------- useEffect：初回マウント時の処理 ---------
  // アクティビティのデータセット
  useEffect(() => {
    const storedActivities = localStorage.getItem('activities');

    if (storedActivities) {
      const activities = JSON.parse(storedActivities);
      setActivities(activities);
    } else {
      const activities = ['運動', '読書', '雑用'];
      localStorage.setItem('activities', JSON.stringify(activities));
      setActivities(activities);
    }
  }, []);

  return (
    <>
      <h2>
        {appStatus}
        <br />
        {currentTab}
      </h2>
      <div>
        本日
        <TodayTimeLine />
      </div>
      <TabNav currentTab={currentTab} />
      <section>
        {currentTab === 'Home' && <Home />}
        {currentTab === 'CreateTimeStamp' && (
          <TimeStamp
            appStatus={appStatus}
            switchAppStatus={switchAppStatus}
            activities={activities}
            updateActivities={updateActivities}
          />
        )}
        {currentTab === 'RecentHistories' && <Histories />}
        {currentTab === 'Reports' && <Reports />}
        {currentTab === 'Collection' && <Collection />}
      </section>
    </>
  );
}
