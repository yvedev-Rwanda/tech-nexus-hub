import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { AppLayout } from "@/components/layout/AppLayout";
import { getPosts, createPost, type Post } from "@/lib/nexusApi";
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Plus,
  TrendingUp,
  Image as ImageIcon,
  Loader2,
  AlertCircle,
  Bookmark,
  GraduationCap,
  Layout,
  MessageSquare,
  Bell,
  Award,
  Video,
  FileText,
  BarChart2,
  Code,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export const Route = createFileRoute("/feed")({
  component: FeedPage,
});

const trendingTopics = [
  { topic: "The death of local dev environments?", count: "420 posts" },
  { topic: "Why Rust is winning the backend", count: "1.2k posts" },
  { topic: "Next.js 15 Server Components", count: "890 posts" },
  { topic: "AI-first career planning", count: "342 posts" },
];

const peopleYouFollow = [
  { name: "Jane Cooper", role: "UI/UX Designer", img: "https://i.pravatar.cc/150?u=jane" },
  { name: "Devansh S.", role: "Backend Engineer", img: "https://i.pravatar.cc/150?u=dev" },
  { name: "Ariene M.", role: "CTO @ TechFlow", img: "https://i.pravatar.cc/150?u=ariene" },
  { name: "Rohit Singh", role: "Product Manager", img: "https://i.pravatar.cc/150?u=rohit" },
  { name: "Ananya Patel", role: "Fullstack Dev", img: "https://i.pravatar.cc/150?u=ananya" },
  { name: "Karan Mehta", role: "DevOps Engineer", img: "https://i.pravatar.cc/150?u=karan" },
  { name: "Darlene R.", role: "Frontend Dev", img: "https://i.pravatar.cc/150?u=darlene" },
];

