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
  MessageCircle,
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
    { icon: GraduationCap, label: t("nav.learning") || "Learn", href: "/learning" },
    { icon: Users, label: t("nav.network") || "Network", href: "/network" },
    { icon: Building2, label: t("nav.companies") || "Companies", href: "/companies" },
    { icon: Briefcase, label: t("nav.opportunities") || "Opportunities", href: "/opportunities" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      {/* Top Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-10 h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-glow overflow-hidden">
               <img src="/src/assets/logo.png" alt="VEXA" className="h-full w-full object-cover brightness-0 invert" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-primary">VEXA</span>
          </Link>

          {/* Main Nav */}
          <nav className="hidden xl:flex items-center gap-1 h-full">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="relative flex items-center gap-2 px-4 h-full text-sm font-semibold transition-all hover:text-primary group"
                activeProps={{ className: "text-primary border-b-4 border-primary" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Global Search */}
        <div className="flex-1 max-w-xl mx-10 hidden md:block">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search for skills, people, companies, posts..."
              className="w-full h-11 pl-12 pr-12 rounded-xl bg-muted/50 border-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
               <kbd className="h-5 px-1.5 rounded border border-border bg-card text-[10px] font-bold text-muted-foreground">⌘ K</kbd>
            </div>
          </div>
        </div>

        {/* Utility Actions */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 text-muted-foreground hover:bg-muted">
              <MessageCircle className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative rounded-full h-10 w-10 text-muted-foreground hover:bg-muted">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-4 w-4 bg-primary text-[10px] font-bold text-white rounded-full flex items-center justify-center border-2 border-card">3</span>
            </Button>
          </div>

          <div className="h-8 w-[1px] bg-border mx-1" />

          {user ? (
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black leading-none">{profile?.firstName || "Arjun"} {profile?.lastName || "Verma"}</p>
                <p className="text-[10px] text-muted-foreground font-bold mt-1">Frontend Developer</p>
              </div>
              <Avatar className="h-10 w-10 rounded-full border border-border shadow-sm cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all">
                <AvatarImage src="https://i.pravatar.cc/150?u=arjun" />
                <AvatarFallback>AV</AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <Link to="/auth">
              <Button size="sm" className="rounded-xl font-bold bg-primary px-6">Sign In</Button>
            </Link>
          )}
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full h-9 w-9"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[1440px] mx-auto p-6 lg:p-8">
        {children}
      </main>

      {/* Mobile Nav Bar - Hidden on Desktop */}
      <footer className="xl:hidden fixed bottom-0 left-0 w-full z-50 bg-card/95 backdrop-blur-md border-t border-border px-4 py-2 flex justify-around">
        {navItems.map((item) => (
           <Link key={item.href} to={item.href} className="flex flex-col items-center gap-1 p-2 text-muted-foreground" activeProps={{ className: "text-primary" }}>
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-bold">{item.label}</span>
           </Link>
        ))}
      </footer>
    </div>
  );
}

