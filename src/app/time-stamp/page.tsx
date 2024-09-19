// ---- Next ----
import { Metadata } from 'next';
// ---- Components ----
import Header from '@layouts/header';
import PocketTimeStamp from '@layouts/PocketTimeStamp';

export const metadata: Metadata = {
  title: 'タイムスタンプ作成｜Pocket Time Stamp',
};

export default function TimeStamp() {
  return (
    <>
      <Header />
      <PocketTimeStamp />
    </>
  );
}