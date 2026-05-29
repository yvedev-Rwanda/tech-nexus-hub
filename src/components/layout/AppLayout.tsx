import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  Rss,
  GraduationCap,
  Users,
  Building2,
  Briefcase,
  Home,
  Bell,
  Search,
  UserCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/logo.png";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, profile, logout } = useAuth();
  const { t } = useTranslation();

  const navItems = [
    { icon: Home, label: t("nav.home"), href: "/" },
    { icon: Rss, label: t("nav.feed"), href: "/feed" },
    { icon: GraduationCap, label: t("nav.learning"), href: "/learning" },
    { icon: Users, label: t("nav.network"), href: "/network" },
    { icon: Building2, label: t("nav.companies"), href: "/companies" },
    { icon: Briefcase, label: t("nav.opportunities"), href: "/opportunities" },
  ];

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-full w-64 border-r border-border/40 bg-card/30 backdrop-blur-xl">
        <div className="flex h-16 items-center gap-2 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black border border-primary/20 shadow-[var(--shadow-glow)] overflow-hidden">
             <img src={logo} alt="VEXA" className="h-full w-full object-cover" />
          </div>
          <span className="text-xl font-bold tracking-tighter bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">VEXA</span>
        </div>

        <nav className="mt-8 space-y-1 px-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-all hover:bg-card hover:text-foreground active:scale-95"
              activeProps={{ className: "bg-card text-foreground shadow-[var(--shadow-card)]" }}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-8 w-full px-4 space-y-3">
          {/* Language Switcher */}
          <LanguageSwitcher />

          <div className="rounded-2xl border border-border bg-card/50 p-4 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">{t("common.proPlan")}</p>
            <p className="text-xs text-muted-foreground mb-3">{t("common.proDesc")}</p>
            <Button variant="outline" className="w-full text-xs h-8">{t("common.upgrade")}</Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pl-64">
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-16 border-b border-border/40 bg-background/50 backdrop-blur-md px-8 flex items-center justify-between">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("common.search")}
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-muted/30 border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
            />
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-xl">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="h-8 w-[1px] bg-border/40 mx-2" />
            {user ? (
              <div className="flex items-center gap-3 pl-2">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold">{profile?.firstName} {profile?.lastName}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{profile?.role || "Builder"}</p>
                </div>
                <button onClick={logout} className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20 flex items-center justify-center overflow-hidden transition-opacity hover:opacity-70">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <UserCircle className="h-6 w-6 text-primary" />
                  )}
                </button>
              </div>
            ) : (
              <Link to="/auth" className="text-sm font-bold text-primary hover:underline px-4">Sign In</Link>
            )}
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
