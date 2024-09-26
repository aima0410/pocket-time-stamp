// ---- Next ----
import Image from 'next/image';
// ---- React ----
import { useState } from 'react';
// ---- Types ----
import { DailyData } from 'src/types/ReportsData';
// ---- Images ----
import arrowIcon from '@assets/images/arrow.svg';
// ---- Components ----
import TimeLine from '@ui-parts/TimeLine';
// ---- KumaUI ----
import { css } from '@kuma-ui/core';

// ========== 型定義 ==========
interface Props {
  dailyData: Array<DailyData>;
}

// ========== コンポーネント関数 ==========

export default function DailyReport({ dailyData }: Props) {
  // -------- useState：宣言 --------
  const [visibleItems, setVisibleItems] = useState<number>(0);

  // -------- イベントハンドラ --------
  const handleLoadPrev = () => {
    setVisibleItems((visibleItems) => visibleItems - 1);
  };

  const handleLoadNext = () => {
    setVisibleItems((visibleItems) => visibleItems + 1);
  };

  // -------- JSX --------
  return (
    <>
      <>
        <button
          className={css`
            display: grid;
            place-items: center;
            padding: 0;
            width: 100px;
            height: 20px;
            border-radius: 5px;
            margin-bottom: 20px;
          `}
          onClick={handleLoadPrev}
          disabled={visibleItems === 0}
        >
          <Image
            className={css`
              display: block;
              width: 14px;
              height: 14px;
            `}
            src={arrowIcon}
            alt="前のログを表示"
            width={14}
            height={14}
          />
        </button>
        <ol>
          {dailyData.slice(visibleItems, visibleItems + 5).map((data) => (
            <li
              key={data.date}
              className={css`
                margin-bottom: 20px;
              `}
            >
              <TimeLine date={data.date} timeLine={data.timeLine} />
            </li>
          ))}
        </ol>
        <button
          className={css`
            display: grid;
            place-items: center;
            padding: 0;
            width: 100px;
            height: 20px;
            border-radius: 5px;
          `}
          onClick={handleLoadNext}
          disabled={visibleItems === dailyData.length - 5 || dailyData.length <= 5}
        >
          <Image
            src={arrowIcon}
            className={css`
              display: block;
              width: 14px;
              height: 14px;
              transform: rotate(180deg);
            `}
            alt="次のログを表示"
            width={14}
            height={14}
          />
        </button>
      </>
    </>
  );
}
