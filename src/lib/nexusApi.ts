const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5002";

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`API error ${res.status}: ${res.statusText}`);
  return res.json();
}

// ─── Types ────────────────────────────────────────────────────────────────────

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

export interface Course {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  level: string;
  total_modules: number;
  duration: string;
  color_class: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  bio: string;
  avatar_url: string;
  level: number;
  skill_points: number;
}

export interface Company {
  id: string;
  name: string;
  tagline: string;
  logo_url: string;
  industry: string;
  employee_count: string;
  open_roles: number;
  is_verified: boolean;
  website: string;
}

export interface Opportunity {
  id: string;
  title: string;
  location: string;
  salary_range: string;
  type: string;
  tags: string;
  match_percentage: number;
  company_name: string;
  logo_url: string;
}

// ─── API Functions ────────────────────────────────────────────────────────────

export const getPosts = ()        => apiFetch<Post[]>("/api/posts");
export const getCourses = ()      => apiFetch<Course[]>("/api/courses");
export const getUsers = ()        => apiFetch<User[]>("/api/users");
export const getCompanies = ()    => apiFetch<Company[]>("/api/companies");
export const getOpportunities = ()=> apiFetch<Opportunity[]>("/api/opportunities");

export const createPost = async (body: { user_id: string; content: string; tags: string }) => {
  const res = await fetch(`${API_BASE}/api/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Failed to create post");
  return res.json();
};
