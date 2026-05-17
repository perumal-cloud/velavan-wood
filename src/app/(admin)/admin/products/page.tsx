"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, Trash2, Pencil, Plus, Search, Loader2, Tag } from "lucide-react";
import Image from "next/image";

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: Category;
  images: string[];
  price?: number;
  featured: boolean;
  createdAt: string;
}

export default function ProductsAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products?sort=-createdAt");
      const json = await res.json();
      if (json.success) setProducts(json.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    setDeleting(id);
    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch { alert("Failed to delete."); }
    finally { setDeleting(null); }
  };

  const filtered = products.filter((p) =>
    `${p.title} ${p.category?.name ?? ""}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Package size={22} className="text-amber-600" /> Products
          </h1>
          <p className="text-muted-foreground text-sm mt-1">{products.length} total products</p>
        </div>
        <Link href="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90">
          <Plus size={16} /> Add Product
        </Link>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
              <div className="h-44 bg-muted" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">No products found.</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <div key={product._id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow flex flex-col">
              <div className="relative h-44 bg-muted">
                {product.images?.[0] ? (
                  <Image src={product.images[0]} alt={product.title} fill className="object-cover" sizes="(max-width: 640px) 50vw, 25vw" unoptimized />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <Package size={32} />
                  </div>
                )}
                {product.featured && (
                  <span className="absolute top-2 left-2 text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full font-semibold">Featured</span>
                )}
              </div>
              <div className="p-4 flex flex-col gap-2 flex-1">
                <p className="font-bold text-foreground line-clamp-1">{product.title}</p>
                <div className="flex items-center gap-1.5">
                  <Tag size={12} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{product.category?.name || "Uncategorized"}</span>
                </div>
                {product.price !== undefined && product.price > 0 && (
                  <p className="text-sm font-semibold text-amber-700">₹{product.price.toLocaleString("en-IN")}</p>
                )}
                <div className="flex gap-2 mt-auto pt-2">
                  <Link href={`/admin/products/${product._id}`}
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-blue-50 text-blue-700 rounded-md text-xs font-semibold hover:bg-blue-100 transition-colors">
                    <Pencil size={12} /> Edit
                  </Link>
                  <button onClick={() => handleDelete(product._id, product.title)} disabled={deleting === product._id}
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-red-50 text-red-600 rounded-md text-xs font-semibold hover:bg-red-100 transition-colors disabled:opacity-50">
                    {deleting === product._id ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
