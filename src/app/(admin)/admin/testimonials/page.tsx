"use client";

import { useEffect, useState } from "react";
import { Users, Trash2, Pencil, Plus, Star, X, Save, Loader2 } from "lucide-react";

interface Testimonial {
  _id: string;
  name: string;
  message: string;
  rating: number;
  createdAt: string;
}

const emptyForm = { name: "", message: "", rating: 5 };

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/testimonials?sort=-createdAt");
      const json = await res.json();
      if (json.success) setTestimonials(json.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchTestimonials(); }, []);

  const openCreate = () => { setForm(emptyForm); setEditId(null); setError(""); setShowForm(true); };
  const openEdit = (t: Testimonial) => { setForm({ name: t.name, message: t.message, rating: t.rating }); setEditId(t._id); setError(""); setShowForm(true); };

  const handleSave = async () => {
    setError("");
    if (!form.name.trim() || !form.message.trim()) { setError("Name and message are required."); return; }
    setSaving(true);
    try {
      const url = editId ? `/api/testimonials/${editId}` : "/api/testimonials";
      const res = await fetch(url, { method: editId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      await fetchTestimonials();
      setShowForm(false);
    } catch (e: any) { setError(e.message || "Failed to save."); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    setDeleting(id);
    try {
      await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      setTestimonials((prev) => prev.filter((t) => t._id !== id));
    } catch { alert("Failed to delete."); }
    finally { setDeleting(null); }
  };

  const StarRating = ({ value, onChange }: { value: number; onChange?: (v: number) => void }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button key={star} type="button" onClick={() => onChange?.(star)}
          className={`transition-transform ${onChange ? "cursor-pointer hover:scale-110" : "cursor-default"}`}>
          <Star size={18} className={star <= value ? "text-amber-400 fill-amber-400" : "text-muted"} />
        </button>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Users size={22} className="text-rose-600" /> Testimonials
          </h1>
          <p className="text-muted-foreground text-sm mt-1">{testimonials.length} total testimonials</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90">
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-5 animate-pulse space-y-3">
              <div className="h-4 bg-muted rounded w-1/2" /><div className="h-3 bg-muted rounded" /><div className="h-3 bg-muted rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">No testimonials yet. Add one to get started.</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div key={t._id} className="bg-card border border-border rounded-lg p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-foreground">{t.name}</p>
                  <StarRating value={t.rating} />
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(t)} className="p-1.5 rounded-md hover:bg-blue-50 text-blue-600"><Pencil size={14} /></button>
                  <button onClick={() => handleDelete(t._id)} disabled={deleting === t._id} className="p-1.5 rounded-md hover:bg-red-50 text-red-500 disabled:opacity-50">
                    {deleting === t._id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                  </button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">&quot;{t.message}&quot;</p>
              <p className="text-xs text-muted-foreground mt-auto">{new Date(t.createdAt).toLocaleDateString("en-IN")}</p>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h3 className="font-bold text-foreground text-lg">{editId ? "Edit" : "Add"} Testimonial</h3>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-muted rounded-lg"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 rounded-lg">{error}</div>}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Customer Name *</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Rajan Kumar"
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Rating *</label>
                <div className="flex items-center gap-3">
                  <StarRating value={form.rating} onChange={(v) => setForm({ ...form, rating: v })} />
                  <span className="text-sm text-muted-foreground">{form.rating}/5</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Message *</label>
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Customer feedback..." rows={4}
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none" />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-border flex justify-end gap-3">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-semibold hover:bg-muted">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-50">
                {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
