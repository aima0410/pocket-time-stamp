// ---- React ----
import { useState } from 'react';
// ---- Types ----
import AppStatus from 'src/types/AppStatus';

// ========== 型定義 ==========
interface Props {
  activities: Array<string>;
  switchAppStatus: (newMode: AppStatus) => void;
}

// ========== コンポーネント関数 ==========
export default function EditLogPanel({ activities, switchAppStatus }: Props) {
  // -------- State：宣言 --------
  const [selectedActivity, setSelectedActivity] = useState('');

  // -------- イベントハンドラ --------
  const handleChangeSelectedActivity = (newSelectedActivity: string) => {
    setSelectedActivity(newSelectedActivity);
  };

  // -------- JSX --------
  return (
    <section>
      <ul>
        <li>
          <select
            value={selectedActivity}
            onChange={(e) => {
              const newSelectedActivity = e.target.value;
              handleChangeSelectedActivity(newSelectedActivity);
            }}
          >
            {activities.map((activity) => (
              <option key={activity} value={activity}>
                {activity}
              </option>
            ))}
          </select>
        </li>
        <li>
          <h3>日程</h3>
          <div>
            <input type="date" />
          </div>
        </li>
        <li>
          <h3>開始時刻</h3>
          <div>
            <input type="time" />
          </div>
        </li>
        <li>
          <h3>終了時刻</h3>
          <div>
            <input type="time" />
          </div>
        </li>
        <li>
          <h3>休息タイム</h3>
          <div>
            <input type="number" />
          </div>
        </li>
      </ul>
      <button onClick={() => switchAppStatus('StandbyMode')}>更新</button>
      <button onClick={() => switchAppStatus('StandbyMode')}>キャンセル</button>
    </section>
  );
}
