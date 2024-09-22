// ---- Next ----
import Image from 'next/image';
// ---- React ----
import { useState } from 'react';
// ---- Types ----
import { MonthlyData } from 'src/types/ReportsData';
// ---- Images ----
import arrowIcon from '@assets/images/arrow.svg';

// ========== 型定義 ==========
interface Props {
  monthlyData: Array<MonthlyData>;
}

// ========== コンポーネント関数 ==========
export default function MonthlyReport({ monthlyData }: Props) {
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
      <button onClick={handleLoadPrev} disabled={visibleItems === 0}>
        <Image src={arrowIcon} alt="前のログを表示" width={14} height={14} />
      </button>
      <ol>
        {monthlyData.slice(visibleItems, visibleItems + 3).map((data) => (
          <li key={data.date}>
            <h3>{data.date}</h3>
            <ol>
              {data.recordedTime.map((log) => (
                <li key={`${data.date}-${log.activity}`}>
                  {log.activity} <span>{log.totalTime}</span>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
      <button onClick={handleLoadNext} disabled={visibleItems === monthlyData.length - 3}>
        <Image src={arrowIcon} alt="次のログを表示" width={14} height={14} />
      </button>
    </>
  );
}
