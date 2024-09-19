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
import { sortPokemonCollection } from '@utils/sortUtils';
import { createDemoCollection } from '@utils/createCollectionUtils';
// ---- Components ----
import Loading from '@layouts/Loading';
import Tutorial from '@layouts/Tutorial';
import TodayTimeLine from '@ui-parts/TodayTimeLine';
import TabNav from '@layouts/TabNav';
import Home from '@layouts/Home';
import TimeStamp from '@layouts/TimeStamp';
import Histories from '@layouts/Histories';
import Reports from '@layouts/Reports';
import Collection from './Collection';
// ---- Constants ----
import defaultPokemonNameList from '@assets/pokemonNamesList';
import { demoDailyData, demoMonthlyData, demoTotalData } from '@assets/demoLogData';

// ========== コンポーネント関数 ==========
export default function PocketTimeStamp() {
  // -------- useState：宣言 --------
  const [isMounted, setIsMounted] = useState<Boolean>();
  const [isTutorial, setIsTutorial] = useState<Boolean>(true);
  const [isDemo, setIsDemo] = useState<Boolean>(false);
  const [appStatus, setAppStatus] = useState<AppStatus>('StandbyMode');
  const [activities, setActivities] = useState<Array<string>>([]);
  // ---- ログ ----
  const [dailyData, setDailyData] = useState<Array<DailyData>>([]);
  const [monthlyData, setMonthlyData] = useState<Array<MonthlyData>>([]);
  const [totalData, setTotalData] = useState<Array<TotalData>>([]);
  // ---- ポケモン情報 ----
  const [pokemonList, setPokemonList] = useState<Array<Pokemon>>([]);
  const [collectionDataList, setCollectionDataList] = useState<Array<CollectionData>>([]);

  // -------- useState：stateの更新処理 --------
  const toggleTutorialMode = (isTutorial: boolean) => {
    setIsTutorial(isTutorial);
  };

  const toggleDemo = (isDemo: boolean) => {
    setIsDemo(isDemo);
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
      localStorage.setItem('activities', JSON.stringify(newActivitiesList));
      setActivities(newActivitiesList);
    }
  };
  const updateDailyData = (newData: Array<DailyData>) => {
    setDailyData(newData);
    !isDemo && localStorage.setItem('logs', JSON.stringify(newData));
  };
  const updateMonthlyData = (newData: Array<MonthlyData>) => {
    setMonthlyData(newData);
    !isDemo && localStorage.setItem('MonthlylyData', JSON.stringify(newData));
  };
  const updateTotalData = (newData: Array<TotalData>) => {
    setTotalData(newData);
  };

  const getPokemonList = (pokemonList: Array<Pokemon>) => {
    setPokemonList(pokemonList);
  };

  // あとでuseReducerでまとめる。getとupdateで。
  const getCollectionDataList = (collectionDataList: Array<CollectionData>) => {
    setCollectionDataList(collectionDataList);
  };

  const updateCollectionDataList = (collectionDataList: Array<CollectionData>) => {
    const sortedCollectionDataList = sortPokemonCollection(collectionDataList);
    setCollectionDataList(sortedCollectionDataList);
    !isDemo && localStorage.setItem('collectionDataList', JSON.stringify(sortedCollectionDataList));
  };

  // -------- usePathname：現在選択しているタブを追跡 --------
  const pathname = usePathname();
  const currentTab: Tab = getCurrentTab(pathname);

  // -------- useRouter --------
  const router = useRouter();

  // -------- useEffect：初回マウント時の処理 ---------
  useEffect(() => {
    // ---- ログデータのセット ----
    const storedDailyData = localStorage.getItem('dailyData');
    const storedMonthlyData = localStorage.getItem('monthlyData');
    const storedTotalData = localStorage.getItem('totalData');
    if (storedDailyData && storedMonthlyData && storedTotalData) {
      const existDailyData = JSON.parse(storedDailyData);
      const existMonthlyData = JSON.parse(storedMonthlyData);
      const existTotalData = JSON.parse(storedTotalData);
      updateDailyData(existDailyData);
      updateMonthlyData(existMonthlyData);
      updateTotalData(existTotalData);
      // チュートリアルOFF
      toggleTutorialMode(false);
    } else {
      // チュートリアルON
      router.push('/')
      toggleTutorialMode(true);
    }

    // ---- ポケモンのデータセット ----
    const storedPokemonList = localStorage.getItem('pokemonList');
    const storedCollectionDataList = localStorage.getItem('collectionDataList');
    if (storedPokemonList && storedCollectionDataList) {
      // ある：ローカルストレージのデータをセット
      getPokemonList(JSON.parse(storedPokemonList));
      getCollectionDataList(JSON.parse(storedCollectionDataList));
      JSON.parse(storedCollectionDataList).length === 0 &&
        fetchPokemonList(defaultPokemonNameList, getPokemonList, getCollectionDataList);
    } else {
      // なし：PokemonAPIからデータを取得してセット
      fetchPokemonList(defaultPokemonNameList, getPokemonList, getCollectionDataList);
    }

    // ---- アクティビティのデータセット ----
    const storedActivities = localStorage.getItem('activities');
    if (storedActivities) {
      const activities = JSON.parse(storedActivities);
      setActivities(activities);
    } else {
      // 初期のデモデータをセット
      const activities = [
        '睡眠',
        '食事',
        '運動',
        '学習',
        '仕事',
        '交流',
        'アウトドア',
        'SNS/動画/ゲーム',
      ];
      localStorage.setItem('activities', JSON.stringify(activities));
      setActivities(activities);
    }

    setTimeout(() => {
      setIsMounted(true);
    }, 600);
  }, []);

  // -------- useEffect：デモモードON --------
  useEffect(() => {
    if (isDemo) {
      // デモデータをセット
      updateDailyData(demoDailyData);
      updateMonthlyData(demoMonthlyData);
      updateTotalData(demoTotalData);
      const demoCollectionData = sortPokemonCollection(createDemoCollection(collectionDataList));
      updateCollectionDataList(demoCollectionData);
    }
  }, [isDemo]);

  // -------- JSX --------
  return (
    <main>
      {!isMounted && <Loading />}
      <h2>
        {appStatus}
        <br />
        {currentTab}
      </h2>
      {isTutorial ? (
        <Tutorial toggleTutorialMode={toggleTutorialMode} toggleDemo={toggleDemo} />
      ) : (
        <>
          {isDemo && (
            <button
              onClick={() => {
                toggleDemo(false);
                toggleTutorialMode(true);
                router.push('/')
              }}
            >
              デモOFF
            </button>
          )}
          {isDemo && (
            <button
              onClick={() => {
                toggleDemo(true);
                router.push('/')
              }}
            >
              デモON
            </button>
          )}
          <div>
            本日
            <TodayTimeLine />
          </div>
          <TabNav currentTab={currentTab} />
          <section>
            {currentTab === 'Home' && <Home collectionDataList={collectionDataList} />}
            {currentTab === 'CreateTimeStamp' && (
              <TimeStamp
                appStatus={appStatus}
                switchAppStatus={switchAppStatus}
                activities={activities}
                updateActivities={updateActivities}
              />
            )}
            {currentTab === 'RecentHistories' && (
              <Histories
                appStatus={appStatus}
                switchAppStatus={switchAppStatus}
                activities={activities}
                dailyData={dailyData}
                updateDailyData={updateDailyData}
              />
            )}
            {currentTab === 'Reports' && (
              <Reports dailyData={dailyData} monthlyData={monthlyData} totalData={totalData} />
            )}
            {currentTab === 'Collection' && (
              <Collection
                pokemonList={pokemonList}
                collectionDataList={collectionDataList}
                updateCollectionDataList={updateCollectionDataList}
              />
            )}
          </section>
        </>
      )}
    </main>
  );
}

// ---- ポケモンIDのメモ ----
// -- ピックアップ --
// ラルトス280、281、282
// ヒノアラシ155、156、157
// ゴース92、93、94
// ココドラ304、305、306
// ポッチャマ393、394、395
// フカマル443、444、445445

// -- 別候補 --
// ホゲータ909、910、911
// ヒトモシ607、608、609
// フシギダネ1、2，3
// ヒトカゲ４，５，６
// ゼニガメ７、８，９
// イシツブテ74、75、76
// ユニラン577、578、579
// キバゴ610、611、612
// フォッコ653、654、655
// ケロマツ656、657、658
// ヤヤマコ661、662、663
// コフキムシ664、665、666
// ジャラコ782、783、784
// パも921、922、923
// メッソン816、817、818
// ココガラ821、822、823
// アマカジ761、762、763
// ヌメラ704、705、706
