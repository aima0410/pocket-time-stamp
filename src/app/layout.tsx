import type { Metadata } from 'next';
import { Noto_Sans_JP, Outfit, Yusei_Magic } from 'next/font/google';
import 'public/reset.css';
import 'public/globals.css';
// ---- KumaUI ----
import { css } from '@kuma-ui/core';
import { KumaRegistry } from '@kuma-ui/next-plugin/registry';
// ---- Components ----
import PocketTimeStamp from '@layouts/PocketTimeStamp';
import VisitRepositoryButton from '@ui-parts/VisitRepositoryButton';

// ========== メタデータ ===========
export const metadata: Metadata = {
  description: '日々の過ごし方を気軽に改善できるポケットタイムスタンプアプリです。',
};

// ========== CSS宣言 ===========
const notoSansJP = Noto_Sans_JP({ subsets: ['latin'], weight: ['400', '600', '900'] });
const outfit = Outfit({ subsets: ['latin'] });
const yuseiMagic = Yusei_Magic({ subsets: ['latin'], weight: '400' });

const baseStyle = css`
  display: grid;
  place-items: center;
  width: 100vw;
  height: fit-content;
  min-height: 100dvh;
  /* ---font ---- */
  color: var(--base-color);
  font-size: var(--base-font-size);
  text-align: center;
  letter-spacing: var(--base-letter-spacing);
`;

// ========== コンポーネント関数 ===========
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <KumaRegistry>
        <body>
          <div
            className={`${notoSansJP.className} ${baseStyle}`}
            style={
              {
                '--en': `${outfit.style.fontFamily}`,
                '--yusei': `${yuseiMagic.style.fontFamily}`,
              } as React.CSSProperties
            }
          >
            <PocketTimeStamp />
            {children}
          </div>
          {/* ---- 外部リンク ---- */}
          <VisitRepositoryButton />
          <div
            className={css`
              position: fixed;
              inset: 0;
              z-index: -999;
              background-color: var(--base-bg-color);
            `}
          ></div>
        </body>
      </KumaRegistry>
    </html>
  );
}
