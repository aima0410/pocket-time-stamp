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
  const [activities, setActivities] = useState(['運動', '語学学習', '個人開発', '読書']);

  return (
    <main>
      <h1>DoneTimeLogger</h1>
      <p>がんばる社会人のための活動時間記録アプリ</p>
      <Controler status={status} activities={activities} />
      <PendingLogs status={status} activities={activities} />
      <ConfirmedLogs status={status} />
      {/* ---- GitHub ---- */}
      <VisitRepositoryButton />
    </main>
  );
}
