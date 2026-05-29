import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { AppLayout } from "@/components/layout/AppLayout";
import { getOpportunities, type Opportunity } from "@/lib/nexusApi";
import {
  Briefcase, MapPin, DollarSign, Calendar,
  Search, Filter, CheckCircle2, Trophy, Rocket,
  GraduationCap, Loader2, AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/opportunities")({
  component: OpportunitiesPage,
});

const TYPE_COLORS: Record<string, string> = {
  "Full-time": "bg-blue-500/10 text-blue-400",
  "Internship": "bg-emerald-500/10 text-emerald-400",
  "Contract": "bg-amber-500/10 text-amber-400",
  "Freelance": "bg-purple-500/10 text-purple-400",
};

function OpportunityCard({ job }: { job: Opportunity }) {
  const { t } = useTranslation();
  const tags = job.tags ? job.tags.split(",") : [];
  const typeColor = TYPE_COLORS[job.type] ?? "bg-primary/10 text-primary";

  return (
    <Card className="group border-border/40 bg-card/30 backdrop-blur hover:border-primary/40 transition-[var(--transition-smooth)] overflow-hidden relative">
      <div className="absolute top-0 right-0 p-6 flex flex-col items-end gap-2 text-right">
        <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[10px] font-black uppercase tracking-tighter">
          {job.match_percentage}% Match
        </Badge>
        <Badge className={`border-none text-[10px] font-black ${typeColor}`}>
          {job.type}
        </Badge>
      </div>

      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6 md:items-center">
          <div className="h-14 w-14 rounded-xl bg-background border border-border flex items-center justify-center text-xl font-black text-primary">
            {job.company_name?.[0] ?? "?"}
          </div>

          <div className="flex-1 space-y-2">
            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{job.title}</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <p className="text-sm font-semibold">{job.company_name}</p>
              {job.location && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                  <MapPin className="h-3.5 w-3.5" />
                  {job.location}
                </div>
              )}
              {job.salary_range && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                  <DollarSign className="h-3.5 w-3.5" />
                  {job.salary_range}
                </div>
              )}
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                <Calendar className="h-3.5 w-3.5" />
                {job.type}
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline" className="px-2 py-0 h-5 text-[10px] uppercase font-bold tracking-widest border-border/40 text-muted-foreground">
                  {tag.trim()}
                </Badge>
              ))}
            </div>
          </div>

          <Button className="md:w-32 bg-primary text-primary-foreground font-bold">
            {t("opportunities.applyNow")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function OpportunitiesPage() {
  const { t } = useTranslation();
  const { data: jobs, isLoading, isError } = useQuery({
    queryKey: ["opportunities"],
    queryFn: getOpportunities,
  });

  const types = [
    { label: t("opportunities.jobs"), icon: Briefcase },
    { label: t("opportunities.internships"), icon: GraduationCap },
    { label: t("opportunities.gigs"), icon: Rocket },
    { label: t("opportunities.hackathons"), icon: Trophy },
  ];

  return (
    <AppLayout>
      <div className="space-y-10">
        {/* Header */}
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">{t("opportunities.title")}</h1>
              <p className="text-muted-foreground">{t("opportunities.subtitle")}</p>
            </div>
            <Button size="lg" className="bg-[image:var(--gradient-primary)] text-primary-foreground font-bold shadow-[var(--shadow-glow)]">
              {t("opportunities.postOpportunity")}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={t("opportunities.searchPlaceholder")}
                className="w-full h-12 pl-10 pr-4 rounded-xl bg-card/30 border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/20 backdrop-blur"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={t("opportunities.locationPlaceholder")}
                className="w-full h-12 pl-10 pr-4 rounded-xl bg-card/30 border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/20 backdrop-blur"
              />
            </div>
            <Button variant="outline" className="h-12 gap-2 glass-dark">
              <Filter className="h-4 w-4" />
              {t("opportunities.filters")}
            </Button>
          </div>
        </div>

        {/* Type Filter */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {types.map((type) => (
            <button key={type.label} className="group flex flex-col items-center justify-center p-6 rounded-2xl border border-border/40 bg-card/30 backdrop-blur hover:border-primary/40 transition-all hover:-translate-y-1">
              <type.icon className="h-6 w-6 mb-3 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">{type.label}</span>
            </button>
          ))}
        </div>

        {/* Jobs List */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            {t("opportunities.matchedForYou")}
          </h2>

          {isLoading && (
            <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
          )}
          {isError && (
            <div className="flex flex-col items-center py-12 gap-3 text-destructive">
              <AlertCircle className="h-8 w-8" />
              <p className="text-sm font-medium">{t("common.error")}</p>
            </div>
          )}

          <div className="space-y-4">
            {jobs?.map((job) => (
              <OpportunityCard key={job.id} job={job} />
            ))}
            {jobs?.length === 0 && !isLoading && (
              <p className="text-center text-muted-foreground py-12">{t("common.noData")}</p>
            )}
          </div>

          <Button variant="outline" className="w-full h-12 glass-dark font-semibold">
            {t("opportunities.browseAll")}
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
