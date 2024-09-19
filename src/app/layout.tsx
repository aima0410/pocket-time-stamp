import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import 'public/globals.css';
// import "public/reset.css";

import { KumaRegistry } from '@kuma-ui/next-plugin/registry';
// ---- Components ----
import Header from '@layouts/Header';
import PocketTimeStamp from '@layouts/PocketTimeStamp';
import VisitRepositoryButton from '@ui-parts/VisitRepositoryButton';

const notoSansJP = Noto_Sans_JP({ subsets: ['latin'] });

export const metadata: Metadata = {
  description: '日々の過ごし方を気軽に改善できるポケットタイムスタンプアプリです。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <KumaRegistry>
        <body className={notoSansJP.className}>
          <Header />
          <PocketTimeStamp />
          {/* ---- 外部リンク ---- */}
          <VisitRepositoryButton />
          {children}
        </body>
      </KumaRegistry>
    </html>
  );
}
