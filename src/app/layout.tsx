import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import 'public/globals.css';
// import "public/reset.css";
// ---- Components ----
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
      <body className={notoSansJP.className}>
        <header>
          <h1>PocketTimeStamp</h1>
          <p>タイムスタンプアプリ</p>
        </header>
        <main>
          <PocketTimeStamp />
          {/* ---- 外部リンク ---- */}
          <VisitRepositoryButton />
          {children}
        </main>
      </body>
    </html>
  );
}
