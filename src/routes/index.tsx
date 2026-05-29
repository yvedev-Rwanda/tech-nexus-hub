import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import heroImage from "@/assets/hero-network.jpg";
import logo from "@/assets/logo.png";
import {
  Rss,
  GraduationCap,
  Users,
  Building2,
  Briefcase,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Zap,
  Globe,
  ShieldCheck,
  Trophy,
  PlayCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VEXA — The Unified Tech Ecosystem" },
      {
        name: "description",
        content:
          "Learn, connect, build, showcase, and get opportunities — all in one platform built for the tech community with VEXA.",
      },
      { property: "og:title", content: "VEXA — The Unified Tech Ecosystem" },
      {
        property: "og:description",
        content:
          "One ecosystem for tech learning, networking, companies, and career opportunities.",
      },
    ],
  }),
  component: Landing,
});

const modules = [
  {
    icon: Rss,
    title: "Home Feed",
    tag: "Interaction Layer",
    href: "/feed",
    desc: "A real-time stream of tech insights, project showcases, trending debates, and ecosystem activity. Every post is signal — no noise, no influencer fluff.",
  },
  {
    icon: GraduationCap,
    title: "Learning Paths",
    tag: "Content Module",
    href: "/learning",
    desc: "Roadmaps curated by senior engineers across Frontend, Backend, AI/ML, and more. Combines the best of YouTube and original lessons into one tracked journey.",
  },
  {
    icon: Users,
    title: "Tech Network",
    tag: "Professional Space",
    href: "/network",
    desc: "Profiles built from verified activity. Discover mentors, co-founders, and collaborators by skill proof, not by job title self-claims.",
  },
  {
    icon: Building2,
    title: "Company Hub",
    tag: "Ecosystem Bridge",
    href: "/companies",
    desc: "Verified pages for tech companies. Post training programs, issue accredited certifications, and recruit directly from a pre-skilled talent pipeline.",
  },
  {
    icon: Briefcase,
    title: "Opportunities",
    tag: "Career Module",
    href: "/opportunities",
    desc: "Jobs, internships, freelance gigs, and hackathons — surfaced based on your verified skills and learning progress. Get matched, not spammed.",
  },
];

const lifecycle = ["Learn", "Build", "Connect", "Showcase", "Get Opportunities"];

