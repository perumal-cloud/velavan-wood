"use client";

import { useEffect, useState } from "react";
import { Image as ImageIcon, Trash2, Plus, X, Save, Loader2 } from "lucide-react";
import Image from "next/image";

interface GalleryItem {
  _id: string;
  image: string;
  title?: string;
  createdAt: string;
}

const emptyForm = { image: "", title: "" };

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/gallery?sort=-createdAt");
      const json = await res.json();
      if (json.success) setItems(json.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchItems(); }, []);

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
      await fetchItems();
      setShowForm(false);
      setForm(emptyForm);
    } catch (e: any) { setError(e.message || "Failed to save."); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this image?")) return;
    setDeleting(id);
    try {
      await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      setItems((prev) => prev.filter((i) => i._id !== id));
    } catch { alert("Failed to delete."); }
    finally { setDeleting(null); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <ImageIcon size={22} className="text-purple-600" /> Gallery
          </h1>
          <p className="text-muted-foreground text-sm mt-1">{items.length} images</p>
        </div>
        <button onClick={() => { setForm(emptyForm); setError(""); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90">
          <Plus size={16} /> Add Image
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-square bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          No images yet. Click &quot;Add Image&quot; to get started.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item._id} className="group relative aspect-square rounded-lg overflow-hidden border border-border bg-muted">
              <Image
                src={item.image}
                alt={item.title || "Gallery image"}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button
                  onClick={() => handleDelete(item._id)}
                  disabled={deleting === item._id}
                  className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                >
                  {deleting === item._id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                </button>
              </div>
              {item.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs px-2 py-1 truncate">
                  {item.title}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h3 className="font-bold text-foreground text-lg">Add Gallery Image</h3>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-muted rounded-lg"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 rounded-lg">{error}</div>}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Image URL *</label>
                <input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
              </div>
              {form.image && (
                <div className="relative aspect-video rounded-lg overflow-hidden border border-border bg-muted">
                  <Image src={form.image} alt="Preview" fill className="object-cover" sizes="400px" unoptimized />
                </div>
              )}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Caption (Optional)</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Teak Main Door"
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-border flex justify-end gap-3">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-semibold hover:bg-muted">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-50">
                {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                {saving ? "Saving..." : "Add Image"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
