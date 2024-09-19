// ---- Next ----
import { Metadata } from 'next';
// ---- Components ----
import Tutorial from '@layouts/Tutorial';

export const metadata: Metadata = {
  title: 'Pocket Time Stamp',
};

export default function Home() {
  return (
    <>
      <Tutorial />
    </>
  );
}
