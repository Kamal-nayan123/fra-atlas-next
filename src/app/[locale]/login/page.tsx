"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from 'next/navigation';
import { Map } from "lucide-react";
import { useTranslations } from "next-intl";

const roles = [
  "Ministry of Tribal Affairs",
  "District-level Tribal Welfare Departments",
  "Forest and Revenue Departments",
  "Planning & Development Authorities",
  "NGOs working with tribal communities",
];

export default function LoginPage() {
  const router = useRouter();
  const t = useTranslations("Login");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd have authentication logic here.
    // For now, we'll just redirect to the dashboard.
    router.push('/');
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">{t("title")}</h1>
            <p className="text-balance text-muted-foreground">
              {t("description")}
            </p>
          </div>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">{t("emailLabel")}</Label>
              <Input id="email" type="text" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">{t("passwordLabel")}</Label>
              </div>
              <Input id="password" type="password" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">{t("roleLabel")}</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={t("rolePlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">
              {t("loginButton")}
            </Button>
          </form>
        </div>
      </div>
      <div className="hidden bg-muted lg:flex items-center justify-center p-8">
        <div className="text-center">
          <Map className="h-24 w-24 text-primary mx-auto mb-4" />
          <h2 className="text-4xl font-bold">FRA Atlas Platform</h2>
          <p className="text-xl text-muted-foreground mt-2">Empowering tribal communities through data.</p>
        </div>
      </div>
    </div>
  );
}
