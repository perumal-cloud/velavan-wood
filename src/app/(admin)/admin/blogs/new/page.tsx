"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

interface BlogForm {
  title: string;
  slug: string;
  content: string;
  coverImage: string;
  metaTitle: string;
  metaDescription: string;
}

const emptyForm: BlogForm = {
  title: "", slug: "", content: "", coverImage: "", metaTitle: "", metaDescription: "",
};

function toSlug(text: string) {
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
}

export default function NewBlogPage() {
  const router = useRouter();
  const [form, setForm] = useState<BlogForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: keyof BlogForm, value: string) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "title") updated.slug = toSlug(value);
      return updated;
    });
  };

  const handleSave = async () => {
    setError("");
    if (!form.title.trim() || !form.slug.trim() || !form.content.trim()) {
      setError("Title, slug, and content are required."); return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      router.push("/admin/blogs");
    } catch (e: any) { setError(e.message || "Failed to save."); }
    finally { setSaving(false); }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/blogs" className="p-2 hover:bg-muted rounded-lg transition-colors"><ArrowLeft size={18} /></Link>
          <h1 className="text-2xl font-bold text-foreground">New Blog Post</h1>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-50">
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
          {saving ? "Saving..." : "Publish Post"}
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">{error}</div>}

      <div className="bg-card border border-border rounded-lg p-6 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Title *</label>
          <input type="text" value={form.title} onChange={(e) => handleChange("title", e.target.value)}
            placeholder="e.g. Top 5 Wooden Door Trends in 2025"
            className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Slug *</label>
          <div className="flex items-center bg-background border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary/40">
            <span className="px-3 text-sm text-muted-foreground border-r border-border py-2.5">/blog/</span>
            <input type="text" value={form.slug} onChange={(e) => handleChange("slug", e.target.value)}
              placeholder="url-friendly-slug"
              className="flex-1 px-3 py-2.5 text-sm bg-transparent focus:outline-none" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Cover Image URL</label>
          <input type="text" value={form.coverImage} onChange={(e) => handleChange("coverImage", e.target.value)}
            placeholder="https://example.com/cover.jpg"
            className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Content *</label>
          <textarea value={form.content} onChange={(e) => handleChange("content", e.target.value)}
            placeholder="Write your blog content here..."
            rows={14}
            className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y font-mono" />
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 space-y-5">
        <h3 className="font-bold text-foreground text-sm uppercase tracking-wider text-muted-foreground">SEO Settings</h3>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Meta Title</label>
          <input type="text" value={form.metaTitle} onChange={(e) => handleChange("metaTitle", e.target.value)}
            placeholder="SEO title"
            className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Meta Description</label>
          <textarea value={form.metaDescription} onChange={(e) => handleChange("metaDescription", e.target.value)}
            placeholder="Brief description for search engines (150-160 chars)"
            rows={3}
            className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none" />
          <p className="text-xs text-muted-foreground mt-1">{form.metaDescription.length}/160 characters</p>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-50">
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
          {saving ? "Saving..." : "Publish Post"}
        </button>
      </div>
    </div>
  );
}