function Landing() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth">
      {/* Nav */}
      <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-xl transition-[var(--transition-smooth)]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black border border-primary/20 shadow-[var(--shadow-glow)] overflow-hidden">
              <img src={logo} alt="VEXA" className="h-full w-full object-cover" />
            </div>
            <span className="text-lg font-bold tracking-tight">VEXA</span>
          </div>
          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a href="#modules" className="transition-colors hover:text-foreground">{t("nav.home")}</a>
            <Link to="/feed" className="transition-colors hover:text-foreground">{t("nav.feed")}</Link>
            <Link to="/learning" className="transition-colors hover:text-foreground">{t("nav.learning")}</Link>
            <Link to="/opportunities" className="transition-colors hover:text-foreground">{t("nav.opportunities")}</Link>
          </nav>
          <div className="flex items-center gap-4">
             <LanguageSwitcher />
             <Link to="/feed" className="hidden sm:block text-sm font-medium hover:text-primary transition-colors ml-2">Sign In</Link>
             <Link 
               to="/feed" 
               className="rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-[var(--shadow-glow)] transition-[var(--transition-smooth)] hover:scale-105 active:scale-95"
             >
               {t("landing.getStarted")}
             </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden pt-44 pb-32" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 z-0 h-full w-full opacity-30 mix-blend-screen pointer-events-none">
          <img
            src={heroImage}
            alt=""
            className="h-full w-full object-cover animate-float"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
        
        <div className="relative z-10 mx-auto max-w-[1200px] px-8 text-center animate-reveal">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary backdrop-blur-md">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            {t("landing.badge")}
          </div>
          <h1 className="text-balance text-4xl font-black leading-[1.1] tracking-tighter md:text-6xl lg:text-7xl">
            <span className="bg-[image:var(--gradient-text)] bg-clip-text text-transparent">
              {t("landing.heroTitle1")}
            </span>
            <br />
            <span className="text-foreground">{t("landing.heroTitle2")}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-muted-foreground leading-relaxed opacity-70">
            {t("landing.heroSubtitle")}
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link 
              to="/feed" 
              className="group inline-flex items-center gap-2 rounded-2xl bg-[image:var(--gradient-primary)] px-8 py-4 text-base font-bold text-primary-foreground shadow-[var(--shadow-glow)] transition-[var(--transition-smooth)] hover:scale-105"
            >
              {t("landing.getStarted")}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#modules"
              className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card/40 px-8 py-4 text-base font-bold text-foreground backdrop-blur-xl transition-all hover:bg-card hover:border-primary/40"
            >
              {t("landing.exploreModules")}
            </a>
          </div>

          <div className="mt-20 flex flex-wrap items-center justify-center gap-6 opacity-60">
             <div className="flex items-center gap-2 uppercase tracking-widest font-black text-[10px]">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                No Subscription Required
             </div>
             <div className="flex items-center gap-2 uppercase tracking-widest font-black text-[10px]">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Verified Skill Proof
             </div>
             <div className="flex items-center gap-2 uppercase tracking-widest font-black text-[10px]">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Global Developer Network
             </div>
          </div>
        </div>
      </section>

      {/* The Fragmentation Problem */}
      <section className="px-6 py-32 border-t border-border/40">
        <div className="mx-auto max-w-7xl">
           <div className="grid gap-16 lg:grid-cols-2 items-center">
              <div>
                <Badge variant="outline" className="mb-6 border-destructive/40 bg-destructive/10 text-destructive text-[10px] font-black uppercase tracking-widest">
                  The Problem
                </Badge>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-none">
                  Tech growth is <span className="text-destructive">broken</span> and fragmented.
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Currently, your tech journey is scattered across disjointed platforms. You learn on one, network on another, and apply for jobs on a third. There's no continuity, no shared progress, and talent remains invisible.
                </p>
                <div className="space-y-4">
                   {[
                     "Learning is unstructured and disconnected from outcomes.",
                     "Networking lacks actual proof of capability.",
                     "Opportunities are missed due to scattered job boards.",
                     "Recruiters operate in silos without talent visibility."
                   ].map(text => (
                     <div key={text} className="flex gap-4 p-4 rounded-xl border border-border/40 bg-card/10 backdrop-blur">
                        <div className="h-6 w-6 rounded-full bg-destructive/20 flex items-center justify-center shrink-0">
                           <div className="h-2 w-2 rounded-full bg-destructive" />
                        </div>
                        <span className="text-sm font-medium">{text}</span>
                     </div>
                   ))}
                </div>
              </div>
              <div className="relative group">
                 <div className="absolute inset-0 bg-primary/10 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
                 <div className="relative p-1 rounded-[2.5rem] bg-gradient-to-br from-border/40 to-transparent">
                    <div className="rounded-[2.4rem] overflow-hidden border border-border/40 bg-card/30 backdrop-blur-2xl p-8 aspect-square flex flex-col justify-center">
                       <h3 className="text-3xl font-black mb-4 text-center">The VEXA Loop</h3>
                       <div className="relative flex justify-center py-10">
                          {/* Visual loop representation */}
                          <div className="w-64 h-64 border-4 border-dashed border-primary/20 rounded-full animate-spin [animation-duration:10s]" />
                          <div className="absolute inset-0 flex items-center justify-center">
                             <Sparkles className="h-16 w-16 text-primary animate-reveal" />
                          </div>
                       </div>
                       <p className="text-center text-sm font-medium text-muted-foreground">
                          {"Learn -> Build -> Connect -> Showcase -> Get Opportunities"}
                       </p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Deep Dive Modules */}
      <section id="modules" className="bg-card/20 py-32 border-y border-border/40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-24 max-w-3xl mx-auto">
             <Badge variant="outline" className="mb-6 border-accent/40 bg-accent/10 text-accent text-[10px] font-black uppercase tracking-widest">
                Five Modules. One Platform.
             </Badge>
             <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-none">
                Deeply integrated. <br /> Built for builders.
             </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
             {modules.map((m, i) => (
                <Link 
                  key={m.title} 
                  to={m.href}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/40 bg-card/30 p-8 backdrop-blur-xl transition-all hover:border-primary/40 hover:-translate-y-2 hover:shadow-[var(--shadow-card)]"
                >
                   <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                   <div>
                     <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[image:var(--gradient-primary)] shadow-[var(--shadow-glow)] text-primary-foreground">
                        <m.icon className="h-7 w-7" />
                     </div>
                     <p className="mb-2 text-[10px] font-black uppercase tracking-tighter text-accent">0{i+1} · {m.tag}</p>
                     <h3 className="text-2xl font-black mb-4 tracking-tighter">{m.title}</h3>
                     <p className="text-muted-foreground text-sm leading-relaxed mb-8">{m.desc}</p>
                   </div>
                   <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary group-hover:translate-x-1 transition-transform">
                      Explore Module <ArrowRight className="h-4 w-4" />
                   </div>
                </Link>
             ))}
             
             {/* CTA CARD */}
             <div className="relative flex flex-col justify-center items-center text-center overflow-hidden rounded-3xl p-8 bg-[image:var(--gradient-primary)] shadow-[var(--shadow-glow)]">
                <Zap className="h-10 w-10 text-primary-foreground mb-4 animate-float" />
                <h3 className="text-2xl font-black text-primary-foreground mb-4">Join the Ecosystem</h3>
                <p className="text-primary-foreground/80 text-sm mb-6">
                   Be part of the next generation of tech talent development. 
                </p>
                <Link to="/feed" className="bg-background text-foreground px-6 py-3 rounded-xl font-bold transition-transform hover:scale-105">
                   Get Early Access
                </Link>
             </div>
          </div>
        </div>
      </section>

      {/* Feature Sections */}
      <section className="px-6 py-32">
         <div className="mx-auto max-w-7xl">
            {/* Feature 1: Learning */}
            <div className="grid lg:grid-cols-2 gap-20 items-center mb-40">
               <div className="order-2 lg:order-1 relative">
                  <div className="glass-dark rounded-[2rem] p-8 space-y-4">
                     <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-sm">Learning Progression</h4>
                        <Badge className="bg-primary/20 text-primary border-none">High Signal</Badge>
                     </div>
                     {[
                       { t: "React 19 Hooks", v: 85, icon: Globe },
                       { t: "K8s Microservices", v: 42, icon: ShieldCheck },
                       { t: "Vector Databases", v: 15, icon: Zap },
                     ].map(item => (
                       <div key={item.t} className="space-y-2">
                          <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                             <span className="flex items-center gap-2"><item.icon className="h-3 w-3" /> {item.t}</span>
                             <span>{item.v}%</span>
                          </div>
                          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                             <div className="h-full bg-primary" style={{ width: `${item.v}%` }} />
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
               <div className="order-1 lg:order-2">
                  <Badge className="mb-6 bg-blue-500/10 text-blue-400 border-none font-black text-[10px] tracking-widest uppercase">Content Module</Badge>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-none">
                     Structured learning that <br /> <span className="bg-[image:var(--gradient-text)] bg-clip-text text-transparent">builds your profile.</span>
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                     Learning directly leads to visibility, which leads to opportunity. Move through roadmaps curated by senior engineers. Every course you finish directly updates your verified skill proof, making you visible to partners immediately.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="flex flex-col gap-1 p-4 rounded-2xl bg-card/20 border border-border/40">
                        <PlayCircle className="h-6 w-6 text-primary mb-2" />
                        <h5 className="font-bold text-sm">Video Paths</h5>
                        <p className="text-xs text-muted-foreground">Curated high-quality video content.</p>
                     </div>
                     <div className="flex flex-col gap-1 p-4 rounded-2xl bg-card/20 border border-border/40">
                        <Trophy className="h-6 w-6 text-accent mb-2" />
                        <h5 className="font-bold text-sm">Proof of Skill</h5>
                        <p className="text-xs text-muted-foreground">Blockchain-verified skill completion.</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Feature 2: Opportunities */}
            <div className="grid lg:grid-cols-2 gap-20 items-center">
               <div>
                  <Badge className="mb-6 bg-emerald-500/10 text-emerald-400 border-none font-black text-[10px] tracking-widest uppercase">Career Module</Badge>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-none">
                     Opportunities that <br /> <span className="bg-[image:var(--gradient-text)] bg-clip-text text-transparent">come to you.</span>
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                     Stop scrolling endless job boards. Our system matches your verified activities, projects, and learning with real-world requirements from top tech companies.
                  </p>
                  <ul className="space-y-4 mb-8">
                     {[
                       "Personalized job & internship matches.",
                       "Direct recruiter outreach based on skill metrics.",
                       "Freelance gigs and community-driven projects.",
                       "Exclusive hackathons and scholarships."
                     ].map(item => (
                       <li key={item} className="flex items-center gap-3 text-sm font-semibold">
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                          {item}
                       </li>
                     ))}
                  </ul>
                  <Button className="h-12 px-8 bg-foreground text-background font-bold rounded-xl hover:opacity-90">View Open Roles</Button>
               </div>
               <div className="relative group">
                  <div className="glass-dark rounded-[2rem] p-8 space-y-6">
                     {[
                        { title: "Staff Backend Engineer", company: "SecureFlow", match: "99%", salary: "$180k" },
                        { title: "Senior UI Designer", company: "VEXALabs", match: "94%", salary: "$140k" },
                        { title: "Cloud Ops Intern", company: "CloudScale", match: "88%", salary: "$5k/m" },
                     ].map(job => (
                        <div key={job.title} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                           <div>
                              <p className="font-bold text-xs">{job.title}</p>
                              <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{job.company}</p>
                           </div>
                           <div className="text-right">
                              <Badge className="bg-primary/20 text-primary border-none text-[10px] font-black">{job.match}</Badge>
                              <p className="text-[9px] font-bold mt-1 uppercase opacity-50">{job.salary}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden border-t border-border/40 py-40">
         <div className="absolute inset-0 z-0 opacity-40 bg-[image:var(--gradient-hero)]" />
         <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none">
                The future of tech <br /> is <span className="bg-[image:var(--gradient-text)] bg-clip-text text-transparent">connected.</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
               This platform creates a closed-loop ecosystem for tech growth. It removes fragmentation and replaces it with a single structured system that connects education, community, companies, and employment.
            </p>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link to="/auth">
              <Button size="lg" className="h-12 rounded-xl px-8 font-bold shadow-[var(--shadow-glow)]">
                Join Now
              </Button>
            </Link>
            <a href="#world">
              <Button size="lg" variant="outline" className="h-12 rounded-xl px-8 border-border/40 bg-background/50 backdrop-blur-md">
                View Ecosystem
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Global Stats */}
      <section className="border-y border-border/40 bg-card/10 py-16 backdrop-blur-sm">
        <div className="mx-auto max-w-[1400px] px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { label: "Talent Worldwide", value: "25k+" },
              { label: "Countries Active", value: "62" },
              { label: "Learning Paths", value: "140+" },
              { label: "Tech Companies", value: "850+" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl font-black text-primary md:text-4xl">{stat.value}</div>
                <div className="mt-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* World Map Section */}
      <section id="world" className="relative overflow-hidden py-32">
        <div className="mx-auto max-w-[1200px] px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <Badge variant="outline" className="mb-4 border-primary/20 text-primary">Global Connectivity</Badge>
              <h2 className="mb-6 text-4xl font-black md:text-5xl">VEXA: A World Without Borders</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our ecosystem connects local talent from Rwanda to global tech hubs—Silicon Valley, Berlin, Singapore, and Bangalore. We are building the future where geographic barriers don't limit professional potential.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  "Verified Skills standard across 50+ languages",
                  "Global job matching with real-time currency conversion",
                  "Cross-border mentorship and project collaboration"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-3xl border border-border/40 bg-card shadow-elegant">
              <img src="/src/assets/global-map.png" alt="Global Connectivity Map" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/20 py-20">
         <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-20">
               <div className="col-span-2 lg:col-span-2">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black border border-primary/20">
                      <span className="text-xs font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">V</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight">VEXA</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                     The unified infrastructure for tech talent development and opportunity distribution.
                  </p>
               </div>
               
               <div>
                  <h5 className="font-bold text-xs uppercase tracking-widest mb-6">Ecosystem</h5>
                  <ul className="space-y-4 text-sm text-muted-foreground">
                     <li><Link to="/feed">Interaction Feed</Link></li>
                     <li><Link to="/learning">Learning Lab</Link></li>
                     <li><Link to="/network">Network</Link></li>
                     <li><Link to="/opportunities">Opportunities</Link></li>
                  </ul>
               </div>

               <div>
                  <h5 className="font-bold text-xs uppercase tracking-widest mb-6">Partners</h5>
                  <ul className="space-y-4 text-sm text-muted-foreground">
                     <li><Link to="/companies">Company Hub</Link></li>
                     <li><Link to="/companies">Training Partners</Link></li>
                     <li><Link to="/companies">Certifications</Link></li>
                     <li><Link to="/companies">Recruitment</Link></li>
                  </ul>
               </div>

               <div className="col-span-2">
                  <h5 className="font-bold text-xs uppercase tracking-widest mb-6">Newsletter</h5>
                  <p className="text-sm text-muted-foreground mb-4">Stay updated with the latest in the tech ecosystem.</p>
                  <div className="flex gap-2">
                     <input type="email" placeholder="Email address" className="flex-1 h-11 px-4 rounded-xl bg-card border border-border/40 text-sm focus:outline-none" />
                     <Button className="h-11 bg-primary text-primary-foreground font-bold">Join</Button>
                  </div>
               </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-border/20 gap-6">
               <div className="text-xs text-muted-foreground">
                  © {new Date().getFullYear()} VEXA Ecosystem. All rights reserved.
               </div>
               <div className="flex gap-6 text-xs font-bold uppercase tracking-widest opacity-60">
                  <a href="#">Privacy</a>
                  <a href="#">Terms</a>
                  <a href="#">Cookies</a>
                  <a href="#">Contact</a>
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
