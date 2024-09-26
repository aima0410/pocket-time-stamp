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
// ---- KumaUI ----
import { css } from '@kuma-ui/core';
import { ApiError } from 'next/dist/server/api-utils';

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
      <div
        className={css`
          position: relative;
          width: 100%;
          height: 100%;
          padding: 16px 16px 0;
        `}
      >
        {dailyData.length === 0 ? (
          <>
            <p
              className={css`
                font-size: 20px;
                font-weight: 900;
                color: #828282;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              `}
            >
              <span
                className={css`
                  display: block;
                `}
              >
                まだ記録がありません。
              </span>
              <span
                className={css`
                  display: block;
                `}
              >
                最初のタイムスタンプを作成してください。
              </span>
            </p>
          </>
        ) : (
          <>
            <button
              className={css`
                display: grid;
                place-items: center;
                position: absolute;
                top: 5px;
                right: 16px;
                padding: 0;
                width: 30px;
                height: 30px;
                border-radius: 50%;
              `}
              onClick={handleRecalculation}
            >
              <Image
                src={reloadIcon}
                alt="レポート内容をリロードするボタン"
                width={14}
                height={14}
              />
            </button>
            <ul
              className={css`
                display: flex;
                justify-content: left;
                width: 100%;
              `}
            >
              <li>
                <button
                  className="repoTab"
                  onClick={() => trackSelectedTab('DayTab')}
                  disabled={selectedTab === 'DayTab'}
                >
                  日にちごと
                </button>
              </li>
              <li>
                <button
                  className="repoTab"
                  onClick={() => trackSelectedTab('MonthTab')}
                  disabled={selectedTab === 'MonthTab'}
                >
                  月ごと
                </button>
              </li>
              <li>
                <button
                  className="repoTab"
                  onClick={() => trackSelectedTab('TotalTab')}
                  disabled={selectedTab === 'TotalTab'}
                >
                  累計
                </button>
              </li>
            </ul>
            <div
              className={css`
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 90%;
                border-radius: 0 10px 10px 10px;
                background-color: #fff;
              `}
            >
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
