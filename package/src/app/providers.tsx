"use client";

import { useEffect } from "react";
import { I18nProvider } from "@/lib/i18n/context";
import { ThemeProvider } from "@/lib/theme/context";
import { checkScheduledNotifications } from "@/lib/notifications";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(console.error);
    }

    checkScheduledNotifications();

    const notificationInterval = setInterval(() => {
      checkScheduledNotifications();
    }, 60000);

    return () => clearInterval(notificationInterval);
  }, []);

  return (
    <ThemeProvider>
      <I18nProvider>{children}</I18nProvider>
    </ThemeProvider>
  );
}

