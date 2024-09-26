// ---- Next ----
import Image from 'next/image';
// ---- React ----
import { useEffect, useState } from 'react';
// ---- Types ----
import { MonthlyData } from 'src/types/ReportsData';
// ---- Images ----
import arrowIcon from '@assets/images/arrow.svg';
// ---- KumaUI ----
import { css } from '@kuma-ui/core';

// ========== 型定義 ==========
interface Props {
  monthlyData: Array<MonthlyData>;
}

// CSS円グラフ用の型定義
interface PieChartData {
  activity: string;
  hours: number;
  color: string;
}

// ========== コンポーネント関数 ==========
export default function MonthlyReport({ monthlyData }: Props) {
  // -------- useState：宣言 --------
  const [visibleItems, setVisibleItems] = useState<number>(0);

  // -------- イベントハンドラ --------
  const handleLoadNext = () => {
    setVisibleItems((visibleItems) => Math.max(visibleItems - 1, 0));
  };

  const handleLoadPrev = () => {
    setVisibleItems((visibleItems) => Math.min(visibleItems + 1, monthlyData.length - 3));
  };

  // CSS円グラフを生成する関数
  const generatePieChart = (data: PieChartData[]) => {
    const total = data.reduce((sum, item) => sum + item.hours, 0);
    let cumulativePercentage = 0;
    const gradientStops = data.map((item) => {
      const startPercentage = cumulativePercentage;
      cumulativePercentage += (item.hours / total) * 100;
      return `${item.color} ${startPercentage}% ${cumulativePercentage}%`;
    });

    return {
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      background: `conic-gradient(${gradientStops.join(', ')})`,
    };
  };

  // 活動ごとの色を定義
  const activityColors: Array<string> = [
    '#FF6B6B',
    '#FF8C94',
    '#FFA07A',
    '#C7B42C',
    '#4ECDC4',
    '#45B7D1',
    '#5D9CEC',
    '#A06AB4',
  ];

  // -------- JSX --------
  return (
    <div
      className={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
      `}
    >
      <button
        className={css`
          display: grid;
          place-items: center;
          padding: 0;
          width: 20px;
          height: 100px;
          border-radius: 5px;
          margin: 0 20px;
        `}
        onClick={handleLoadPrev}
        disabled={visibleItems === monthlyData.length - 3}
      >
        <Image
          className={css`
            display: block;
            width: 14px;
            height: 14px;
            transform: rotate(-90deg);
          `}
          src={arrowIcon}
          alt="前のログを表示"
          width={14}
          height={14}
        />
      </button>

      <ol
        className={css`
          display: flex;
          flex-direction: row-reverse;
          justify-content: space-between;
          align-items: center;
          width: 80%;
          height: 100%;
        `}
      >
        {monthlyData.slice(visibleItems, visibleItems + 3).map((data, i) => (
          <li
            className={css`
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              align-items: center;
              width: calc(1 / 3 * 100%);
              height: 80%;
              border-left: solid 1px #333;
            `}
            key={data.date}
            style={{ borderRight: i === 0 ? 'solid 1px #333' : 'none' }}
          >
            <h3
              className={css`
                font-size: 20px;
                font-weight: 600;
                color: #666;
                text-align: center;
                margin-bottom: 30px;
              `}
            >
              {data.date}
            </h3>

            {/* CSS円グラフの追加 */}
            <div
              className={css`
                margin-bottom: 20px;
              `}
              style={generatePieChart(
                data.recordedTime.map((log, i) => ({
                  activity: log.activity,
                  hours: log.totalTime,
                  color: activityColors[i] || '#CCCCCC',
                })),
              )}
            />
            <ol
              className={css`
                margin-top: 10px;
                text-align: justify;
                width: 180px;
                height: 40%;
                overflow-y: scroll;
              `}
            >
              {data.recordedTime.map((log, i) => (
                <li
                  key={`${data.date}-${log.activity}`}
                  className={css`
                    display: flex;
                    justify-content: flex-start;
                    margin-bottom: 5px;
                    width: 100%;
                    font-size: 13px;
                  `}
                >
                  <span
                    className={css`
                      position: relative;
                      top: 2px;
                      display: block;
                      width: 13px;
                      height: 13px;
                      border-radius: 50%;
                      margin-right: 5px;
                    `}
                    style={{ backgroundColor: activityColors[i] || '#CCCCCC' }}
                  />
                  <span
                    className={css`
                      display: inline-block;
                      width: 70%;
                    `}
                  >
                    {log.activity}
                  </span>
                  <span>{log.totalTime}</span>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>

      <button
        className={css`
          display: grid;
          place-items: center;
          padding: 0;
          width: 20px;
          height: 100px;
          border-radius: 5px;
          margin: 0 20px;
        `}
        onClick={handleLoadNext}
        disabled={visibleItems === 0}
      >
        <Image
          className={css`
            display: block;
            width: 14px;
            height: 14px;
            transform: rotate(90deg);
          `}
          src={arrowIcon}
          alt="次のログを表示"
          width={14}
          height={14}
        />
      </button>
    </div>
  );
}
