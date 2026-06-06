import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { TopNavLayout } from "@/components/layout/TopNavLayout";
import { getPosts, createPost, type Post } from "@/lib/nexusApi";
import { useAuth } from "@/hooks/useAuth";
import {
  Heart, MessageCircle, Share2, MoreHorizontal, Bookmark,
  Image as ImageIcon, Video, FileText, BarChart3, Code2,
  Home, Bookmark as BookmarkIcon, GraduationCap, FolderKanban, MessageSquare, Bell, Award, Crown,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/feed")({ component: FeedPage });

// ---------- Mock data for the sidebars ----------
const peopleYouFollow = [
  { name: "Your story", initials: "YS", isStory: true },
  { name: "Jane Cooper", initials: "JC" },
  { name: "Devansh S.", initials: "DS" },
  { name: "Arlene M.", initials: "AM" },
  { name: "Rohit Singh", initials: "RS" },
  { name: "Ananya Patel", initials: "AP" },
  { name: "Karan Mehta", initials: "KM" },
  { name: "Darlene R.", initials: "DR" },
];

const learning = [
  { title: "JavaScript Fundamentals", progress: 65, color: "bg-yellow-400", letters: "JS" },
  { title: "React - The Complete Guide", progress: 42, color: "bg-cyan-400", letters: "RE" },
  { title: "Node.js & Express.js", progress: 28, color: "bg-green-500", letters: "ND" },
];

const discussions = [
  { q: "What tech stack are you using in 2026?", by: "Arlene McCoy", replies: 86 },
  { q: "AI tools that improved your productivity?", by: "Brooklyn Simmons", replies: 64 },
  { q: "Best resources to learn System Design?", by: "Darlene Robertson", replies: 52 },
];

const suggestedConnections = [
  { name: "Rohit Singh", role: "Backend Developer at Amazon", initials: "RS" },
  { name: "Ananya Patel", role: "UI/UX Designer at CRED", initials: "AP" },
  { name: "Karan Mehta", role: "Full Stack Developer at Razorpay", initials: "KM" },
];

const quickAccess = [
  { icon: Home, label: "Home", active: true },
  { icon: BookmarkIcon, label: "Saved" },
  { icon: GraduationCap, label: "My Learning" },
  { icon: FolderKanban, label: "My Projects" },
  { icon: MessageSquare, label: "Messages", badge: 2 },
  { icon: Bell, label: "Notifications", badge: 5 },
  { icon: Award, label: "My Certifications" },
];

// ---------- Components ----------
function ProfileCard() {
  const { profile, user } = useAuth();
  const name = profile?.firstName ? `${profile.firstName} ${profile.lastName ?? ""}`.trim() : user?.email ?? "VEXA Member";
  return (
    <Card>
      <CardContent className="p-5 text-center">
        <Avatar className="h-20 w-20 mx-auto mb-3">
          <AvatarImage src={profile?.avatar_url ?? undefined} />
          <AvatarFallback className="text-lg">{name[0]}</AvatarFallback>
        </Avatar>
        <h3 className="font-bold text-base">{name}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{profile?.role || "Frontend Developer"}</p>
        <p className="text-xs text-muted-foreground">Bengaluru, India</p>

        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-border">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase">Connections</p>
            <p className="text-sm font-bold">523</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase">Followers</p>
            <p className="text-sm font-bold">1.2K</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase">Following</p>
            <p className="text-sm font-bold">430</p>
          </div>
        </div>

        <Button variant="secondary" className="w-full mt-4 text-sm">View Profile</Button>
      </CardContent>
    </Card>
  );
}

function QuickAccess() {
  return (
    <Card>
      <CardContent className="p-3">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase px-3 py-2">Quick Access</h4>
        <nav className="space-y-0.5">
          {quickAccess.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                item.active ? "bg-primary/10 text-primary font-medium" : "text-foreground hover:bg-muted"
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="text-[10px] font-bold bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
}

function PremiumCard() {
  return (
    <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <Crown className="h-4 w-4 text-yellow-400" />
          <h4 className="font-bold text-sm">Go Premium</h4>
        </div>
        <p className="text-xs text-slate-300 mb-4">Unlock advanced learning paths, premium content and more.</p>
        <Button size="sm" className="w-full bg-primary hover:bg-primary/90">Upgrade Now</Button>
      </CardContent>
    </Card>
  );
}

function PostComposer({ onPost }: { onPost: (content: string) => void }) {
  const [content, setContent] = useState("");
  const { profile } = useAuth();
  const name = profile?.firstName ?? "there";

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-3 items-center">
          <Avatar className="h-10 w-10">
            <AvatarImage src={profile?.avatar_url ?? undefined} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`What's on your mind, ${name}?`}
            className="flex-1 h-11 px-4 rounded-full bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            onKeyDown={(e) => {
              if (e.key === "Enter" && content.trim()) {
                onPost(content);
                setContent("");
              }
            }}
          />
        </div>
        <div className="flex items-center justify-around mt-4 pt-3 border-t border-border">
          {[
            { icon: ImageIcon, label: "Image", color: "text-green-500" },
            { icon: Video, label: "Video", color: "text-red-500" },
            { icon: FileText, label: "Article", color: "text-blue-500" },
            { icon: BarChart3, label: "Poll", color: "text-purple-500" },
            { icon: Code2, label: "Code", color: "text-amber-500" },
          ].map((b) => (
            <button key={b.label} className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-muted text-sm font-medium text-muted-foreground transition-colors">
              <b.icon className={`h-4 w-4 ${b.color}`} />
              {b.label}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function PeopleYouFollow() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-sm">People you follow</h4>
          <button className="text-xs text-primary font-medium">View all</button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {peopleYouFollow.map((p) => (
            <div key={p.name} className="flex flex-col items-center gap-1.5 shrink-0 w-16">
              <div className="relative">
                <Avatar className="h-14 w-14 ring-2 ring-primary/30 ring-offset-2 ring-offset-background">
                  <AvatarFallback>{p.initials}</AvatarFallback>
                </Avatar>
                {p.isStory && (
                  <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center border-2 border-background">
                    <Plus className="h-3 w-3" />
                  </div>
                )}
              </div>
              <span className="text-[11px] text-center truncate w-full">{p.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function PostCard({ post }: { post: Post }) {
  const tags = post.tags ? post.tags.split(",").filter(Boolean) : [];
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex gap-3">
            <Avatar className="h-11 w-11">
              <AvatarImage src={post.avatar_url} />
              <AvatarFallback>{post.name?.[0] ?? "U"}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-sm font-bold">{post.name}</h4>
              <p className="text-xs text-muted-foreground">{post.role}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-sm leading-relaxed mb-3 whitespace-pre-wrap">{post.content}</p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[10px]">#{tag.trim()}</Badge>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-5">
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary">
              <Heart className="h-4 w-4" /> {post.likes_count ?? 0}
            </button>
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary">
              <MessageCircle className="h-4 w-4" /> {post.comments_count ?? 0}
            </button>
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary">
              <Share2 className="h-4 w-4" /> Share
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

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-sm">{title}</h4>
          <button className="text-xs text-primary font-medium">View all</button>
        </div>
        {children}
      </CardContent>
    </Card>
  );
}

const mockPosts: Post[] = [
  {
    id: "m1",
    name: "Jane Cooper",
    role: "UI/UX Designer at Figma",
    avatar_url: "",
    content: "Just finished redesigning the dashboard for a fintech startup.\nFocus was on clarity, simplicity and better data visualization.\nWould love your feedback! 👇",
    tags: "design,figma,ux",
    likes_count: 128,
    comments_count: 32,
    created_at: new Date().toISOString(),
  },
  {
    id: "m2",
    name: "Devansh Sharma",
    role: "Backend Developer",
    avatar_url: "",
    content: "Exploring Rate Limiting in Node.js 🚀\nBuilt a simple middleware using Redis.",
    tags: "nodejs,redis,backend",
    likes_count: 94,
    comments_count: 17,
    created_at: new Date().toISOString(),
  },
];

function FeedPage() {
  const { data: posts, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    retry: false,
  });

  const list = posts && posts.length > 0 ? posts : mockPosts;

  const handlePost = async (content: string) => {
    try {
      await createPost({ user_id: "demo", content, tags: "" });
      refetch();
    } catch {
      /* ignore */
    }
  };

  return (
    <TopNavLayout>
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column */}
        <aside className="col-span-12 lg:col-span-3 space-y-4">
          <ProfileCard />
          <QuickAccess />
          <PremiumCard />
        </aside>

        {/* Center Column */}
        <section className="col-span-12 lg:col-span-6 space-y-4">
          <PostComposer onPost={handlePost} />
          <PeopleYouFollow />
          {list.map((p) => <PostCard key={p.id} post={p} />)}
        </section>

        {/* Right Column */}
        <aside className="col-span-12 lg:col-span-3 space-y-4">
          <SectionCard title="Continue Learning">
            <div className="space-y-4">
              {learning.map((c) => (
                <div key={c.title} className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-lg ${c.color} flex items-center justify-center text-xs font-bold text-black shrink-0`}>
                    {c.letters}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-xs font-medium truncate">{c.title}</p>
                      <span className="text-[10px] text-muted-foreground ml-2">{c.progress}%</span>
                    </div>
                    <div className="h-1 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${c.progress}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Featured Opportunity">
            <div className="flex gap-3">
              <div className="h-10 w-10 rounded bg-muted flex items-center justify-center text-xs font-bold shrink-0">MS</div>
              <div className="flex-1">
                <p className="text-sm font-semibold">Software Engineer Intern</p>
                <p className="text-xs text-muted-foreground">Microsoft</p>
                <div className="flex gap-1 mt-2">
                  <Badge variant="secondary" className="text-[10px]">Internship</Badge>
                  <Badge variant="secondary" className="text-[10px]">Remote</Badge>
                </div>
                <p className="text-[10px] text-muted-foreground mt-2">Posted 2h ago</p>
              </div>
              <button className="text-muted-foreground hover:text-primary self-start">
                <Bookmark className="h-4 w-4" />
              </button>
            </div>
          </SectionCard>

          <SectionCard title="Trending Discussions">
            <div className="space-y-3">
              {discussions.map((d) => (
                <div key={d.q} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-[10px]">{d.by[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium leading-snug">{d.q}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">by {d.by}</p>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <MessageCircle className="h-3 w-3" />
                    {d.replies}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Suggested Connections">
            <div className="space-y-3">
              {suggestedConnections.map((c) => (
                <div key={c.name} className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="text-[10px]">{c.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate">{c.name}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{c.role}</p>
                  </div>
                  <Button size="sm" variant="secondary" className="h-7 text-xs px-3">Connect</Button>
                </div>
              ))}
            </div>
          </SectionCard>
        </aside>
      </div>
    </TopNavLayout>
  );
}
