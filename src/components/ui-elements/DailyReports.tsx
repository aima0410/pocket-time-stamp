// ---- Next ----
import Image from 'next/image';
// ---- React ----
import { useState } from 'react';
// ---- Types ----
import { DailyData } from 'src/types/ReportsData';
// ---- Images ----
import arrowIcon from '@assets/images/arrow.svg';
// ---- Components ----
import IdealTimeLine from '@ui-parts/IdealTimeLine';

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
      <div>
        <IdealTimeLine />
        <button onClick={handleLoadPrev} disabled={visibleItems === 0}>
          <Image src={arrowIcon} alt="前のログを表示" width={14} height={14} />
        </button>
        <ol>
          {dailyData.slice(visibleItems, visibleItems + 5).map((data) => (
            <li key={data.date}>
              <h3>{data.date}</h3>
              <div>
                {data.timeLine.map((log) => (
                  <span key={`${data.date}-${log.startTime}`}>
                    開始時刻{log.startTime} / 活動内容{log.activity} / 終了時刻{log.endTime}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ol>
        <button onClick={handleLoadNext} disabled={visibleItems === dailyData.length - 5}>
          <Image src={arrowIcon} alt="次のログを表示" width={14} height={14} />
        </button>
      </div>
    </>
  );
}
