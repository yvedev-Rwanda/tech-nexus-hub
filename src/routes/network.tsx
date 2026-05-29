import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { AppLayout } from "@/components/layout/AppLayout";
import { getUsers, type User } from "@/lib/nexusApi";
import {
  Search,
  Filter,
  MapPin,
  Github,
  Twitter,
  UserPlus,
  MessageSquare,
  Loader2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/network")({
  component: NetworkPage,
});

const CATEGORIES = ["allBuilders", "Frontend", "Backend", "Mobile", "AI/ML", "DevOps", "Design", "Security"];

function ProfessionalCard({ user }: { user: User }) {
  const { t } = useTranslation();

  return (
    <Card className="group border-border/40 bg-card/30 backdrop-blur hover:border-primary/40 transition-[var(--transition-smooth)] overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="relative">
            <Avatar className="h-20 w-20 border-2 border-border group-hover:border-primary/40 transition-colors">
              <AvatarImage src={user.avatar_url} />
              <AvatarFallback>{user.name?.[0] ?? "U"}</AvatarFallback>
            </Avatar>
            {user.level >= 5 && (
              <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-1 border-4 border-background shadow-lg">
                <ShieldCheck className="w-3 h-3" />
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
              <Github className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
              <Twitter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-1 mb-4">
          <h3 className="text-lg font-bold">{user.name}</h3>
          <p className="text-sm font-medium text-accent">{user.role}</p>
          {user.bio && (
            <p className="text-xs text-muted-foreground line-clamp-2 pt-1">{user.bio}</p>
          )}
          <div className="flex items-center gap-3 pt-2">
            <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary border-none">
              Lvl {user.level}
            </Badge>
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
              {user.skill_points} XP
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-9 gap-2 text-xs border-border/40">
            <MessageSquare className="h-3.5 w-3.5" />
            {t("common.message")}
          </Button>
          <Button className="h-9 gap-2 text-xs bg-[image:var(--gradient-primary)] text-primary-foreground">
            <UserPlus className="h-3.5 w-3.5" />
            {t("common.connect")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function NetworkPage() {
  const { t } = useTranslation();

  const { data: users, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">{t("network.title")}</h1>
          <p className="text-muted-foreground">{t("network.subtitle")}</p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("network.filterPlaceholder")}
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-card/30 border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/20 backdrop-blur"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" className="gap-2 h-11 border-border/40 glass-dark">
              <Filter className="h-4 w-4" />
              {t("network.advancedFilters")}
            </Button>
            <Button className="h-11 bg-[image:var(--gradient-primary)] text-primary-foreground font-semibold">
              {t("network.findMentors")}
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className="whitespace-nowrap px-4 py-2 rounded-full border border-border/40 bg-card/30 text-xs font-semibold hover:border-primary/40 transition-colors"
            >
              {cat === "allBuilders" ? t("network.allBuilders") : cat}
            </button>
          ))}
        </div>

        {/* State */}
        {isLoading && (
          <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
        )}
        {isError && (
          <div className="flex flex-col items-center py-12 gap-3 text-destructive">
            <AlertCircle className="h-8 w-8" />
            <p className="text-sm font-medium">{t("common.error")}</p>
          </div>
        )}

        {/* Discovery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users?.map((user) => (
            <ProfessionalCard key={user.id} user={user} />
          ))}
          {users?.length === 0 && !isLoading && (
            <p className="col-span-3 text-center text-muted-foreground py-12">{t("common.noData")}</p>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
