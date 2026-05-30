import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  Home,
  Users,
  Rss,
  GraduationCap,
  Building2,
  Briefcase,
  LogOut,
  Bell,
  Search,
  ChevronRight,
  Sun,
  Moon,
  UserCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/components/theme-provider";
import logo from "@/assets/logo.png";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, profile, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  const navItems = [
    { icon: Home, label: t("nav.home") || "Home", href: "/" },
    { icon: Rss, label: t("nav.feed") || "Feed", href: "/feed" },
    { icon: GraduationCap, label: t("nav.learning") || "Learning", href: "/learning" },
    { icon: Users, label: t("nav.network") || "Network", href: "/network" },
    { icon: Building2, label: t("nav.companies") || "Companies", href: "/companies" },
    { icon: Briefcase, label: t("nav.opportunities") || "Opportunities", href: "/opportunities" },
  ];

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-500">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-full w-64 border-r border-border/40 bg-card/30 backdrop-blur-xl flex flex-col">
        <div className="flex h-16 items-center gap-2 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black border border-primary/20 shadow-[var(--shadow-glow)] overflow-hidden">
             <img src={logo} alt="VEXA" className="h-full w-full object-cover" />
          </div>
          <span className="text-xl font-bold tracking-tighter bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">VEXA</span>
        </div>

        <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all hover:bg-primary/10 hover:text-primary group"
              activeProps={{ className: "bg-primary/20 text-primary shadow-sm shadow-primary/20" }}
            >
              <item.icon className="h-5 w-5 transition-transform group-hover:scale-110" />
              {item.label}
              <ChevronRight className="ml-auto h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border/40 space-y-4">
             <div className="flex items-center justify-between px-4 py-2 rounded-xl bg-background/50 border border-border/40">
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Theme</span>
                  <button 
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="p-2 rounded-lg bg-card border border-border/40 hover:bg-accent transition-colors"
                  >
                    {theme === "dark" ? <Sun className="h-4 w-4 text-primary" /> : <Moon className="h-4 w-4 text-primary" />}
                  </button>
             </div>

             <div className="px-4 text-[10px] font-bold text-center">
                  <p className="opacity-50 uppercase tracking-[0.2em]">Developed by</p>
                  <p className="text-primary mt-1">yvedev Rwanda</p>
             </div>

             <div className="px-4 pb-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 rounded-xl py-6 hover:bg-destructive/10 hover:text-destructive group"
                  onClick={() => logout()}
                >
                  <LogOut className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                  <span className="text-sm font-bold">Logout</span>
                </Button>
             </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pl-64">
        <header className="sticky top-0 z-30 h-16 border-b border-border/40 bg-background/50 backdrop-blur-md px-8 flex items-center justify-between">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search Ecosystem..."
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
                  <p className="text-sm font-semibold">{profile?.firstName || "VEXA"} {profile?.lastName || "User"}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{profile?.role || "Member"}</p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20 flex items-center justify-center overflow-hidden">
                    <UserCircle className="h-6 w-6 text-primary" />
                </div>
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
