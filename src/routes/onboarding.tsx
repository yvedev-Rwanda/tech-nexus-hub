import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import {
  Rss,
  GraduationCap,
  Users,
  Building2,
  Briefcase,
  ArrowRight,
  ArrowLeft,
  X,
  CheckCircle2,
  Zap,
  Globe,
  ShieldCheck,
  Trophy,
  Star,
  TrendingUp,
  Code2,
  Layers,
  Rocket,
  BookOpen,
  Search,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "VEXA — How It Works" },
      { name: "description", content: "Discover how VEXA helps you learn, connect, build, and get opportunities in tech." },
    ],
  }),
  component: OnboardingPage,
});

const slides = [
  {
    id: 0,
    badge: "Welcome to VEXA",
    icon: Rocket,
    color: "from-violet-500 to-indigo-600",
    glowColor: "rgba(139, 92, 246, 0.3)",
    title: "One Ecosystem.",
    subtitle: "Infinite Possibilities.",
    description:
      "Tech growth is broken — scattered across 10+ platforms. VEXA unifies Learning, Community, Companies, and Career Opportunities into one powerful loop.",
    features: [
      { icon: CheckCircle2, label: "No more platform switching" },
      { icon: CheckCircle2, label: "One verified profile across everything" },
      { icon: CheckCircle2, label: "Skills connect directly to opportunities" },
    ],
    visual: <WelcomeVisual />,
    cta: "Show Me How",
    href: null,
  },
  {
    id: 1,
    badge: "01 · Content Module",
    icon: GraduationCap,
    color: "from-blue-500 to-cyan-500",
    glowColor: "rgba(59, 130, 246, 0.3)",
    title: "Learn with",
    subtitle: "Structure & Purpose.",
    description:
      "Structured roadmaps built by senior engineers. Every module you finish updates your verified skill profile — making you visible to recruiters and partners automatically.",
    features: [
      { icon: BookOpen, label: "Frontend, Backend, AI/ML, DevOps paths" },
      { icon: Trophy, label: "Blockchain-verified skill certificates" },
      { icon: TrendingUp, label: "Progress tracked across your profile" },
    ],
    visual: <LearningVisual />,
    cta: "Explore Learning",
    href: "/learning",
  },
  {
    id: 2,
    badge: "02 · Interaction Layer",
    icon: Rss,
    color: "from-emerald-500 to-teal-500",
    glowColor: "rgba(16, 185, 129, 0.3)",
    title: "Share. Debate.",
    subtitle: "Stay in the Signal.",
    description:
      "A real-time feed of tech insights, project showcases, and ecosystem activity — curated for builders. No noise, no influencer fluff. Only high-signal developer content.",
    features: [
      { icon: Zap, label: "Real-time tech discussions & debates" },
      { icon: Star, label: "Project showcases from your community" },
      { icon: Bell, label: "Personalized ecosystem notifications" },
    ],
    visual: <FeedVisual />,
    cta: "Go to Feed",
    href: "/feed",
  },
  {
    id: 3,
    badge: "03 · Professional Space",
    icon: Users,
    color: "from-orange-500 to-rose-500",
    glowColor: "rgba(249, 115, 22, 0.3)",
    title: "Network Built",
    subtitle: "on Proof, Not Claims.",
    description:
      "Discover mentors, co-founders, and collaborators. Every profile is backed by verified activity — skills, projects, learning completions. No fake titles, just real capability.",
    features: [
      { icon: ShieldCheck, label: "Verified skill-based profiles" },
      { icon: Globe, label: "Global developer network" },
      { icon: Search, label: "Filter by skill, role, or location" },
    ],
    visual: <NetworkVisual />,
    cta: "Browse Network",
    href: "/network",
  },
  {
    id: 4,
    badge: "04 · Ecosystem Bridge",
    icon: Building2,
    color: "from-purple-500 to-pink-500",
    glowColor: "rgba(168, 85, 247, 0.3)",
    title: "Companies",
    subtitle: "Meet Ready Talent.",
    description:
      "Verified company pages post training programs, issue accredited certifications, and recruit directly from a pre-skilled talent pipeline grown inside VEXA.",
    features: [
      { icon: Layers, label: "Company-issued certifications" },
      { icon: Code2, label: "Sponsored training programs" },
      { icon: Briefcase, label: "Direct talent pipeline access" },
    ],
    visual: <CompaniesVisual />,
    cta: "View Companies",
    href: "/companies",
  },
  {
    id: 5,
    badge: "05 · Career Module",
    icon: Briefcase,
    color: "from-amber-500 to-orange-500",
    glowColor: "rgba(245, 158, 11, 0.3)",
    title: "Opportunities",
    subtitle: "Come to You.",
    description:
      "Jobs, internships, freelance gigs, and hackathons — surfaced based on your verified skills and learning progress. Get matched intelligently, not spammed randomly.",
    features: [
      { icon: Zap, label: "AI-powered skill matching" },
      { icon: Globe, label: "Remote & local opportunities" },
      { icon: Trophy, label: "Hackathons & scholarship access" },
    ],
    visual: <OpportunitiesVisual />,
    cta: "Find Opportunities",
    href: "/opportunities",
  },
];

