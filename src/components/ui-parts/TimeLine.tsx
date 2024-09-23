// ---- Types ----
import { Line } from 'src/types/ReportsData';

// ========== 型定義 ==========
interface Props {
  date: string;
  timeLine: Array<Line>;
}

// ========== コンポーネント関数 ==========
export default function TimeLine({ date, timeLine }: Props) {
  return (
    <>
      <h3>{date}</h3>
      {timeLine.length === 0 ? (
        <>記録がありません。</>
      ) : (
        <div>
          {timeLine.map((log) => (
            <span key={`${date}-${log.startTime}`}>
              開始時刻{log.startTime} / 活動内容{log.activity} / 終了時刻{log.endTime}
            </span>
          ))}
        </div>
      )}
    </>
  );
}
