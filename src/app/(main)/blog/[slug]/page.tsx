import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import connectToDatabase from "@/lib/db";
import { Blog } from "@/models/Blog";
import { ArrowLeft, Calendar, User } from "lucide-react";

export const revalidate = 60;

async function getBlog(slug: string) {
  try {
    await connectToDatabase();
    const blog = await Blog.findOne({ slug }).lean();
    return blog as any;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return { title: "Article Not Found | Velavan Wooden Doors" };
  }

  return {
    title: (blog.metaTitle || blog.title) + " | Velavan Wooden Doors",
    description: blog.metaDescription || blog.title,
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  return (
    <article className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">

        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 text-sm font-bold uppercase tracking-wider"
        >
          <ArrowLeft size={16} />
          Back to Journal
        </Link>
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6 leading-tight">
            {blog.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground font-medium">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-primary" />
              <time dateTime={new Date(blog.createdAt).toISOString()}>
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <User size={18} className="text-primary" />
              <span>Velavan Experts</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {blog.coverImage && (
          <div className="relative w-full h-[400px] md:h-[500px] rounded-sm overflow-hidden mb-16 shadow-xl">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-sm"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-heading font-bold text-foreground">Share this article</h3>
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors font-bold">
                𝕏
              </button>
              <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors font-bold">
                f
              </button>
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
}
