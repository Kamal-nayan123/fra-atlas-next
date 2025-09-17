"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "./navigation";
import { ThemeProvider } from "./ui/theme-provider";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showNav = !pathname.endsWith('/login');

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {showNav && <Navigation />}
      <main className="bg-background text-foreground min-h-screen">
        {children}
      </main>
    </ThemeProvider>
  );
}
