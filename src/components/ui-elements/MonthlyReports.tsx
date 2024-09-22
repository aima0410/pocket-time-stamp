// ---- Types ----
import { MonthlyData } from 'src/types/ReportsData';

// ========== 型定義 ==========
interface Props {
  monthlyData: Array<MonthlyData>;
}

// ========== コンポーネント関数 ==========
export default function MonthlyReport({ monthlyData }: Props) {
  return (
    <>
      <ol>
        {monthlyData.map((data) => (
          <li>
            <h3>{data.date}</h3>
            <ol>
              {data.recordedTime.map((log) => (
                <li>
                  {log.activity} <span>{log.totalTime}</span>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </>
  );
}
