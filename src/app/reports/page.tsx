// ---- Next ----
import { Metadata } from 'next';
// ---- Components ----
import Header from '@layouts/header';
import PocketTimeStamp from '@layouts/PocketTimeStamp';

export const metadata: Metadata = {
  title: 'レポート｜Pocket Time Stamp',
};

export default function Reports() {
  return (
    <>
      <Header />
      <PocketTimeStamp />
    </>
  );
}