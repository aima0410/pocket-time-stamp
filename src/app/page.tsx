'use client';

import { useState } from 'react';
// ---- Types ----
import AppStatus from 'src/types/AppStatus';
// ---- Components ----
import Controler from '@layouts/Controler';
import PendingLogs from '@layouts/PendingLogs';
import ConfirmedLogs from '@layouts/ConfirmedLogs';
import VisitRepositoryButton from '@ui-parts/VisitRepositoryButton';

export default function Home() {
  const [status, setStatus] = useState<AppStatus>('StandbyMode');

  return (
    <main>
      <h1>DoneTimeLogger</h1>
      <p>がんばる社会人のための活動時間記録アプリ</p>
      <Controler status={status} />
      <PendingLogs status={status} />
      <ConfirmedLogs status={status} />
      {/* ---- GitHub ---- */}
      <VisitRepositoryButton />
    </main>
  );
}
