import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { AppLayout } from "@/components/layout/AppLayout";
import { getCompanies, type Company } from "@/lib/nexusApi";
import {
  Building2, Users, Briefcase, Award, Globe,
  ExternalLink, ChevronRight, ShieldCheck, Zap, Loader2, AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/companies")({
  component: CompanyHubPage,
});

function CompanyCard({ company }: { company: Company }) {
  const { t } = useTranslation();

  return (
    <Card className="group border-border/40 bg-card/30 backdrop-blur hover:border-primary/40 transition-[var(--transition-smooth)] cursor-pointer">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <Avatar className="h-24 w-24 rounded-2xl border border-border bg-background p-2">
            <AvatarImage src={company.logo_url} />
            <AvatarFallback>{company.name?.[0] ?? "C"}</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-4 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h3 className="text-2xl font-bold">{company.name}</h3>
              {company.is_verified && <ShieldCheck className="h-5 w-5 text-emerald-400" />}
              <Badge variant="secondary" className="bg-primary/10 text-primary border-none text-[10px] font-black">
                {company.industry}
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm max-w-xl">{company.tagline}</p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                <Users className="h-4 w-4" />
                {company.employee_count} {t("companies.employees")}
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                {company.open_roles} {t("companies.openRoles")}
              </div>
              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:underline"
                >
                  <Globe className="h-4 w-4" />
                  {t("companies.website")}
                </a>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full md:w-auto">
            <Button className="w-full gap-2 bg-primary text-primary-foreground font-bold">
              {t("common.viewProfile")} <ExternalLink className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="w-full glass-dark">
              {t("common.follow")}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CompanyHubPage() {
  const { t } = useTranslation();
  const { data: companies, isLoading, isError } = useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });

  const stats = [
    { label: t("companies.verified"), val: "1,240+", icon: ShieldCheck, col: "text-emerald-400" },
    { label: t("companies.training"), val: "850+", icon: Zap, col: "text-amber-400" },
    { label: t("companies.certifications"), val: "15k+", icon: Award, col: "text-primary" },
  ];

  return (
    <AppLayout>
      <div className="space-y-10">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-[2rem] border border-border/40 bg-card/20 p-12 backdrop-blur-xl">
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <Building2 className="h-64 w-64" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <Badge variant="outline" className="mb-4 border-primary/40 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
              Ecosystem Hub
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-4">{t("companies.title")}</h1>
            <p className="text-lg text-muted-foreground mb-8">{t("companies.subtitle")}</p>
            <div className="flex flex-wrap gap-4">
              <Button className="h-12 bg-[image:var(--gradient-primary)] text-primary-foreground font-semibold px-8">
                {t("companies.register")}
              </Button>
              <Button variant="outline" className="h-12 gap-2 glass-dark">
                {t("companies.browse")}
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-border/40 bg-card/30 backdrop-blur">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stat.val}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-1">{stat.label}</p>
                </div>
                <div className={`h-12 w-12 rounded-2xl bg-muted/30 flex items-center justify-center ${stat.col}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Company List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{t("companies.featured")}</h2>
            <Button variant="link" className="text-accent text-xs font-bold uppercase tracking-widest">
              {t("companies.viewAll")} <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          {isLoading && (
            <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
          )}
          {isError && (
            <div className="flex flex-col items-center py-12 gap-3 text-destructive">
              <AlertCircle className="h-8 w-8" />
              <p className="text-sm font-medium">{t("common.error")}</p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6">
            {companies?.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
            {companies?.length === 0 && !isLoading && (
              <p className="text-center text-muted-foreground py-12">{t("common.noData")}</p>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
