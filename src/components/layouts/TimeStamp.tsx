// ---- React ----
import { useState } from 'react';
// ---- Types ----
import AppStatus from 'src/types/AppStatus';
import { DailyData } from 'src/types/ReportsData';
import Pokemon from 'src/types/Pokemon';
import CollectionData from 'src/types/CollectionData';
// ---- Components ----
import StandbyPanel from '@ui-elements/StandbyPanel';
import StampingPanel from '@ui-elements/StampingPanel';
import EditActivityPanel from '@ui-elements/EditActivityPanel';
import DoneDialog from '@ui-elements/DoneDialog';

// ========== 型定義 ==========
interface Props {
  appStatus: AppStatus;
  switchAppStatus: (newMode: AppStatus) => void;
  activities: Array<string>;
  updateActivities: (newActivitiesList: Array<string>) => void;
  dailyData: Array<DailyData>;
  updateDailyData: (newData: Array<DailyData>) => void;
  pokemonList: Array<Pokemon>;
  collectionData: Array<CollectionData>;
  updateCollectionData: (newData: Array<CollectionData>) => void;
  selectedCollectionData: CollectionData;
}

// ========== コンポーネント関数 ==========
export default function TimeStamp({
  appStatus,
  switchAppStatus,
  activities,
  updateActivities,
  dailyData,
  updateDailyData,
  pokemonList,
  collectionData,
  updateCollectionData,
  selectedCollectionData,
}: Props) {
  // ---- useState ----
  const [timedActivity, setTimedActivity] = useState<string | null>(null);
  const trackTimedActivity = (newTimedActivity: string | null) => {
    setTimedActivity(newTimedActivity);
  };
  const [expGained, setExpGained] = useState({ exp: 0, isEvolution: false });

  const trackExpGained = (exp: number, isEvolution: boolean) => {
    setExpGained({ exp: exp, isEvolution: isEvolution });
  };

  return (
    <>
      <StandbyPanel
        switchAppStatus={switchAppStatus}
        activities={activities}
        trackTimedActivity={trackTimedActivity}
      />
      {appStatus === 'PlayMode' && timedActivity !== null && (
        <StampingPanel
          switchAppStatus={switchAppStatus}
          timedActivity={timedActivity}
          trackTimedActivity={trackTimedActivity}
          dailyData={dailyData}
          updateDailyData={updateDailyData}
          pokemonList={pokemonList}
          collectionData={collectionData}
          updateCollectionData={updateCollectionData}
          selectedCollectionData={selectedCollectionData}
          trackExpGained={trackExpGained}
        />
      )}
      {appStatus === 'EditActivitiesMode' && (
        <EditActivityPanel
          switchAppStatus={switchAppStatus}
          activites={activities}
          updateActivities={updateActivities}
        />
      )}
      {appStatus === 'DoneMode' && (
        <DoneDialog
          swithAppStatus={switchAppStatus}
          selectedCollectionData={selectedCollectionData}
          expGained={expGained}
        />
      )}
    </>
  );
}
