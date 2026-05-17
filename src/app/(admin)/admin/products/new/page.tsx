"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, Plus, X } from "lucide-react";
import Image from "next/image";

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface ProductForm {
  title: string;
  slug: string;
  description: string;
  category: string;
  images: string[];
  price: string;
  featured: boolean;
  specifications: { key: string; value: string }[];
}

const emptyForm: ProductForm = {
  title: "",
  slug: "",
  description: "",
  category: "",
  images: [],
  price: "",
  featured: false,
  specifications: [],
};

function toSlug(text: string) {
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
}

export default function NewProductPage() {
  const router = useRouter();
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [newImage, setNewImage] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const json = await res.json();
        if (json.success) setCategories(json.data);
      } catch (e) { console.error(e); }
    };
    fetchCategories();
  }, []);

  const handleChange = (field: keyof ProductForm, value: any) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "title") updated.slug = toSlug(value);
      return updated;
    });
  };

  const addImage = () => {
    if (!newImage.trim()) return;
    setForm((prev) => ({ ...prev, images: [...prev.images, newImage.trim()] }));
    setNewImage("");
  };

  const removeImage = (idx: number) => {
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));
  };

  const addSpec = () => {
    setForm((prev) => ({ ...prev, specifications: [...prev.specifications, { key: "", value: "" }] }));
  };

  const updateSpec = (idx: number, field: "key" | "value", val: string) => {
    setForm((prev) => {
      const specs = [...prev.specifications];
      specs[idx] = { ...specs[idx], [field]: val };
      return { ...prev, specifications: specs };
    });
  };

  const removeSpec = (idx: number) => {
    setForm((prev) => ({ ...prev, specifications: prev.specifications.filter((_, i) => i !== idx) }));
  };

  const handleSave = async () => {
    setError("");
    if (!form.title.trim() || !form.slug.trim() || !form.description.trim() || !form.category) {
      setError("Title, slug, description, and category are required."); return;
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        price: form.price ? parseFloat(form.price) : undefined,
        specifications: form.specifications.filter((s) => s.key.trim()),
      };
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      router.push("/admin/products");
    } catch (e: any) { setError(e.message || "Failed to save."); }
    finally { setSaving(false); }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/products" className="p-2 hover:bg-muted rounded-lg transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">New Product</h1>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-50">
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
          {saving ? "Saving..." : "Save Product"}
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">{error}</div>}

      <div className="bg-card border border-border rounded-lg p-6 space-y-5">
        <h3 className="font-bold text-foreground">Basic Information</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">Title *</label>
            <input type="text" value={form.title} onChange={(e) => handleChange("title", e.target.value)}
              placeholder="e.g. Premium Teak Main Door"
              className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">Slug *</label>
            <input type="text" value={form.slug} onChange={(e) => handleChange("slug", e.target.value)}
              placeholder="premium-teak-main-door"
              className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">Category *</label>
            <select value={form.category} onChange={(e) => handleChange("category", e.target.value)}
              className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40">
              <option value="">Select category...</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">Price (₹)</label>
            <input type="number" value={form.price} onChange={(e) => handleChange("price", e.target.value)}
              placeholder="e.g. 25000"
              className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Description *</label>
          <textarea value={form.description} onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Describe the product..." rows={4}
            className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none" />
        </div>
        <div className="flex items-center gap-3">
          <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => handleChange("featured", e.target.checked)}
            className="w-4 h-4 accent-primary cursor-pointer" />
          <label htmlFor="featured" className="text-sm font-semibold text-foreground cursor-pointer">Mark as Featured Product</label>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <h3 className="font-bold text-foreground">Product Images</h3>
        <div className="flex gap-2">
          <input type="text" value={newImage} onChange={(e) => setNewImage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addImage()}
            placeholder="Paste image URL..."
            className="flex-1 px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
          <button onClick={addImage} className="flex items-center gap-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90">
            <Plus size={14} /> Add
          </button>
        </div>
        {form.images.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {form.images.map((img, idx) => (
              <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-border bg-muted">
                <Image src={img} alt={`img-${idx}`} fill className="object-cover" sizes="120px" unoptimized />
                <button onClick={() => removeImage(idx)}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-foreground">Specifications</h3>
          <button onClick={addSpec} className="flex items-center gap-1 px-3 py-1.5 bg-background border border-border rounded-lg text-xs font-semibold hover:bg-muted">
            <Plus size={12} /> Add Row
          </button>
        </div>
        {form.specifications.length === 0 ? (
          <p className="text-sm text-muted-foreground">No specifications yet.</p>
        ) : (
          <div className="space-y-2">
            {form.specifications.map((spec, idx) => (
              <div key={idx} className="flex gap-2">
                <input type="text" value={spec.key} onChange={(e) => updateSpec(idx, "key", e.target.value)}
                  placeholder="e.g. Material"
                  className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
                <input type="text" value={spec.value} onChange={(e) => updateSpec(idx, "value", e.target.value)}
                  placeholder="e.g. Teak Wood"
                  className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
                <button onClick={() => removeSpec(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-50">
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
          {saving ? "Saving..." : "Save Product"}
        </button>
      </div>
    </div>
  );
}
