"use client";

import "../globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Navigation } from "@/components/navigation";
import { usePathname } from "next/navigation";
import { NextIntlClientProvider } from 'next-intl';
import { use } from 'react';

export default function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const { locale } = use(params);
  const pathname = usePathname();
  const showNav = !pathname.endsWith('/login');

  const messages = async () => {
    try {
      return (await import(`../../messages/${locale}.json`)).default;
    } catch {
      return {};
    }
  };

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider defaultTheme="system" storageKey="fra-atlas-theme">
        {showNav && <Navigation />}
        <main className="bg-background text-foreground min-h-screen">
          {children}
        </main>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
