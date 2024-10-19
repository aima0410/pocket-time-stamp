'use client';

// ---- Next ----
import { usePathname, useRouter } from 'next/navigation';
// ---- React ----
import { useEffect, useState } from 'react';
// ---- Types ----
import AppStatus from 'src/types/AppStatus';
import Tab from 'src/types/Tab';
import { DailyData, MonthlyData, TotalData } from 'src/types/ReportsData';
import Pokemon from 'src/types/Pokemon';
import CollectionData from 'src/types/CollectionData';
// ---- Utils ----
import getCurrentTab from 'src/utils/getCurrentTab';
import { fetchPokemonList } from '@utils/fetchPokemonDataUtils';
import { sortPokemonCollection, sortDailyDataByDate } from '@utils/sortUtils';
import { createDemoCollection } from '@utils/collectionUtils';
import { createMonthlyData, createTotalData } from '@utils/createReportDataUtils';
// ---- Components ----
import Loading from '@layouts/Loading';
import Tutorial from '@layouts/Tutorial';
import Header from '@layouts/Header';
import TabNav from '@layouts/TabNav';
import Home from '@layouts/Home';
import TimeStamp from '@layouts/TimeStamp';
import Histories from '@layouts/Histories';
import Reports from '@layouts/Reports';
import Collection from './Collection';
import FinalConfirmationDialog from '@ui-parts/FinalConfirmationDialog';
// ---- Constants ----
import defaultPokemonNameList from '@assets/pokemonNamesList';
import { demoDailyData, demoMonthlyData, demoTotalData } from '@assets/demoLogData';
import LogData from 'src/types/LogData';
import defaultActivities from '@assets/defaultActivities';
// ---- KumaUI ----
import { css } from '@kuma-ui/core';

