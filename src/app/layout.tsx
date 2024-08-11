import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "public/globals.css";
import "public/reset.css";

const notoSansJP = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Done Logger",
  description: "がんばる社会人のための活動記録アプリです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={notoSansJP.className}>{children}</body>
    </html>
  );
}
