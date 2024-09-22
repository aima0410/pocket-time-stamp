// ---- Types ----
import { TotalData } from 'src/types/ReportsData';

// ========== 型定義 ==========
interface Props {
  totalData: Array<TotalData>;
}

// ========== コンポーネント関数 ==========
export default function TotalReport({ totalData }: Props) {
  return (
    <>
      <ol>
        {totalData.map((data) => (
          <li>
            {data.activity} <span>{data.totalTime}</span>
          </li>
        ))}
      </ol>
    </>
  );
}
