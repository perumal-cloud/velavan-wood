"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Trash2, Pencil, Plus, Search, Loader2, Eye } from "lucide-react";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  coverImage?: string;
  metaDescription?: string;
  createdAt: string;
}

export default function BlogsAdminPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blogs?sort=-createdAt");
      const json = await res.json();
      if (json.success) setBlogs(json.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    setDeleting(id);
    try {
      await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch { alert("Failed to delete."); }
    finally { setDeleting(null); }
  };

  const filtered = blogs.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <FileText size={22} className="text-green-600" /> Blog Posts
          </h1>
          <p className="text-muted-foreground text-sm mt-1">{blogs.length} total posts</p>
        </div>
        <Link href="/admin/blogs/new"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90">
          <Plus size={16} /> New Post
        </Link>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input type="text" placeholder="Search posts..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              <th className="text-left px-4 py-3 text-muted-foreground font-semibold">Title</th>
              <th className="text-left px-4 py-3 text-muted-foreground font-semibold hidden md:table-cell">Slug</th>
              <th className="text-left px-4 py-3 text-muted-foreground font-semibold hidden lg:table-cell">Published</th>
              <th className="text-right px-4 py-3 text-muted-foreground font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {Array.from({ length: 4 }).map((__, j) => (
                    <td key={j} className="px-4 py-3"><div className="h-4 bg-muted animate-pulse rounded" /></td>
                  ))}
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr><td colSpan={4} className="text-center py-12 text-muted-foreground">No blog posts found.</td></tr>
            ) : (
              filtered.map((blog) => (
                <tr key={blog._id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-foreground line-clamp-1">{blog.title}</p>
                    {blog.metaDescription && (
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{blog.metaDescription}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell font-mono text-xs">{blog.slug}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">
                    {new Date(blog.createdAt).toLocaleDateString("en-IN")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/blog/${blog.slug}`} target="_blank"
                        className="p-1.5 rounded-md hover:bg-green-50 text-green-600 transition-colors" title="View live">
                        <Eye size={15} />
                      </Link>
                      <Link href={`/admin/blogs/${blog._id}`}
                        className="p-1.5 rounded-md hover:bg-blue-50 text-blue-600 transition-colors" title="Edit">
                        <Pencil size={15} />
                      </Link>
                      <button onClick={() => handleDelete(blog._id, blog.title)} disabled={deleting === blog._id}
                        className="p-1.5 rounded-md hover:bg-red-50 text-red-500 disabled:opacity-50" title="Delete">
                        {deleting === blog._id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
