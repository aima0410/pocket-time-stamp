// ---- Components ----
import DoneTimeLogger from '@layouts/DoneTimeLogger';
import VisitRepositoryButton from '@ui-parts/VisitRepositoryButton';

export default function Home() {
  return (
    <main>
      <h1>DoneTimeLogger</h1>
      <p>がんばる社会人のための活動時間記録アプリ</p>
      {/* ---- アプリ ---- */}
      <DoneTimeLogger />
      {/* ---- 外部リンク ---- */}
      <VisitRepositoryButton />
    </main>
  );
}