// ─── Visuals ─────────────────────────────────────────────────────────────────

function WelcomeVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative">
        {/* Orbiting rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-72 h-72 border border-white/10 rounded-full animate-spin [animation-duration:20s]" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 border border-white/15 rounded-full animate-spin [animation-duration:12s] [animation-direction:reverse]" />
        </div>
        {/* Center */}
        <div className="relative z-10 w-24 h-24 rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-2xl">
          <Rocket className="w-12 h-12 text-white" />
        </div>
        {/* Satellite nodes */}
        {[GraduationCap, Rss, Users, Building2, Briefcase].map((Icon, i) => {
          const angle = (i / 5) * 2 * Math.PI - Math.PI / 2;
          const r = 130;
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          return (
            <div
              key={i}
              className="absolute w-12 h-12 rounded-2xl bg-white/10 border border-white/20 backdrop-blur flex items-center justify-center"
              style={{
                left: `calc(50% + ${x}px - 24px)`,
                top: `calc(50% + ${y}px - 24px)`,
                animation: `float ${2 + i * 0.4}s ease-in-out infinite alternate`,
              }}
            >
              <Icon className="w-5 h-5 text-white/80" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LearningVisual() {
  const courses = [
    { name: "React 19 Mastery", progress: 85, color: "bg-blue-500" },
    { name: "TypeScript Advanced", progress: 62, color: "bg-cyan-500" },
    { name: "Node.js Microservices", progress: 40, color: "bg-indigo-500" },
    { name: "Vector Databases", progress: 15, color: "bg-violet-500" },
  ];
  return (
    <div className="w-full space-y-4 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm font-bold text-white/60 uppercase tracking-widest">Your Progress</span>
        <span className="text-xs font-black text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full">Level 7 Dev</span>
      </div>
      {courses.map((c, i) => (
        <div key={i} className="space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-white/80">{c.name}</span>
            <span className="text-white/40">{c.progress}%</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div
              className={`h-full ${c.color} rounded-full transition-all duration-1000`}
              style={{ width: `${c.progress}%` }}
            />
          </div>
        </div>
      ))}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold text-white/60">4 / 8 Certs Earned</span>
        </div>
        <div className="flex -space-x-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-black/40" />
          ))}
        </div>
      </div>
    </div>
  );
}

function FeedVisual() {
  const posts = [
    { name: "Alex K.", role: "Backend Dev", content: "Hot take: Bun will replace Node.js in production by 2026 🔥", likes: 142, tag: "Debate" },
    { name: "Mia L.", role: "ML Engineer", content: "Just shipped my open-source RAG pipeline. Link in bio 🚀", likes: 89, tag: "Project" },
    { name: "Sam O.", role: "DevOps", content: "K8s vs Docker Swarm in 2025 — here's my honest take after 2 years...", likes: 214, tag: "Insight" },
  ];
  return (
    <div className="w-full space-y-3">
      {posts.map((p, i) => (
        <div
          key={i}
          className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
              {p.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-white">{p.name}</span>
                <span className="text-[10px] text-white/40">{p.role}</span>
                <span className="ml-auto text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">{p.tag}</span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">{p.content}</p>
              <div className="flex items-center gap-1 mt-2">
                <Zap className="w-3 h-3 text-amber-400" />
                <span className="text-[10px] text-white/40">{p.likes} reactions</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function NetworkVisual() {
  const people = [
    { name: "Yasmin A.", role: "AI Researcher", skills: ["Python", "LangChain"], level: 9, match: "98%" },
    { name: "Deo M.", role: "Full-Stack Dev", skills: ["React", "Go"], level: 7, match: "91%" },
    { name: "Lydia N.", role: "Cloud Architect", skills: ["AWS", "Terraform"], level: 8, match: "87%" },
  ];
  return (
    <div className="w-full space-y-3">
      {people.map((p, i) => (
        <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center text-white text-sm font-black shrink-0">
            {p.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">{p.name}</span>
              <ShieldCheck className="w-3 h-3 text-primary" />
            </div>
            <p className="text-[10px] text-white/50 mb-2">{p.role} · Level {p.level}</p>
            <div className="flex gap-1">
              {p.skills.map((s) => (
                <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/60 font-bold">{s}</span>
              ))}
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-xs font-black text-primary">{p.match}</div>
            <div className="text-[10px] text-white/30">match</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CompaniesVisual() {
  const companies = [
    { name: "TechFlow Inc.", industry: "FinTech", roles: 12, verified: true, badge: "Hiring" },
    { name: "CloudScale", industry: "Infrastructure", roles: 7, verified: true, badge: "Training" },
    { name: "NexusAI", industry: "Artificial Intelligence", roles: 19, verified: true, badge: "Certs" },
  ];
  return (
    <div className="w-full space-y-3">
      {companies.map((c, i) => (
        <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white text-sm font-black shrink-0">
            {c.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">{c.name}</span>
              {c.verified && <ShieldCheck className="w-3 h-3 text-blue-400" />}
            </div>
            <p className="text-[10px] text-white/50">{c.industry} · {c.roles} open roles</p>
          </div>
          <span className={`text-[10px] font-black px-3 py-1 rounded-full ${
            c.badge === "Hiring" ? "bg-emerald-500/20 text-emerald-400" :
            c.badge === "Training" ? "bg-blue-500/20 text-blue-400" :
            "bg-amber-500/20 text-amber-400"
          }`}>{c.badge}</span>
        </div>
      ))}
    </div>
  );
}

function OpportunitiesVisual() {
  const jobs = [
    { title: "Staff Backend Engineer", company: "SecureFlow", match: "99%", salary: "$180k", type: "Remote" },
    { title: "Senior UI Designer", company: "VEXALabs", match: "94%", salary: "$140k", type: "Hybrid" },
    { title: "Cloud Ops Intern", company: "CloudScale", match: "88%", salary: "$5k/m", type: "On-site" },
  ];
  return (
    <div className="w-full space-y-3">
      {jobs.map((j, i) => (
        <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-white">{j.title}</p>
              <p className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">{j.company}</p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-xs font-black text-primary">{j.match} match</div>
              <div className="text-[10px] text-white/40">{j.salary}</div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
              j.type === "Remote" ? "bg-emerald-500/20 text-emerald-400" :
              j.type === "Hybrid" ? "bg-blue-500/20 text-blue-400" :
              "bg-white/10 text-white/40"
            }`}>{j.type}</span>
            <div className="h-1.5 w-24 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                style={{ width: j.match }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

function OnboardingPage() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const navigate = useNavigate();

  const slide = slides[current];

  const go = useCallback(
    (index: number, dir: "next" | "prev") => {
      if (isAnimating || index < 0 || index >= slides.length) return;
      setDirection(dir);
      setIsAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setIsAnimating(false);
      }, 350);
    },
    [isAnimating]
  );

  const next = useCallback(() => go(current + 1, "next"), [current, go]);
  const prev = useCallback(() => go(current - 1, "prev"), [current, go]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") navigate({ to: "/" });
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, navigate]);

  // Autoplay
  useEffect(() => {
    if (!autoplay) return;
    const t = setInterval(() => {
      if (current < slides.length - 1) next();
      else setAutoplay(false);
    }, 4000);
    return () => clearInterval(t);
  }, [autoplay, current, next]);

  const isLast = current === slides.length - 1;
  const isFirst = current === 0;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden flex flex-col">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-sm font-black tracking-tight text-white/60 hover:text-white transition-colors">← VEXA</span>
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setAutoplay(!autoplay)}
            className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
              autoplay
                ? "bg-primary/20 border-primary/40 text-primary"
                : "border-white/10 text-white/40 hover:text-white hover:border-white/30"
            }`}
          >
            {autoplay ? "⏸ Pause" : "▶ Auto-play"}
          </button>
          <Link
            to="/"
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4 text-white/60" />
          </Link>
        </div>
      </div>

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-40 h-1 bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-500 transition-all duration-500 ease-out"
          style={{ width: `${((current + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 grid lg:grid-cols-2 min-h-screen">
        {/* Left — text content */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 pt-24 pb-12 relative">
          {/* Animated background glow */}
          <div
            className="absolute inset-0 opacity-20 transition-all duration-1000 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 30% 50%, ${slide.glowColor} 0%, transparent 70%)`,
            }}
          />

          <div
            key={`text-${current}`}
            className={`relative z-10 transition-all duration-350 ${
              isAnimating
                ? direction === "next"
                  ? "opacity-0 translate-x-8"
                  : "opacity-0 -translate-x-8"
                : "opacity-100 translate-x-0"
            }`}
            style={{ transitionDuration: "350ms" }}
          >
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border bg-gradient-to-r ${slide.color} text-white shadow-lg`}
            >
              <slide.icon className="w-3 h-3" />
              {slide.badge}
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-2">
              {slide.title}
            </h1>
            <h2 className={`text-5xl md:text-6xl font-black tracking-tighter leading-none mb-8 bg-gradient-to-r ${slide.color} bg-clip-text text-transparent`}>
              {slide.subtitle}
            </h2>

            {/* Description */}
            <p className="text-lg text-white/60 leading-relaxed mb-10 max-w-md">
              {slide.description}
            </p>

            {/* Features */}
            <div className="space-y-3 mb-12">
              {slide.features.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${slide.color} flex items-center justify-center shrink-0`}>
                    <f.icon className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-white/80">{f.label}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4">
              {isLast ? (
                <Link to="/auth">
                  <button
                    className={`inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r ${slide.color} shadow-lg hover:scale-105 active:scale-95 transition-transform`}
                  >
                    Join VEXA Now <Rocket className="w-4 h-4" />
                  </button>
                </Link>
              ) : (
                <button
                  onClick={next}
                  className={`inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r ${slide.color} shadow-lg hover:scale-105 active:scale-95 transition-transform`}
                >
                  {slide.cta} <ArrowRight className="w-4 h-4" />
                </button>
              )}
              {slide.href && (
                <Link
                  to={slide.href as string}
                  className="text-sm font-bold text-white/40 hover:text-white/80 transition-colors underline underline-offset-4"
                >
                  Explore Now
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Right — visual */}
        <div className="relative hidden lg:flex items-center justify-center px-12 overflow-hidden">
          {/* Background gradient */}
          <div
            className="absolute inset-0 opacity-30 transition-all duration-1000"
            style={{
              background: `radial-gradient(ellipse at 60% 50%, ${slide.glowColor} 0%, transparent 70%)`,
            }}
          />
          <div
            key={`visual-${current}`}
            className={`relative z-10 w-full max-w-md transition-all duration-350 ${
              isAnimating
                ? direction === "next"
                  ? "opacity-0 translate-y-8 scale-95"
                  : "opacity-0 -translate-y-8 scale-95"
                : "opacity-100 translate-y-0 scale-100"
            }`}
            style={{ transitionDuration: "350ms" }}
          >
            {current === 0 ? (
              <div className="h-80 flex items-center justify-center">
                <WelcomeVisual />
              </div>
            ) : (
              slide.visual
            )}
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 bg-gradient-to-t from-background via-background/80 to-transparent">
        {/* Prev button */}
        <button
          onClick={prev}
          disabled={isFirst}
          className="w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i > current ? "next" : "prev")}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 h-2 bg-white"
                  : "w-2 h-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* Next / Finish button */}
        <button
          onClick={isLast ? () => navigate({ to: "/auth" }) : next}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white bg-gradient-to-r ${slide.color} shadow-lg hover:scale-105 active:scale-95 transition-transform`}
        >
          {isLast ? (
            <>Get Started <Rocket className="w-4 h-4" /></>
          ) : (
            <>Next <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </div>
    </div>
  );
}
