"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Image from "next/image";

interface GalleryForm {
  image: string;
  title: string;
}

export default function NewGalleryPage() {
  const router = useRouter();
  const [form, setForm] = useState<GalleryForm>({ image: "", title: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setError("");
    if (!form.image.trim()) { setError("Image URL is required."); return; }
    setSaving(true);
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      router.push("/admin/gallery");
    } catch (e: any) { setError(e.message || "Failed to save."); }
    finally { setSaving(false); }
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/gallery" className="p-2 hover:bg-muted rounded-lg transition-colors"><ArrowLeft size={18} /></Link>
        <h1 className="text-2xl font-bold text-foreground">Add Gallery Image</h1>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">{error}</div>}

      <div className="bg-card border border-border rounded-lg p-6 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Image URL *</label>
          <input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}
            placeholder="https://example.com/image.jpg"
            className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
        </div>
        {form.image && (
          <div className="relative aspect-video rounded-lg overflow-hidden border border-border bg-muted">
            <Image src={form.image} alt="Preview" fill className="object-cover" sizes="500px" unoptimized />
          </div>
        )}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Caption (Optional)</label>
          <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="e.g. Teak Main Door"
            className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Link href="/admin/gallery" className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-semibold hover:bg-muted">Cancel</Link>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-50">
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
          {saving ? "Saving..." : "Add to Gallery"}
        </button>
      </div>
    </div>
  );
}
