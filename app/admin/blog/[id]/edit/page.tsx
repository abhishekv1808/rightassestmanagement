import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import BlogEditor from "@/components/admin/BlogEditor";

export const metadata = { title: "Edit Post — Admin" };

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from("blog_posts")
    .select(
      "id, title, slug, content, excerpt, published, category, meta_title, meta_description, cover_image_url, read_time"
    )
    .eq("id", id)
    .single();

  if (error || !post) notFound();

  return <BlogEditor post={post} />;
}
