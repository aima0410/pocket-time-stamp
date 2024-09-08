'use client';

// ---- Next ----
import { usePathname } from 'next/navigation';
// ---- React ----
import { useState } from 'react';
// ---- Types ----
import AppStatus from 'src/types/AppStatus';
import Tab from 'src/types/Tab';
// ---- Components ----
import TodayTimeLine from '@ui-parts/TodayTimeLine';
import TabNav from '@layouts/TabNav';
import Home from '@layouts/Home';
import TimeStamp from '@layouts/TimeStamp';
import Histories from '@layouts/Histories';
import Reports from '@layouts/Reports';
import Collection from './Collection';

export default function PocketTimeStamp() {
  // ---- アプリの操作ステータス ----
  const [appStatus, setAppStatus] = useState<AppStatus>('StandbyMode');
  const handleClickSwitchingAppStatus = (newMode: AppStatus) => {
    setAppStatus(newMode);
  };

  // ---- 現在選択中のタブ ----
  const pathname = usePathname();
  const currentTab: Tab = ((pathname: string) => {
    switch (pathname) {
      case '/':
        return 'Home';
      case '/time-stamp':
        return 'CreateTimeStamp';
      case '/histories':
        return 'RecentHistories';
      case '/reports':
        return 'Reports';
      case '/collection':
        return 'Collection';
      default:
        return '404';
    }
  })(pathname);

  // ---- アクティビティ ----
  const [activities, setActivities] = useState<Array<string>>(['運動', '読書', '個人開発']);
  const handleClickUpdateActivities = (newActivitiesList: Array<string>) => {
    setActivities(newActivitiesList);
  };

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
            handleClickSwitchingAppStatus={handleClickSwitchingAppStatus}
            activities={activities}
            handleClickUpdateActivities={handleClickUpdateActivities}
          />
        )}
        {currentTab === 'RecentHistories' && <Histories />}
        {currentTab === 'Reports' && <Reports />}
        {currentTab === 'Collection' && <Collection />}
      </section>
    </>
  );
}
