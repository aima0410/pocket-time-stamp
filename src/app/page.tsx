// ---- Components ----
import Controler from '@components/layouts/Controler';
import PendingLog from '@components/layouts/PendingLog';
import ConfirmedLogs from '@components/layouts/ConfirmedLogs';
import VisitRepositoryButton from '@components/ui-parts/VisitRepositoryButton';

export default function Home() {
  return (
    <main>
      <h1>DoneTimeLogger</h1>
      <p>がんばる社会人のための活動時間記録アプリ</p>
      <Controler />
      <PendingLog />
      <ConfirmedLogs />
      {/* ---- GitHub ---- */}
      <VisitRepositoryButton />
    </main>
  );
}
