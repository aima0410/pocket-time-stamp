// ---- React ----
import { useState } from 'react';
// ---- Types ----
import { Line } from 'src/types/ReportsData';
// ---- KumaUI ----
import { css } from '@kuma-ui/core';
import { useEffect } from 'react';

// ========== 型定義 ==========
interface Props {
  date: string;
  timeLine: Array<Line>;
}

// ========== コンポーネント関数 ==========
export default function TimeLine({ date, timeLine }: Props) {
  const [displayDate, setDisplayDate] = useState('');

  useEffect(() => {
    const [year, month, day] = date.split('/').map(Number);
    const today = new Date();
    const thisDate = new Date(year, month - 1, day);

    if (
      today.getFullYear() === thisDate.getFullYear() &&
      today.getMonth() === thisDate.getMonth() &&
      today.getDate() === thisDate.getDate()
    ) {
      setDisplayDate('本日');
    } else {
      setDisplayDate(`${year}\n${month}/${day}`);
    }
  }, [date]);

  return (
    <div
      className={css`
        display: flex;
      `}
    >
      <h3
        className={css`
          display: grid;
          place-items: center;
          background-color: #fff;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          margin-right: 10px;
          line-height: 1em;
          white-space: pre-wrap;
        `}
      >
        {displayDate}
      </h3>
      {timeLine.length === 0 ? (
        <div className="timeline-board">記録がありません。</div>
      ) : (
        <div className="timeline-board">
          {timeLine.map((log) => (
            <span key={`${date}-${log.startTime}`}>
              開始時刻{log.startTime} / 活動内容{log.activity} / 終了時刻{log.endTime}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
