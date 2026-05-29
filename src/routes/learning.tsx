import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { AppLayout } from "@/components/layout/AppLayout";
import { getCourses, type Course } from "@/lib/nexusApi";
import {
  BookOpen, Clock, Star, ChevronRight,
  Code2, Globe, Lock, PlayCircle, Sparkles, Cpu, Loader2, AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/learning")({
  component: LearningPage,
});

const ICON_MAP: Record<string, React.ElementType> = {
  Globe, Cpu, Sparkles, Lock, BookOpen, Code2,
};

const COLOR_MAP: Record<string, string> = {
  "text-blue-400": "text-blue-400",
  "text-purple-400": "text-purple-400",
  "text-amber-400": "text-amber-400",
  "text-emerald-400": "text-emerald-400",
};

function CourseCard({ course, progress }: { course: Course; progress: number }) {
  const { t } = useTranslation();
  const Icon = ICON_MAP[course.icon_name] ?? BookOpen;
  const colorClass = COLOR_MAP[course.color_class] ?? "text-primary";

  return (
    <Card className="group border-border/40 bg-card/30 backdrop-blur hover:border-primary/40 transition-[var(--transition-smooth)] overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className={`h-12 w-12 rounded-2xl bg-card border border-border flex items-center justify-center ${colorClass}`}>
              <Icon className="h-6 w-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest bg-muted/40 px-2 py-1 rounded-md">
              {course.level}
            </span>
          </div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{course.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">{course.description}</p>
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-muted-foreground">{t("learning.progression")}</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-1.5 bg-muted/40" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-4 items-center text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <PlayCircle className="h-3.5 w-3.5" />
                {course.total_modules} {t("learning.modules")}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {course.duration}
              </span>
            </div>
            <Button variant="ghost" size="sm" className="h-8 gap-2 group-hover:translate-x-1 transition-transform">
              {t("learning.continue")} <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function LearningPage() {
  const { t } = useTranslation();
  const { data: courses, isLoading, isError } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  return (
    <AppLayout>
      <div className="space-y-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">{t("learning.title")}</h1>
          <p className="text-muted-foreground max-w-2xl">{t("learning.subtitle")}</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: BookOpen, label: t("learning.activePaths"), value: courses?.length ?? 0, color: "text-primary", bg: "bg-primary/10" },
            { icon: Star, label: t("learning.skillPoints"), value: "128", color: "text-accent", bg: "bg-accent/10" },
            { icon: Code2, label: t("learning.labsCompleted"), value: "42", color: "text-emerald-500", bg: "bg-emerald-500/10" },
            { icon: Clock, label: t("learning.learningTime"), value: "86h", color: "text-purple-500", bg: "bg-purple-500/10" },
          ].map((stat) => (
            <Card key={stat.label} className="border-border/40 bg-card/30 backdrop-blur">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className={`h-10 w-10 rounded-full ${stat.bg} flex items-center justify-center ${stat.color} mb-2`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{stat.label}</p>
              </CardContent>
            </Card>
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

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses?.map((course, i) => (
            <CourseCard key={course.id} course={course} progress={[65, 15, 0, 0][i] ?? 0} />
          ))}
        </div>

        {/* CTA */}
        <section className="relative rounded-3xl border border-primary/20 bg-primary/5 p-8 overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Sparkles className="h-32 w-32 text-primary" />
          </div>
          <div className="relative z-10 max-w-xl">
            <h3 className="text-xl font-bold mb-2">{t("learning.certTitle")}</h3>
            <p className="text-sm text-muted-foreground mb-6">{t("learning.certDesc")}</p>
            <Button className="bg-primary text-primary-foreground">{t("learning.exploreCerts")}</Button>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
