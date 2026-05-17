"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function GalleryPage() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get("/api/gallery");
        setImages(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Our <span className="text-primary">Gallery</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Explore our finest installations and premium craftsmanship through our curated masonry gallery.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="animate-spin text-primary" size={48} />
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-24 bg-card border border-border rounded-sm">
            <p className="text-muted-foreground">No images found. Please check back later.</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {images.map((img: any, idx: number) => (
              <motion.div
                key={img._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative group overflow-hidden rounded-sm break-inside-avoid shadow-sm hover:shadow-xl transition-all"
              >
                {/* Since we don't have real dimensions, we use a placeholder aspect ratio or img tag */}
                <img
                  src={img.image}
                  alt={img.title || "Gallery Image"}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <h3 className="text-white font-heading font-bold text-xl px-4 text-center">
                    {img.title || "Premium Installation"}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
