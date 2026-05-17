"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get("/api/testimonials");
        setTestimonials(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Client <span className="text-primary">Testimonials</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Hear what our esteemed clients have to say about our craftsmanship and service.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="animate-spin text-primary" size={48} />
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-24 bg-card border border-border rounded-sm">
            <p className="text-muted-foreground">No testimonials found. Please check back later.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial: any, idx: number) => (
              <motion.div
                key={testimonial._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card border border-border p-8 rounded-sm shadow-sm relative hover:shadow-xl transition-all"
              >
                <Quote className="absolute top-6 right-6 text-primary/20" size={48} />
                <div className="flex gap-1 text-primary mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill={i < testimonial.rating ? "currentColor" : "none"} />
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-6 leading-relaxed relative z-10">
                  "{testimonial.message}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold font-heading">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Verified Client</p>
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