// ========== コンポーネント関数 ==========
export default function PocketTimeStamp() {
  // -------- useState：宣言 --------
  const [isMounted, setIsMounted] = useState<Boolean>();
  const [isTutorial, setIsTutorial] = useState<Boolean>(true);
  const [isDemo, setIsDemo] = useState<boolean>(false);
  const [appStatus, setAppStatus] = useState<AppStatus>('StandbyMode');
  const [activities, setActivities] = useState<Array<string>>([]);
  // ---- ログ ----
  const [dailyData, setDailyData] = useState<Array<DailyData>>([]);
  const [monthlyData, setMonthlyData] = useState<Array<MonthlyData>>([]);
  const [totalData, setTotalData] = useState<Array<TotalData>>([]);
  const [displayLogs, setDisplayLogs] = useState<Array<LogData>>([]);
  const [todayData, setTodayData] = useState<DailyData>({ date: '', timeLine: [] });
  // ---- ポケモン情報 ----
  const [pokemonList, setPokemonList] = useState<Array<Pokemon>>([]);
  const [collectionData, setCollectionData] = useState<Array<CollectionData>>([]);
  const [selectedCollectionData, setSelectedCollectionData] = useState<CollectionData | null>(null);
  // -------- useState：stateの更新処理 --------
  const toggleTutorialMode = (isTutorial: boolean) => {
    setIsTutorial(isTutorial);
  };

  const toggleDemoAndResetData = (isDemo: boolean) => {
    setIsDemo(isDemo);
    isDemo && setIsTutorial(false);

    router.refresh();
    router.push('/');
  };

  const switchAppStatus = (newMode: AppStatus) => {
    setAppStatus(newMode);
  };

  const updateActivities = (newActivitiesList: Array<string>) => {
    // リスト内容に変更があるかどうかチェック
    const beforeArr = [...activities].sort();
    const afterArr = [...newActivitiesList].sort();
    const isSameArr = beforeArr.every((beforeActive, i) => beforeActive === afterArr[i]);

    if (!isSameArr) {
      !isDemo && localStorage.setItem('activities', JSON.stringify(newActivitiesList));
      setActivities(newActivitiesList);
    }
  };

  const updateDailyData = (newDailyData: Array<DailyData>) => {
    const copiedDailyData: Array<DailyData> = JSON.parse(JSON.stringify(newDailyData));
    const deletedEmptyDayData: Array<DailyData> = copiedDailyData.filter(
      (data) => data.timeLine.length !== 0,
    );
    const sortedNewData: Array<DailyData> = sortDailyDataByDate(deletedEmptyDayData);

    // state
    setDailyData(sortedNewData);

    // localStorage
    if (!isDemo) {
      const isEmptyData = sortedNewData.length === 0;
      isEmptyData
        ? localStorage.removeItem('dailyData')
        : localStorage.setItem('dailyData', JSON.stringify(sortedNewData));
    }
  };

  const updateMonthlyData = (newMonthlyData: Array<MonthlyData>) => {
    const copiedMonthlyData: Array<MonthlyData> = JSON.parse(JSON.stringify(newMonthlyData));
    const deletedEmptyMonthData: Array<MonthlyData> = copiedMonthlyData.filter(
      (data) => data.recordedTime.length !== 0,
    );
    setMonthlyData(deletedEmptyMonthData);
    !isDemo &&
      deletedEmptyMonthData.length !== 0 &&
      localStorage.setItem('monthlyData', JSON.stringify(deletedEmptyMonthData));
  };

  const updateTotalData = (newTotalData: Array<TotalData>) => {
    setTotalData(newTotalData);
    !isDemo &&
      newTotalData.length !== 0 &&
      localStorage.setItem('totalData', JSON.stringify(newTotalData));
  };

  const getPokemonList = (pokemonList: Array<Pokemon>) => {
    setPokemonList(pokemonList);
  };

  // あとでuseReducerでまとめる。getとupdateで。
  const getCollectionData = (collectionData: Array<CollectionData>) => {
    setCollectionData(collectionData);
  };

  const updateCollectionData = (newCollectionData: Array<CollectionData>) => {
    const sortedCollectionData = sortPokemonCollection(newCollectionData);

    setCollectionData(sortedCollectionData);

    if (isDemo && newCollectionData.length === 0) {
      fetchPokemonList(defaultPokemonNameList, getPokemonList, getCollectionData, isDemo);
    }

    if (!isDemo) {
      appStatus === 'DeleteMode' && newCollectionData.length === 0
        ? localStorage.removeItem('collectionData')
        : localStorage.setItem('collectionData', JSON.stringify(sortedCollectionData));
    }
  };

  // -------- usePathname：現在選択しているタブを追跡 --------
  const pathname = usePathname();
  const currentTab: Tab = getCurrentTab(pathname);

  // ---------------- Utils ----------------
  const loadDataFromLocalStorage = () => {
    const storedDailyData = localStorage.getItem('dailyData');
    const storedMonthlyData = localStorage.getItem('monthlyData');
    const storedTotalData = localStorage.getItem('totalData');
    const storedCollectionData = localStorage.getItem('collectionData');
    const storedActivities = localStorage.getItem('activities');

    // ---- ログのデータをセット ---
    if (storedDailyData && storedMonthlyData && storedTotalData) {
      updateDailyData(JSON.parse(storedDailyData));
      updateMonthlyData(JSON.parse(storedMonthlyData));
      updateTotalData(JSON.parse(storedTotalData));
    } else if (storedDailyData) {
      updateDailyData(JSON.parse(storedDailyData));
      const calculatedMonthlyData: Array<MonthlyData> = createMonthlyData(
        JSON.parse(storedDailyData),
      );
      const calculatedTotalData: Array<TotalData> = createTotalData(calculatedMonthlyData);
      updateMonthlyData(calculatedMonthlyData);
      updateTotalData(calculatedTotalData);
    } else {
      updateDailyData([]);
    }

    // ---- ポケモンのデータをセット ----
    if (storedCollectionData) {
      getCollectionData(JSON.parse(storedCollectionData));
    } else {
      fetchPokemonList(defaultPokemonNameList, getPokemonList, getCollectionData, isDemo);
    }

    // ---- アクティビティのデータをセット ----
    if (storedActivities) {
      const activities = JSON.parse(storedActivities);
      setActivities(activities);
    } else {
      // 初期のデモデータをセット
      localStorage.setItem('activities', JSON.stringify(defaultActivities));
      setActivities(defaultActivities);
    }

    // ---- ローカルストレージにデータがあるかどうか ----
    if (storedDailyData && storedCollectionData && storedActivities) {
      return true;
    }
    return false;
  };

  // ---------------- useRouter ----------------
  const router = useRouter();

  // -------- useEffect：初回マウント時の処理 ---------
  useEffect(() => {
    // ---- PokemonListのデータをセット ----
    const storedPokemonList = localStorage.getItem('pokemonList');
    if (storedPokemonList) {
      // あり：ローカルストレージのデータをセット
      getPokemonList(JSON.parse(storedPokemonList));
    } else {
      fetchPokemonList(defaultPokemonNameList, getPokemonList, getCollectionData, isDemo);
    }

    // ---- その他のローカルデータをセット ----
    const hasLocalData = loadDataFromLocalStorage();

    // ---- ローカルデータがない場合はチュートリアルをON ----
    toggleTutorialMode(!hasLocalData);

    setTimeout(() => {
      setIsMounted(true);
    }, 600);
  }, []);

  // -------- useEffect：isDemoが切り替えられたとき --------
  useEffect(() => {
    if (isDemo) {
      // デモデータをセット
      updateDailyData(demoDailyData);
      updateMonthlyData(demoMonthlyData);
      updateTotalData(demoTotalData);
      const demoCollectionData = sortPokemonCollection(
        createDemoCollection(collectionData, pokemonList),
      );
      updateCollectionData(demoCollectionData);
      updateActivities(defaultActivities);
    } else {
      const hasLocalData = loadDataFromLocalStorage();
      toggleTutorialMode(!hasLocalData);
    }
  }, [isDemo]);

  // -------- useEffect：dailyData更新時 --------
  useEffect(() => {
    // --------------------
    const now = new Date();
    const today = now.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const targetDailyData = dailyData.find((data) => data.date === today);

    setTodayData({ date: today, timeLine: targetDailyData?.timeLine ?? [] } as DailyData);
    // --------------------
    const flattenedLogs = dailyData.flatMap((data) =>
      data.timeLine.map((log) => ({ ...log, date: data.date }) as LogData),
    );
    setDisplayLogs(flattenedLogs);
    // --------------------
    // dailyDataが変更されたときのmonthlyDataおよびtotalDataの連携
    const storedDailyData = localStorage.getItem('dailyData');
    if (!storedDailyData) {
      // dailyDataが存在しないときはmonthlyDataおよびtotalDataを削除
      localStorage.removeItem('monthlyData');
      localStorage.removeItem('totalData');
      if (!isDemo) {
        updateMonthlyData([]);
        updateTotalData([]);
      }
    } else {
      // dailyDataが存在するときはmonthlyDataとtotalDataを算出してセット
      const calculatedMonthlyData: Array<MonthlyData> = createMonthlyData(
        JSON.parse(storedDailyData),
      );
      const calculatedTotalData: Array<TotalData> = createTotalData(calculatedMonthlyData);
      updateMonthlyData(calculatedMonthlyData);
      updateTotalData(calculatedTotalData);
    }
  }, [dailyData]);

  // -------- useEffect：現在選択中のポケモンを取得 --------
  useEffect(() => {
    if (collectionData) {
      const nowSelect = collectionData.find((collection) => collection.selected === true);
      nowSelect && setSelectedCollectionData(nowSelect);
    }
  }, [collectionData]);
  // -------- useEffect：アクティビティが全消去されたとき --------
  useEffect(() => {
    if (activities.length === 0) {
      // 初期のデモデータをセット
      localStorage.setItem('activities', JSON.stringify(defaultActivities));
      setActivities(defaultActivities);
    }
  }, [activities]);

  // -------- JSX --------
  return (
    <main>
      {!isMounted && <Loading />}
      {isTutorial ? (
        <Tutorial toggleTutorialMode={toggleTutorialMode} toggleDemo={toggleDemoAndResetData} />
      ) : (
        <div>
          {/* ---- Header ---- */}
          <Header
            appStatus={appStatus}
            switchAppStatus={switchAppStatus}
            isDemo={isDemo}
            toggleDemoAndResetData={toggleDemoAndResetData}
            todayData={todayData}
          />
          {/* ---- Contents ---- */}
          <div className="board app">
            <TabNav currentTab={currentTab} />
            <section
              className={css`
                padding: 20px 10px;
                width: 72%;
                height: 100%;
              `}
            >
              {currentTab === 'Home' && <Home selectedCollectionData={selectedCollectionData} />}
              {currentTab === 'CreateTimeStamp' && selectedCollectionData && (
                <TimeStamp
                  appStatus={appStatus}
                  switchAppStatus={switchAppStatus}
                  activities={activities}
                  updateActivities={updateActivities}
                  dailyData={dailyData}
                  updateDailyData={updateDailyData}
                  pokemonList={pokemonList}
                  collectionData={collectionData}
                  updateCollectionData={updateCollectionData}
                  selectedCollectionData={selectedCollectionData}
                />
              )}
              {currentTab === 'RecentHistories' && (
                <Histories
                  appStatus={appStatus}
                  switchAppStatus={switchAppStatus}
                  activities={activities}
                  dailyData={dailyData}
                  updateDailyData={updateDailyData}
                  displayLogs={displayLogs}
                />
              )}
              {currentTab === 'Reports' && (
                <Reports
                  isDemo={isDemo}
                  dailyData={dailyData}
                  monthlyData={monthlyData}
                  updateMonthlyData={updateMonthlyData}
                  totalData={totalData}
                  updateTotalData={updateTotalData}
                />
              )}
              {currentTab === 'Collection' && (
                <Collection
                  pokemonList={pokemonList}
                  collectionData={collectionData}
                  updateCollectionData={updateCollectionData}
                />
              )}
            </section>
          </div>
          {appStatus === 'DeleteMode' && (
            <FinalConfirmationDialog
              switchAppStatus={switchAppStatus}
              toggleTutorialMode={toggleTutorialMode}
              isDemo={isDemo}
              toggleDemoAndResetData={toggleDemoAndResetData}
              defaultActivities={defaultActivities}
              updateDailyData={updateDailyData}
              updateCollectionData={updateCollectionData}
              updateActivities={updateActivities}
            />
          )}
        </div>
      )}
    </main>
  );
}