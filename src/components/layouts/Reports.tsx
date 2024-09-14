// ---- React ----
import { useState, useEffect } from 'react';
// ---- Types ----
import ReportTab from 'src/types/ReportTab';
import { DayData, MonthData, TotalData } from 'src/types/ReportsData';
// ---- Components ----
import DayReport from '@ui-elements/DayReports';
import MonthReport from '@ui-elements/MonthReports';
import TotalReport from '@ui-elements/TotalReport';

// =========== コンポーネント関数 ==========
export default function Reports() {
  // -------- useState：宣言 --------
  const [selectedTab, setSelectedTab] = useState<ReportTab>('DayTab');
  const [dayData, setDayData] = useState<Array<DayData>>([]);
  const [monthData, setMonthData] = useState<Array<MonthData>>([]);
  const [totalData, setTotalData] = useState<Array<TotalData>>([]);

  // -------- useState：更新処理 --------
  const trackSelectedTab = (nextTab: ReportTab) => {
    setSelectedTab(nextTab);
  };

  const getReportsData = (Reports: any) => {};

  // -------- useEffect：初回マウント時 --------
  useEffect(() => {
    const storedReports = localStorage.getItem('reportsData');
    if (storedReports) {
      getReportsData(JSON.parse(storedReports));
    }
  }, []);

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
