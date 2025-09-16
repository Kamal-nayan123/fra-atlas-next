"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Map, UserCircle, LayoutDashboard, BrainCircuit, BarChart, LogOut, ChevronDown, Languages } from "lucide-react";
import { ThemeToggle } from "./ui/theme-toggle";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "@/navigation";

export function Navigation() {
  const pathname = usePathname();
  const t = useTranslations("Navigation");

  const navLinks = [
    { href: "/", label: t("dashboard"), icon: LayoutDashboard },
    { href: "/atlas", label: t("atlas"), icon: Map },
    { href: "/dss", label: t("dss"), icon: BrainCircuit },
    { href: "/analytics", label: t("analytics"), icon: BarChart },
  ];

  return (
    <nav className="bg-sidebar text-sidebar-foreground border-b border-sidebar-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <Map className="h-7 w-7 text-primary" />
              <span className="font-bold text-xl">FRA Atlas</span>
            </Link>
            <div className="hidden md:flex items-center space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname.endsWith(link.href)
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "hover:bg-sidebar-accent/50"
                  }`}
                >
                  <link.icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-sidebar-accent/50">
                  <UserCircle className="h-5 w-5" />
                  <span>MoTA Admin</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium border border-sidebar-border hover:bg-sidebar-accent/50">
                  <Languages className="h-5 w-5" />
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href={pathname} locale="en">English</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={pathname} locale="hi">हिन्दी</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={pathname} locale="or">ଓଡ଼ିଆ</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={pathname} locale="te">తెలుగు</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
