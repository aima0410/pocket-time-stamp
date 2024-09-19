// ---- Next ----
import { Metadata } from 'next';
// ---- Components ----
import Header from '@layouts/header';
import PocketTimeStamp from '@layouts/PocketTimeStamp';

export const metadata: Metadata = {
  title: 'コレクション｜Pocket Time Stamp',
};


export default function Collection() {
  return (
    <>
      <Header />
      <PocketTimeStamp />
    </>
  );
}