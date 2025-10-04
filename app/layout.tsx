import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sports Time Machine Depth Sensor Sim",
  description: "スポーツタイムマシンで使用する1ユニットの深度センサーを検討するための社内向けアプリです。"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
