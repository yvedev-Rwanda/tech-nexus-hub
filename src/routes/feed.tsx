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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

function PostCard({ post }: { post: Post }) {
  const { t } = useTranslation();
  const tags = post.tags ? post.tags.split(",") : [];

  return (
    <Card className="border-border/40 bg-card/30 backdrop-blur transition-transform hover:scale-[1.005] hover:border-primary/20">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-3">
            <Avatar className="h-12 w-12 border border-border">
              <AvatarImage src={post.avatar_url} />
              <AvatarFallback>{post.name?.[0] ?? "U"}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-sm font-bold leading-none">{post.name}</h4>
              <p className="text-xs text-muted-foreground mt-1">
                {post.role} •{" "}
                {post.created_at
                  ? new Date(post.created_at).toLocaleDateString()
                  : ""}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-sm leading-relaxed mb-4 whitespace-pre-wrap">{post.content}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded-full"
            >
              #{tag.trim()}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-6 pt-4 border-t border-border/20">
          <button className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
            <Heart className="h-4 w-4" />
            {post.likes_count} {t("feed.likes")}
          </button>
          <button className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
            <MessageCircle className="h-4 w-4" />
            {post.comments_count} {t("feed.comments")}
          </button>
          <button className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
            <Share2 className="h-4 w-4" />
            {t("feed.share")}
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
      // silently fail – user can retry
    }
  };

  return (
    <AppLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Post Creator */}
          <Card className="border-border/40 bg-card/30 backdrop-blur shadow-[var(--shadow-card)] overflow-hidden">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <Avatar className="h-10 w-10 border border-border">
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                  <textarea
                    placeholder={t("feed.placeholder")}
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    className="w-full min-h-[100px] bg-transparent border-none focus:ring-0 text-sm resize-none"
                  />
                  <div className="flex items-center justify-between pt-2 border-t border-border/40">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="h-8 gap-2 text-muted-foreground">
                        <ImageIcon className="h-4 w-4" />
                        {t("feed.addImage")}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 gap-2 text-muted-foreground">
                        <Plus className="h-4 w-4" />
                        {t("feed.codeSnippet")}
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      className="bg-[image:var(--gradient-primary)] text-primary-foreground font-semibold"
                      onClick={handlePost}
                    >
                      {t("feed.postBtn")}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* State feedback */}
          {isLoading && (
            <div className="flex justify-center py-16 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          )}
          {isError && (
            <div className="flex flex-col items-center py-12 gap-3 text-destructive">
              <AlertCircle className="h-8 w-8" />
              <p className="text-sm font-medium">{t("common.error")}</p>
            </div>
          )}

          {/* Posts List */}
          <div className="space-y-6">
            {posts?.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
            {posts?.length === 0 && !isLoading && (
              <p className="text-center text-muted-foreground py-12">{t("common.noData")}</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="border-border/40 bg-card/30 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4 text-accent">
                <TrendingUp className="h-4 w-4" />
                <h4 className="text-sm font-bold tracking-tight uppercase">{t("feed.trending")}</h4>
              </div>
              <div className="space-y-4">
                {trendingTopics.map((item) => (
                  <div key={item.topic} className="group cursor-pointer">
                    <p className="text-sm font-medium group-hover:text-primary transition-colors">{item.topic}</p>
                    <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-widest">{item.count}</p>
                  </div>
                ))}
              </div>
              <Button variant="link" className="px-0 mt-4 text-xs font-bold uppercase tracking-widest text-accent">
                {t("feed.viewAll")}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/40 bg-card/30 backdrop-blur overflow-hidden relative">
            <div className="absolute inset-0 bg-primary/5 blur-3xl" />
            <CardContent className="p-6 relative">
              <h4 className="text-sm font-bold mb-2">{t("feed.tip")}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{t("feed.tipDesc")}</p>
              <Button size="sm" variant="outline" className="w-full mt-4 text-[10px] font-bold uppercase">
                {t("feed.connectGithub")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
