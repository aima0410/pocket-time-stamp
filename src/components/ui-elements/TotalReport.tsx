'use client';

// ---- Types ----
import { TotalData } from 'src/types/ReportsData';
// ---- KumaUI ----
import { css } from '@kuma-ui/core';

// ========== 型定義 ==========
interface Props {
  totalData: Array<TotalData>;
}
// ========== コンポーネント関数 ==========
export default function TotalReport({ totalData }: Props) {
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
        display: grid;
        place-items: center;
        width: 90%;
        height: 100%;
        padding: 50px 0;
      `}
    >
      <ol
        className={css`
          overflow-y: scroll;
          width: 100%;
          height: 100%;
        `}
      >
        {totalData.map((data, i) => (
          <li
            key={i}
            className={css`
              width: 100%;
              margin-bottom: 10px;
              font-size: 13px;
              color: #3e3e3e;
              text-align: left;
            `}
          >
            <div style={{ marginBottom: '5px' }}>
              {data.activity} {Math.floor(data.totalTime / 60)}時間
            </div>
            <div
              className={css`
                height: 50px;
                border-radius: 0 5px 5px 0;
              `}
              style={{
                width: `${(data.totalTime / totalData[0].totalTime) * 100}%`,
                backgroundColor: activityColors[i] || '#7f7f7f',
              }}
            ></div>
          </li>
        ))}
      </ol>
    </div>
  );
}