function PostCard({ post }: { post: Post }) {
  const { t } = useTranslation();

  return (
    <Card className="border-border/50 bg-card shadow-sm hover:shadow-md transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-3">
            <Avatar className="h-12 w-12 border border-border">
              <AvatarImage src={post.avatar_url || `https://i.pravatar.cc/150?u=${post.name}`} />
              <AvatarFallback>{post.name?.[0] ?? "U"}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-sm font-black leading-none flex items-center gap-1">
                {post.name}
                <span className="text-[10px] font-normal text-muted-foreground ml-1">@{post.name?.toLowerCase().replace(/\s/g, '')} • 2h</span>
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                {post.role || "Tech Enthusiast"}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-[15px] leading-relaxed mb-6 text-foreground/90 whitespace-pre-wrap">{post.content}</p>

        {post.content.length > 50 && (
          <div className="rounded-2xl border border-border overflow-hidden mb-6 bg-muted/20">
             <div className="p-4 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                   <div className="h-6 w-6 rounded bg-primary/10 flex items-center justify-center">
                      <Layout className="h-3 w-3 text-primary" />
                   </div>
                   <span className="text-xs font-bold uppercase tracking-tight">FinDash</span>
                   <Badge variant="outline" className="text-[9px] h-4">Overview</Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-2">
                   <div className="space-y-1">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">Total Balance</p>
                      <p className="text-sm font-black">$24,850.50</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">Transactions</p>
                      <p className="text-sm font-black">1,245</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">Total Revenue</p>
                      <p className="text-sm font-black">$8,540.20</p>
                   </div>
                </div>
             </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-border/40">
          <div className="flex items-center gap-1">
             <div className="flex -space-x-1">
                <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center border border-card"><Heart className="h-3 w-3 text-white fill-white" /></div>
                <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center border border-card"><Zap className="h-3 w-3 text-white fill-white" /></div>
             </div>
             <span className="text-xs font-bold text-muted-foreground ml-1">128</span>
          </div>
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors">
              <MessageCircle className="h-4 w-4" />
              32
            </button>
            <button className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors">
              <Share2 className="h-4 w-4" />
              24
            </button>
          </div>
          <button className="text-muted-foreground hover:text-primary">
             <Bookmark className="h-4 w-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

function FeedPage() {
  const { t } = useTranslation();
  const [postContent, setPostContent] = useState("");

  const { data: posts, isLoading, isError, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const handlePost = async () => {
    if (!postContent.trim()) return;
    try {
      await createPost({ user_id: "demo", content: postContent, tags: "" });
      setPostContent("");
      refetch();
    } catch {
      // silently fail
    }
  };

  return (
    <AppLayout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar (Col 1) */}
        <div className="lg:col-span-3 space-y-6 hidden xl:block sticky top-28">
           {/* Profile Card */}
           <Card className="border-border/50 shadow-sm overflow-hidden bg-card">
              <div className="h-20 bg-gradient-to-br from-primary/10 to-accent/5 relative" />
              <div className="px-6 pb-6 text-center -mt-12 relative">
                 <Avatar className="h-20 w-20 border-4 border-card mx-auto shadow-sm">
                    <AvatarImage src="https://i.pravatar.cc/150?u=arjun" alt="Arjun Verma" />
                    <AvatarFallback>AV</AvatarFallback>
                 </Avatar>
                 <h3 className="mt-4 text-lg font-black tracking-tight leading-none">Arjun Verma</h3>
                 <p className="text-xs text-muted-foreground mt-1 font-medium">Frontend Developer</p>
                 <p className="text-[10px] text-muted-foreground font-bold mt-0.5 uppercase tracking-wider">Bengaluru, India</p>
                 
                 <div className="grid grid-cols-3 gap-2 mt-6 border-y border-border/40 py-4">
                    <div className="text-center">
                       <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Connections</p>
                       <p className="text-sm font-black mt-1">523</p>
                    </div>
                    <div className="text-center border-x border-border/40">
                       <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Followers</p>
                       <p className="text-sm font-black mt-1">1.2K</p>
                    </div>
                    <div className="text-center">
                       <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Following</p>
                       <p className="text-sm font-black mt-1">430</p>
                    </div>
                 </div>

                 <Button variant="ghost" className="w-full mt-4 text-xs font-bold text-primary hover:bg-primary/5 rounded-xl uppercase tracking-widest">
                    View Profile
                 </Button>
              </div>
           </Card>

           {/* Quick Access Menu */}
           <div className="space-y-4">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 px-2">Quick Access</h4>
              <nav className="space-y-1">
                 {[
                   { icon: Layout, label: "Home", active: true },
                   { icon: Bookmark, label: "Saved" },
                   { icon: GraduationCap, label: "My Learning" },
                   { icon: BarChart2, label: "My Projects" },
                   { icon: MessageSquare, label: "Messages", count: 2 },
                   { icon: Bell, label: "Notifications", count: 5 },
                   { icon: Award, label: "My Certifications" },
                 ].map(item => (
                    <button key={item.label} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${item.active ? 'bg-primary/5 text-primary shadow-[inset_0_0_0_1px_rgba(var(--primary),0.1)]' : 'hover:bg-muted text-foreground/70'}`}>
                       <div className="flex items-center gap-3">
                          <item.icon className="h-4 w-4" />
                          <span className="text-sm font-bold">{item.label}</span>
                       </div>
                       {item.count && (
                          <span className="h-5 w-5 rounded-full bg-primary text-[10px] font-bold text-white flex items-center justify-center">{item.count}</span>
                       )}
                    </button>
                 ))}
              </nav>
           </div>

           {/* Premium Tooltip/Card */}
           <Card className="bg-primary text-white p-6 border-none rounded-[2rem] relative overflow-hidden shadow-glow">
              <div className="absolute -right-4 -top-4 h-24 w-24 bg-white/10 rounded-full blur-2xl" />
              <div className="relative z-10">
                 <div className="flex items-center gap-2 mb-4">
                    <Zap className="h-4 w-4 fill-white" />
                    <span className="text-xs font-black uppercase tracking-widest">Go Premium</span>
                 </div>
                 <p className="text-xs font-bold mb-4 leading-relaxed opacity-90">Unlock advanced learning paths, premium content and more.</p>
                 <Button className="w-full bg-white text-primary hover:bg-white/90 font-black rounded-xl text-xs uppercase shadow-sm">
                    Upgrade Now
                 </Button>
              </div>
           </Card>
        </div>

        {/* Center Feed (Col 2) */}
        <div className="lg:col-span-12 xl:col-span-6 space-y-6">
          {/* Post Creator Box */}
          <Card className="border-border/50 shadow-sm overflow-hidden bg-card">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Avatar className="h-10 w-10 border border-border">
                  <AvatarImage src="https://i.pravatar.cc/150?u=arjun" alt="Arjun Verma" />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <textarea
                    placeholder={`What's on your mind, Arjun?`}
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    className="w-full bg-muted/30 border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary/10 text-sm font-medium resize-none min-h-[100px]"
                  />
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex gap-2">
                       <Button variant="ghost" size="sm" className="h-9 gap-2 text-muted-foreground font-bold hover:bg-muted/50 rounded-xl px-3">
                          <ImageIcon className="h-4 w-4 text-blue-500" />
                          <span className="text-xs font-bold">Image</span>
                       </Button>
                       <Button variant="ghost" size="sm" className="h-9 gap-2 text-muted-foreground font-bold hover:bg-muted/50 rounded-xl px-3">
                          <Video className="h-4 w-4 text-red-400" />
                          <span className="text-xs font-bold">Video</span>
                       </Button>
                       <Button variant="ghost" size="sm" className="h-9 gap-2 text-muted-foreground font-bold hover:bg-muted/50 rounded-xl px-3 hidden sm:flex">
                          <FileText className="h-4 w-4 text-amber-500" />
                          <span className="text-xs font-bold">Article</span>
                       </Button>
                       <Button variant="ghost" size="sm" className="h-9 gap-2 text-muted-foreground font-bold hover:bg-muted/50 rounded-xl px-3 hidden lg:flex">
                          <BarChart2 className="h-4 w-4 text-emerald-500" />
                          <span className="text-xs font-bold">Poll</span>
                       </Button>
                       <Button variant="ghost" size="sm" className="h-9 gap-2 text-muted-foreground font-bold hover:bg-muted/50 rounded-xl px-3 hidden sm:flex">
                          <Code className="h-4 w-4 text-primary" />
                          <span className="text-xs font-bold">Code</span>
                       </Button>
                    </div>
                    <Button
                      size="sm"
                      className="bg-primary text-primary-foreground font-bold rounded-xl px-6"
                      onClick={handlePost}
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stories Horizontal Section */}
          <div className="space-y-4">
             <div className="flex items-center justify-between px-2">
                <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">People you follow</h4>
                <Button variant="link" size="sm" className="text-xs font-bold uppercase tracking-widest text-primary h-auto p-0">View all</Button>
             </div>
             <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-2">
                {/* Your story first */}
                <div className="flex flex-col items-center gap-2 shrink-0 group cursor-pointer">
                   <div className="relative">
                      <Avatar className="h-14 w-14 ring-2 ring-background border-2 border-primary/20">
                         <AvatarImage src="https://i.pravatar.cc/150?u=arjun" alt="Arjun Verma" />
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-primary text-white rounded-full flex items-center justify-center border-2 border-background">
                         <Plus className="h-3 w-3 stroke-[3]" />
                      </div>
                   </div>
                   <span className="text-[10px] font-bold text-muted-foreground group-hover:text-foreground transition-colors uppercase tracking-tight">Your story</span>
                </div>

                {peopleYouFollow.map(person => (
                   <div key={person.name} className="flex flex-col items-center gap-2 shrink-0 group cursor-pointer">
                      <Avatar className="h-14 w-14 ring-2 ring-primary ring-offset-2 border-2 border-background transition-transform group-hover:scale-105">
                         <AvatarImage src={person.img} alt={person.name} />
                         <AvatarFallback>{person.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-[10px] font-bold text-muted-foreground group-hover:text-foreground transition-colors uppercase tracking-tight">{person.name}</span>
                   </div>
                ))}
             </div>
          </div>

          {/* Posts List */}
          <div className="space-y-6">
            {posts?.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
            
            {/* Template Card for VEXA Mockup accuracy */}
            <PostCard 
              post={{
                id: "mock-1",
                name: "Jane Cooper",
                role: "UI/UX Designer at Figma",
                content: "Just finished redesigning the dashboard for a fintech startup. Focus was on clarity, simplicity and better data visualization. Would love your feedback! ✨",
                likes_count: 128,
                comments_count: 32,
                avatar_url: "https://i.pravatar.cc/150?u=jane",
                created_at: new Date().toISOString(),
                user_id: "jane",
                tags: "ux,ui,dashboard"
              }} 
            />

            {isLoading && (
              <div className="flex justify-center py-16 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            )}
            
            {posts?.length === 0 && !isLoading && (
              <p className="text-center text-muted-foreground py-12">{t("common.noData")}</p>
            )}
          </div>
        </div>

        {/* Right Sidebar (Col 3) */}
        <div className="lg:col-span-12 xl:col-span-3 space-y-6 lg:sticky lg:top-28">
          {/* Continue Learning Widget */}
          <Card className="border-border/50 shadow-sm bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-sm font-black tracking-tight uppercase">Continue Learning</h4>
                <Button variant="link" size="sm" className="text-xs font-bold uppercase tracking-widest text-primary h-auto p-0">View all</Button>
              </div>
              <div className="space-y-6">
                {[
                  { title: "JavaScript Fundamentals", progress: 65, icon: "JS", color: "bg-amber-100 text-amber-600" },
                  { title: "React - The Complete Guide", progress: 42, icon: "React", color: "bg-blue-100 text-blue-600" },
                  { title: "Node.js & Express.js", progress: 28, icon: "Node", color: "bg-emerald-100 text-emerald-600" },
                ].map((course) => (
                  <div key={course.title} className="space-y-4">
                     <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 flex items-center justify-center rounded-lg font-black text-[10px] ${course.color}`}>
                           {course.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                           <p className="text-xs font-black truncate">{course.title}</p>
                        </div>
                        <span className="text-[10px] font-black text-muted-foreground">{course.progress}% complete</span>
                     </div>
                     <Progress value={course.progress} className="h-1.5" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Featured Opportunity Widget */}
          <Card className="border-border/50 shadow-sm bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-sm font-black tracking-tight uppercase">Featured Opportunity</h4>
                <Button variant="link" size="sm" className="text-xs font-bold uppercase tracking-widest text-primary h-auto p-0">View all</Button>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4">
                   <div className="h-12 w-12 rounded-xl border border-border flex items-center justify-center overflow-hidden shrink-0">
                      <img src="/src/assets/logo.png" alt="Microsoft" className="h-6 w-6" />
                   </div>
                   <div className="flex-1 min-w-0">
                      <p className="text-xs font-black truncate leading-none">Software Engineer Intern</p>
                      <p className="text-[10px] text-muted-foreground font-bold mt-1">Microsoft</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <Badge variant="outline" className="text-[8px] h-4 bg-primary/5 text-primary border-primary/20 font-bold uppercase tracking-tight">Internship</Badge>
                        <Badge variant="outline" className="text-[8px] h-4 font-bold uppercase tracking-tight">Remote</Badge>
                      </div>
                      <p className="text-[9px] text-muted-foreground font-bold mt-3 uppercase tracking-widest leading-none">Posted 2h ago</p>
                   </div>
                   <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                      <Bookmark className="h-4 w-4" />
                   </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trending Discussions Widget */}
          <Card className="border-border/50 shadow-sm bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-sm font-black tracking-tight uppercase">Trending Discussions</h4>
                <Button variant="link" size="sm" className="text-xs font-bold uppercase tracking-widest text-primary h-auto p-0">View all</Button>
              </div>
              <div className="space-y-4">
                {[
                  { topic: "What tech stack are you using in 2024?", count: "86", author: "Arlene McCoy" },
                  { topic: "AI tools that improved your productivity?", count: "64", author: "Brooklyn Simmons" },
                  { topic: "Best resources to learn System Design?", count: "52", author: "Darlene Robertson" },
                ].map((item) => (
                  <div key={item.topic} className="group cursor-pointer">
                    <div className="flex items-start justify-between gap-4">
                       <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                             <AvatarImage src={`https://i.pravatar.cc/150?u=${item.author}`} />
                          </Avatar>
                          <div className="flex-1 min-w-0">
                             <p className="text-[11px] font-bold group-hover:text-primary transition-colors leading-tight">{item.topic}</p>
                             <p className="text-[9px] text-muted-foreground mt-0.5">by {item.author}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-1 text-muted-foreground/60">
                          <BarChart2 className="h-3 w-3" />
                          <span className="text-[10px] font-bold">{item.count}</span>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Suggested Connections Widget */}
          <Card className="border-border/50 shadow-sm bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-sm font-black tracking-tight uppercase">Suggested Connections</h4>
                <Button variant="link" size="sm" className="text-xs font-bold uppercase tracking-widest text-primary h-auto p-0">View all</Button>
              </div>
              <div className="space-y-6">
                {[
                  { name: "Rohit Singh", role: "Backend Developer at Amazon", img: "https://i.pravatar.cc/150?u=rohit" },
                  { name: "Ananya Patel", role: "UI/UX Designer at CRED", img: "https://i.pravatar.cc/150?u=ananya" },
                  { name: "Karan Mehta", role: "Full Stack Developer at Razorpay", img: "https://i.pravatar.cc/150?u=karan" },
                ].map((person) => (
                  <div key={person.name} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                       <Avatar className="h-8 w-8">
                          <AvatarImage src={person.img} />
                       </Avatar>
                       <div className="min-w-0">
                          <p className="text-[11px] font-black leading-none truncate">{person.name}</p>
                          <p className="text-[9px] text-muted-foreground mt-1 truncate">{person.role}</p>
                       </div>
                    </div>
                    <Button size="sm" variant="outline" className="h-7 px-3 rounded-lg text-[9px] font-bold border-primary/20 text-primary hover:bg-primary/5 uppercase">Connect</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </AppLayout>
  );
}
