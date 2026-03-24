"use client";
import "./global.css";
import { I18nProvider } from "@/lib/i18n/context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
        <title>TikTok Rewards - Premium Courses</title>
        <meta name="description" content="TikTok Rewards - Premium course platform. Learn from the best creators." />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
