'use client';

// ---- Next ----
import { usePathname } from 'next/navigation';
// ---- React ----
import { useEffect, useState } from 'react';
// ---- Types ----
import AppStatus from 'src/types/AppStatus';
import Tab from 'src/types/Tab';
import LogData from 'src/types/LogData';
import CollectionData from 'src/types/CollectionData';
// ---- Utils ----
import getCurrentTab from 'src/utils/getCurrentTab';
import { fetchPokemonList } from '@utils/fetchPokemonDataUtils';
// ---- Components ----
import TodayTimeLine from '@ui-parts/TodayTimeLine';
import TabNav from '@layouts/TabNav';
import Home from '@layouts/Home';
import TimeStamp from '@layouts/TimeStamp';
import Histories from '@layouts/Histories';
import Reports from '@layouts/Reports';
import Collection from './Collection';
// ---- Constant ----
import defaultPokemonNameList from '@assets/pokemonNamesList';
import Pokemon from 'src/types/Pokemon';
import { sortPokemonCollection } from '@utils/sortUtils';

// ========== コンポーネント関数 ==========
export default function PocketTimeStamp() {
  // -------- useState：宣言 --------
  const [appStatus, setAppStatus] = useState<AppStatus>('StandbyMode');
  const [activities, setActivities] = useState<Array<string>>([]);
  const [logs, setLogs] = useState<Array<LogData>>([]);
  const [pokemonList, setPokemonList] = useState<Array<Pokemon>>([]);
  const [collectionDataList, setCollectionDataList] = useState<Array<CollectionData>>([]);

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
  const updateLogs = (newLogs: Array<LogData>) => {
    setLogs(newLogs);
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

    localStorage.setItem('collectionDataList', JSON.stringify(sortedCollectionDataList));
    setCollectionDataList(sortedCollectionDataList);
  };

  // -------- usePathname：現在選択しているタブを追跡 --------
  const pathname = usePathname();
  const currentTab: Tab = getCurrentTab(pathname);

  // -------- useEffect：初回マウント時の処理 ---------
  useEffect(() => {
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

    // ---- ログデータのセット ----
    const storedLogs = localStorage.getItem('logs');
    if (storedLogs) {
      const existLogs = JSON.parse(storedLogs);
      setLogs(existLogs);
    }

    // ---- アクティビティのデータセット ----
    const storedActivities = localStorage.getItem('activities');
    if (storedActivities) {
      const activities = JSON.parse(storedActivities);
      setActivities(activities);
    } else {
      // 初期のデモデータをセット
      const activities = ['運動', '読書', '雑用'];
      localStorage.setItem('activities', JSON.stringify(activities));
      setActivities(activities);
    }
  }, []);

  // -------- JSX --------
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
            logs={logs}
            updateLogs={updateLogs}
          />
        )}
        {currentTab === 'Reports' && <Reports logs={logs} updateLogData={updateLogs} />}
        {currentTab === 'Collection' && (
          <Collection
            pokemonList={pokemonList}
            collectionDataList={collectionDataList}
            updateCollectionDataList={updateCollectionDataList}
          />
        )}
      </section>
    </>
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
