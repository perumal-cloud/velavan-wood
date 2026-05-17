"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Loader2, Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("/api/blogs");
        setBlogs(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Velavan <span className="text-primary">Journal</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Insights, trends, and inspiration from the world of luxury woodcraft and interior design.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="animate-spin text-primary" size={48} />
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-24 bg-card border border-border rounded-sm">
            <p className="text-muted-foreground">No articles published yet. Please check back later.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog: any, idx: number) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-card border border-border rounded-sm overflow-hidden hover:shadow-xl transition-all flex flex-col"
              >
                <div className="relative h-60 w-full overflow-hidden bg-muted">
                  {blog.coverImage ? (
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-secondary/20 text-muted-foreground">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-xs text-primary font-bold uppercase tracking-wider mb-4">
                    <Calendar size={14} />
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
                    {/* Basic strip HTML tags for preview */}
                    {blog.content.replace(/<[^>]*>?/gm, '')}
                  </p>
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="inline-flex items-center gap-2 text-foreground font-bold uppercase tracking-wider text-sm hover:text-primary transition-colors"
                  >
                    Read Article
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
