'use client';

// ---- Types ----
import AppStatus from 'src/types/AppStatus';
// ---- Components ----
import EditLog from '@ui-elements/EditLog';
import IndividualPendingLog from '@ui-elements/IndividualPendingLog';

interface Props {
  status: AppStatus;
  activities: Array<string>;
}

export default function PendingLogs({ status, activities }: Props) {
  return (
    <section>
      <h2>未確定の活動記録</h2>
      <button>まとめて記録を確定する</button>
      <p>一度記録内容を確定してレポートに追加すると編集や削除ができなくなります。</p>
      <table>
        <thead>
          <tr>
            <th>日付</th>
            <th>開始時刻</th>
            <th>終了時刻</th>
            <th>休憩時間</th>
            <th>活動時間</th>
            <th>内容</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <IndividualPendingLog
            date="2024/08/13"
            startingTime="19:10"
            endingTime="20:10"
            restTime="0分"
            activeTime="1時間"
            activity="運動"
          />
          <IndividualPendingLog
            date="2024/08/13"
            startingTime="20:10"
            endingTime="21:10"
            restTime="30分"
            activeTime="30分"
            activity="語学学習"
          />
          <IndividualPendingLog
            date="2024/08/13"
            startingTime="21:10"
            endingTime="22:40"
            restTime="30分"
            activeTime="1時間"
            activity="語学学習"
          />
        </tbody>
      </table>
      {status === 'EditLogMode' && <EditLog activities={activities} />}
    </section>
  );
}
