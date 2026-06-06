import { supabase } from "@/integrations/supabase/client";

export interface Post {
  id: string;
  content: string;
  likes_count: number;
  comments_count: number;
  tags: string;
  created_at: string;
  name: string;
  avatar_url: string;
  role: string;
}

export async function getPosts(): Promise<Post[]> {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("id, content, tags, likes_count, comments_count, created_at, user_id")
    .order("created_at", { ascending: false })
    .limit(50);
  if (error) throw error;
  if (!posts || posts.length === 0) return [];

  const userIds = Array.from(new Set(posts.map((p) => p.user_id)));
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, first_name, last_name, role, avatar_url")
    .in("id", userIds);

  const map = new Map((profiles ?? []).map((p) => [p.id, p]));
  return posts.map((p) => {
    const prof = map.get(p.user_id);
    const name = prof
      ? `${prof.first_name ?? ""} ${prof.last_name ?? ""}`.trim() || "VEXA Member"
      : "VEXA Member";
    return {
      id: p.id,
      content: p.content,
      tags: p.tags ?? "",
      likes_count: p.likes_count ?? 0,
      comments_count: p.comments_count ?? 0,
      created_at: p.created_at,
      name,
      avatar_url: prof?.avatar_url ?? "",
      role: prof?.role ?? "VEXA Member",
    };
  });
}

export async function createPost(body: { content: string; tags?: string }) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  const { data, error } = await supabase
    .from("posts")
    .insert({ user_id: user.id, content: body.content, tags: body.tags ?? "" })
    .select()
    .single();
  if (error) throw error;
  return data;
}
