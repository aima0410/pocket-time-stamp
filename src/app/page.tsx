// ---- Components ----
import PocketTimeStamp from '@layouts/PocketTimeStamp';
import VisitRepositoryButton from '@ui-parts/VisitRepositoryButton';

export default function Home() {
  return (
    <main>
      <h1>PocketTimeStamp</h1>
      <p>タイムスタンプアプリ</p>
      {/* ---- アプリ ---- */}
      <PocketTimeStamp />
      {/* ---- 外部リンク ---- */}
      <VisitRepositoryButton />
    </main>
  );
}
