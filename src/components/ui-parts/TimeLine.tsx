// ---- React ----
import { useState, useEffect } from 'react';
// ---- Types ----
import { Line } from 'src/types/ReportsData';
// ---- KumaUI ----
import { css } from '@kuma-ui/core';

// ========== 型定義 ==========
interface Props {
  date: string;
  timeLine: Array<Line>;
}

interface TimeLineStyle {
  start: number;
  end: number;
  activity: string;
}

// ========== コンポーネント関数 ==========
export default function TimeLine({ date, timeLine }: Props) {
  const [displayDate, setDisplayDate] = useState<string>('');
  const [lineStyles, setLineStyles] = useState<Array<TimeLineStyle>>([]);
  const [hoverInfo, setHoverInfo] = useState({
    is: false,
    activity: '',
    startTime: '',
    endTime: '',
  });

  useEffect(() => {
    const [year, month, day] = date.split('/').map(Number);
    const nowDate = new Date();
    const processingDate = new Date(year, month - 1, day);

    if (
      nowDate.getFullYear() === processingDate.getFullYear() &&
      nowDate.getMonth() === processingDate.getMonth() &&
      nowDate.getDate() === processingDate.getDate()
    ) {
      setDisplayDate('本日');
    } else if (date === '') {
      setDisplayDate('');
    } else {
      const entryDate = year + '\n' + month + '/' + day;
      setDisplayDate(entryDate);
    }
  }, [date]);

  useEffect(() => {
    const styles: Array<TimeLineStyle> = timeLine.map((log) => {
      const [startHour, startMinutes] = log.startTime.split(':').map(Number);

      const [endHour, endMinutes] =
        log.endTime === '00:00' ? [24, 0] : log.endTime.split(':').map(Number);

      const start = startHour + startMinutes / 60;
      const end = endHour + endMinutes / 60;

      return { start, end, activity: log.activity };
    });
    setLineStyles(styles);
  }, [timeLine]);

  return (
    <div
      className={css`
        display: flex;
        align-items: center;
      `}
    >
      {displayDate !== '' && (
        <h3
          className={css`
            display: grid;
            place-items: center;
            padding: 2px;
            width: 56px;
            height: 56px;
            background-color: #fff;
            border-radius: 50%;
            border: solid 2px #5d5d5d;
            margin-right: 10px;
            box-shadow: 2px 2px 6px rgba(84, 84, 84, 0.2);
            text-align: center;
            color: #424242;
            font-size: 12px;
            font-weight: 600;
            line-height: 1em;
            white-space: pre-wrap;
          `}
        >
          <span>{displayDate}</span>
        </h3>
      )}
      {timeLine.length === 0 ? (
        <div className="timeline-board undefined">まだ記録がありません。</div>
      ) : (
        <div className="timeline-board">
          <ol
            className={css`
              display: flex;
              justify-content: space-between;
              font-size: 10px;
              margin-bottom: 3px;
              padding: 0;
              list-style-type: none;
            `}
          >
            {Array.from({ length: 25 }, (_, i) => (
              <li key={i} className={`hours ${i < 10 ? 'one' : 'ten'}`}>
                {i}
              </li>
            ))}
          </ol>
          <div
            className={css`
              position: relative;
              width: 100%;
              height: 20px;
              /* background-color: #f0f0f0; */
              border-radius: 3px;
            `}
          >
            {lineStyles.map((style, i) => (
              <div
                key={`${date}-${style.start}-${i}`}
                className={css`
                  position: absolute;
                  top: 0;
                  height: 100%;
                  background-color: #7a7a7a;
                  border-radius: 3px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: #fff;
                  font-size: 12px;
                  overflow: hidden;
                  white-space: nowrap;
                `}
                style={{
                  left: `${(style.start / 24) * 100}%`,
                  width: `${((style.end - style.start) / 24) * 100}%`,
                }}
                onMouseOver={() =>
                  setHoverInfo({
                    is: true,
                    activity: style.activity,
                    startTime: timeLine[i].startTime,
                    endTime: timeLine[i].endTime,
                  })
                }
                onMouseLeave={() =>
                  setHoverInfo({ is: false, activity: '', startTime: '', endTime: '' })
                }
              >
                {style.end - style.start > 1 && style.activity}
              </div>
            ))}
          </div>
          {hoverInfo.is && (
            <div
              className={css`
                position: absolute;
                z-index: 99;
                top: 40px;
                left: 100px;
                color: #343434;
                padding: 20px;
                border-radius: 6px;
                background-color: #ffffff;
                white-space: pre-wrap;
                pointer-events: none;
                box-shadow: 0 4px 6px #969696;
                line-height: 1.5em;
              `}
            >
              活動内容：{hoverInfo.activity}
              <br />
              開始時刻：{hoverInfo.startTime}
              <br />
              終了時刻：
              {hoverInfo.endTime}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
