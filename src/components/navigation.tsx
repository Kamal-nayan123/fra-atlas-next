"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Map, UserCircle } from "lucide-react";

const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/atlas", label: "FRA Atlas" },
  { href: "/assets", label: "AI Asset Mapping" },
  { href: "/dss", label: "Decision Support" },
  { href: "/documents", label: "Document AI" },
  { href: "/analytics", label: "Analytics" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <Map className="h-6 w-6" />
              <span className="font-bold text-lg">FRA Atlas</span>
            </Link>
            <div className="hidden md:flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === link.href
                      ? "bg-primary-foreground/10"
                      : "hover:bg-primary-foreground/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <button className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-foreground/10">
                <UserCircle className="h-5 w-5" />
                <span>MoTA Admin</span>
              </button>
              {/* Dropdown would go here */}
            </div>
            <button className="px-3 py-2 rounded-md text-sm font-medium border border-primary-foreground/50 hover:bg-primary-foreground/10">
              हिन्दी
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
