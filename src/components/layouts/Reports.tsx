// ---- Next ----
import Image from 'next/image';
// ---- React ----
import { useState, useEffect } from 'react';
// ---- Types ----
import ReportTab from 'src/types/ReportTab';
import { DailyData, MonthlyData, TotalData } from 'src/types/ReportsData';
// ---- Images ----
import reloadIcon from '@assets/images/reload.svg';
// ---- Components ----
import DailyReport from '@ui-elements/DailyReports';
import MonthlyReport from '@ui-elements/MonthlyReports';
import TotalReport from '@ui-elements/TotalReport';
import { createMonthlyData, createTotalData } from '@utils/createReportDataUtils';

// =========== 型定義 ==========
interface Props {
  isDemo: boolean;
  dailyData: Array<DailyData>;
  monthlyData: Array<MonthlyData>;
  updateMonthlyData: (newMonthlyData: Array<MonthlyData>) => void;
  totalData: Array<TotalData>;
  updateTotalData: (newTotalData: Array<TotalData>) => void;
}

// =========== コンポーネント関数 ==========
export default function Reports({
  isDemo,
  dailyData,
  monthlyData,
  updateMonthlyData,
  totalData,
  updateTotalData,
}: Props) {
  // -------- useState：宣言 --------
  const [selectedTab, setSelectedTab] = useState<ReportTab>('DayTab');

  // -------- useState：更新処理 --------
  const trackSelectedTab = (nextTab: ReportTab) => {
    setSelectedTab(nextTab);
  };

  // -------- イベントハンドラ --------
  const handleRecalculation = () => {
    let selectedDailyData: Array<DailyData> = [];

    const storedDailyData = localStorage.getItem('dailyData');
    if (storedDailyData && !isDemo) {
      selectedDailyData = JSON.parse(storedDailyData);
    } else {
      selectedDailyData = dailyData;
    }

    const recalcMonthlyData: Array<MonthlyData> = createMonthlyData(selectedDailyData);
    const recalcTotalData: Array<TotalData> = createTotalData(recalcMonthlyData);

    updateMonthlyData(recalcMonthlyData);
    updateTotalData(recalcTotalData);
  };

  // -------- JSX --------
  return (
    <>
      <section>
        <button onClick={handleRecalculation}>
          <Image src={reloadIcon} alt="レポート内容をリロードするボタン" width={17} height={17} />
        </button>
        <ul>
          <li>
            <button onClick={() => trackSelectedTab('DayTab')} disabled={selectedTab === 'DayTab'}>
              日にちごと
            </button>
          </li>
          <li>
            <button
              onClick={() => trackSelectedTab('MonthTab')}
              disabled={selectedTab === 'MonthTab'}
            >
              月ごと
            </button>
          </li>
          <li>
            <button
              onClick={() => trackSelectedTab('TotalTab')}
              disabled={selectedTab === 'TotalTab'}
            >
              累計
            </button>
          </li>
        </ul>
        {selectedTab === 'DayTab' && <DailyReport dailyData={dailyData} />}
        {selectedTab === 'MonthTab' && <MonthlyReport monthlyData={monthlyData} />}
        {selectedTab === 'TotalTab' && <TotalReport totalData={totalData} />}
      </section>
    </>
  );
}
