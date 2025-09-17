"use client";
import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Navigation } from "@/components/navigation";
import { usePathname } from "next/navigation";
import { NextIntlClientProvider } from 'next-intl';
import { use } from "react";

export default function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const { locale } = use(params);
  const pathname = usePathname();
  const showNav = !pathname.endsWith('/login');

  // You would get messages from your CMS or a local file
  // For this example, we'll use an empty object
  const messages = {};

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {showNav && <Navigation />}
        <main className="bg-background text-foreground min-h-screen">
          {children}
        </main>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
