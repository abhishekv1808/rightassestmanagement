"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateLeadStatus(id: string, status: string) {
  const supabase = await createClient();
  await supabase.from("leads").update({ status }).eq("id", id);
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}

export async function approveTestimonial(id: string) {
  const supabase = await createClient();
  await supabase.from("testimonials").update({ approved: true }).eq("id", id);
  revalidatePath("/admin/testimonials");
  revalidatePath("/admin");
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();
  await supabase.from("testimonials").delete().eq("id", id);
  revalidatePath("/admin/testimonials");
  revalidatePath("/admin");
}

export async function deleteLead(id: string) {
  const supabase = await createClient();
  await supabase.from("leads").delete().eq("id", id);
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}

// ─── Blog actions ──────────────────────────────────────────────────────────────

export type BlogPostInput = {
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  published: boolean;
  category: string;
  meta_title: string;
  meta_description: string;
  cover_image_url: string;
  read_time: string;
};

export async function saveBlogPost(
  data: BlogPostInput
): Promise<{ success: boolean; id?: string; error?: string }> {
  const supabase = await createClient();

  const payload = {
    title: data.title.trim(),
    slug: data.slug.trim(),
    content: data.content,
    excerpt: data.excerpt.trim(),
    published: data.published,
    category: data.category,
    meta_title: data.meta_title.trim() || data.title.trim(),
    meta_description: data.meta_description.trim(),
    cover_image_url: data.cover_image_url.trim() || null,
    read_time: data.read_time.trim() || null,
  };

  if (data.id) {
    const { error } = await supabase
      .from("blog_posts")
      .update(payload)
      .eq("id", data.id);
    if (error) return { success: false, error: error.message };
    revalidatePath("/admin/blog");
    revalidatePath(`/blog/${data.slug}`);
    revalidatePath("/blog");
    return { success: true, id: data.id };
  }

  const { data: inserted, error } = await supabase
    .from("blog_posts")
    .insert(payload)
    .select("id")
    .single();
  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return { success: true, id: inserted.id };
}

export async function deleteBlogPost(id: string) {
  const supabase = await createClient();
  await supabase.from("blog_posts").delete().eq("id", id);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

export async function toggleBlogPublished(id: string, published: boolean) {
  const supabase = await createClient();
  await supabase.from("blog_posts").update({ published }).eq("id", id);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}
