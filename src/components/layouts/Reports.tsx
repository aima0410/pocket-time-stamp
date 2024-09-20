// ---- React ----
import { useState, useEffect } from 'react';
// ---- Types ----
import ReportTab from 'src/types/ReportTab';
import { DailyData, MonthlyData, TotalData } from 'src/types/ReportsData';
// ---- Components ----
import DayReport from '@ui-elements/DayReports';
import MonthReport from '@ui-elements/MonthReports';
import TotalReport from '@ui-elements/TotalReport';

// =========== 型定義 ==========
interface Props {
  dailyData: Array<DailyData>;
  monthlyData: Array<MonthlyData>;
  totalData: Array<TotalData>;
}

// =========== コンポーネント関数 ==========
export default function Reports({ dailyData, monthlyData, totalData }: Props) {
  // -------- useState：宣言 --------
  const [selectedTab, setSelectedTab] = useState<ReportTab>('DayTab');

  // -------- useState：更新処理 --------
  const trackSelectedTab = (nextTab: ReportTab) => {
    setSelectedTab(nextTab);
  };

  // --------- useEffect：初回マウント時 --------
  useEffect(() => {}, []);

  return (
    <>
      <section>
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
        {selectedTab === 'DayTab' && <DayReport />}
        {selectedTab === 'MonthTab' && <MonthReport />}
        {selectedTab === 'TotalTab' && <TotalReport />}
      </section>
    </>
  );
}
