// ---- Types ----
import { DailyData } from 'src/types/ReportsData';
// ---- Components ----
import IdealTimeLine from '@ui-parts/IdealTimeLine';

// ========== 型定義 ==========
interface Props {
  dailyData: Array<DailyData>;
}

// ========== コンポーネント関数 ==========

export default function DailyReport({ dailyData }: Props) {
  return (
    <>
      <div>
        <IdealTimeLine />
        <ol>
          {dailyData.map((data) => (
            <li>
              <h3>{data.date}</h3>
              <div>
                {data.timeLine.map((log) => (
                  <span>
                    開始時刻{log.startTime} / 活動内容{log.activity} / 終了時刻{log.endTime}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
