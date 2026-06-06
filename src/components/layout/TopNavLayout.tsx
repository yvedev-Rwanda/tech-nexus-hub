import { Link } from "@tanstack/react-router";
import { Search, Bell, MessageSquare, ChevronDown, Home, BookOpen, Users, Building2, Briefcase, LogOut, Sun, Moon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/components/theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const navItems = [
  { icon: Home, label: "Home", href: "/feed" },
  { icon: BookOpen, label: "Learn", href: "/learning" },
  { icon: Users, label: "Network", href: "/network" },
  { icon: Building2, label: "Companies", href: "/companies" },
  { icon: Briefcase, label: "Opportunities", href: "/opportunities" },
];

export function TopNavLayout({ children }: { children: React.ReactNode }) {
  const { user, profile, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 h-16 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-full max-w-[1400px] items-center gap-6 px-6">
          {/* Logo */}
          <Link to="/feed" className="flex items-center gap-2 shrink-0">
            <div className="h-9 w-9 rounded-lg overflow-hidden bg-black flex items-center justify-center">
              <img src={logo} alt="VEXA" className="h-full w-full object-cover" />
            </div>
            <span className="text-xl font-bold tracking-tight">VEXA</span>
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative"
                activeProps={{ className: "text-primary border-b-2 border-primary rounded-none" }}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search */}
          <div className="flex-1 max-w-md ml-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for skills, people, companies, posts..."
              className="w-full h-10 pl-10 pr-12 rounded-lg bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground border border-border rounded px-1.5 py-0.5">⌘K</kbd>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center">3</span>
            </Button>

            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-border ml-1">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={profile?.avatar_url ?? undefined} />
                  <AvatarFallback>{profile?.firstName?.[0] ?? "U"}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium hidden md:inline">{profile?.firstName ?? "User"}</span>
                <Button variant="ghost" size="icon" onClick={() => logout()} title="Logout">
                  <LogOut className="h-4 w-4" />
                </Button>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
            ) : (
              <Link to="/auth" className="text-sm font-semibold text-primary px-3">Sign In</Link>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-6 py-6">{children}</main>
    </div>
  );
}
