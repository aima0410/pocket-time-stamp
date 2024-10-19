'use client';

// ---- Next ----
import Image from 'next/image';
// ---- React ----
import { useState } from 'react';
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
// ---- KumaUI ----
import { css } from '@kuma-ui/core';

// ========== CSS宣言 ==========
const wrapperStyle = css`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 16px 16px 0;
`;

const noDataStyle = css`
  font-size: 20px;
  font-weight: 900;
  color: #828282;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  line-height: 1.7em;
`;

const reloadButtonStyle = css`
  display: grid;
  place-items: center;
  position: absolute;
  top: 5px;
  right: 16px;
  padding: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const tabWrapperStyle = css`
  display: flex;
  justify-content: left;
  width: 100%;
`;

const tabButtonStyle = css`
  width: 160px;
  height: 40px;
  padding: 0;
  border-radius: 5px 5px 0 0;
  margin-right: 10px;
  &:disabled {
    background-color: #fff;
  }
`;

const reportWrapperStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90%;
  border-radius: 0 10px 10px 10px;
  background-color: #fff;
`;

// ========== 型定義 ==========
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
      <div className={wrapperStyle}>
        {dailyData.length === 0 ? (
          <p className={noDataStyle}>
            <span style={{ display: 'block' }}>まだ記録がありません。</span>
            <span style={{ display: 'block' }}>最初のタイムスタンプを作成してください。</span>
          </p>
        ) : (
          <>
            <button className={reloadButtonStyle} onClick={handleRecalculation}>
              <Image
                src={reloadIcon}
                alt="レポート内容をリロードするボタン"
                width={14}
                height={14}
              />
            </button>
            <ul className={tabWrapperStyle}>
              <li>
                <button
                  className={tabButtonStyle}
                  onClick={() => trackSelectedTab('DayTab')}
                  disabled={selectedTab === 'DayTab'}
                >
                  日にちごと
                </button>
              </li>
              <li>
                <button
                  className={tabButtonStyle}
                  onClick={() => trackSelectedTab('MonthTab')}
                  disabled={selectedTab === 'MonthTab'}
                >
                  月ごと
                </button>
              </li>
              <li>
                <button
                  className={tabButtonStyle}
                  onClick={() => trackSelectedTab('TotalTab')}
                  disabled={selectedTab === 'TotalTab'}
                >
                  累計
                </button>
              </li>
            </ul>
            <div className={reportWrapperStyle}>
              {selectedTab === 'DayTab' && <DailyReport dailyData={dailyData} />}
              {selectedTab === 'MonthTab' && <MonthlyReport monthlyData={monthlyData} />}
              {selectedTab === 'TotalTab' && <TotalReport totalData={totalData} />}
            </div>
          </>
        )}
      </div>
    </>
  );
}
