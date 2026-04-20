import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Literacy Tool",
  description: "A lightweight literacy tool for parents and kids.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}