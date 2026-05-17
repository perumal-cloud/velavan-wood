"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Loader2, Filter } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-heading font-bold text-foreground">Our Collection</h1>
            <p className="text-muted-foreground mt-2">Discover our premium range of wooden masterpieces.</p>
          </div>
          <button className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 border border-border rounded-sm hover:bg-card transition-colors">
            <Filter size={18} />
            <span>Filter</span>
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="animate-spin text-primary" size={48} />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24 bg-card border border-border rounded-sm">
            <p className="text-muted-foreground">No products found. Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product: any, index) => (
              <motion.div 
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-card border border-border rounded-sm overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="relative h-72 w-full overflow-hidden bg-muted">
                  {product.images && product.images[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-secondary/20">
                      No Image Available
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-sm">
                    {product.category?.name || "Premium"}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold font-heading text-foreground mb-2 group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg text-foreground">
                      {product.price ? `$${product.price}` : "Price on Request"}
                    </span>
                    <Link
                      href={`/products/${product.slug}`}
                      className="text-primary font-bold uppercase tracking-wider text-sm hover:underline"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
