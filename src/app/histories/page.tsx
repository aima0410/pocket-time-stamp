// ---- Next ----
import { Metadata } from 'next';
// ---- Components ----
import Header from '@layouts/header';
import PocketTimeStamp from '@layouts/PocketTimeStamp';

export const metadata: Metadata = {
  title: '直近の履歴｜Pocket Time Stamp',
};

export default function Histories() {
  return (
    <>
      <Header />
      <PocketTimeStamp />
    </>
  );
}
