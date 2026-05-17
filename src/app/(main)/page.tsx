"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, CheckCircle, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/home-banner.webp"
            alt="Luxury Wooden Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="container relative z-10 mx-auto px-4 lg:px-8 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-heading font-bold mb-6 tracking-tight"
          >
            Crafting <span className="text-primary">Elegance</span> in Wood
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-2xl text-white/80 max-w-2xl mx-auto mb-10"
          >
            Premium, handcrafted wooden doors designed for luxury homes and architectural masterpieces.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/products"
              className="px-8 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-widest rounded-sm hover:bg-primary/90 transition-all hover:scale-105"
            >
              Explore Collection
            </Link>
            <Link
              href="/quote"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold uppercase tracking-widest rounded-sm hover:bg-white hover:text-black transition-all hover:scale-105"
            >
              Request a Quote
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-background overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm text-primary font-bold tracking-widest uppercase mb-2">Our Promise</h2>
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Why Velavan Wood?</h3>
            <div className="w-20 h-1 bg-primary mx-auto mt-6" />
          </div>

          {/* 3-Column layout with circular accent */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center relative">

            {/* Left Side: Features */}
            <div className="space-y-12 text-center lg:text-right order-2 lg:order-1">

              {/* Feature 1 - Premium Quality */}
              <div className="flex flex-col lg:flex-row items-center lg:items-start justify-end gap-4">
                <div className="order-2 lg:order-1">
                  <h4 className="text-xl font-bold tracking-wide text-foreground uppercase">Premium Quality</h4>
                  <p className="text-muted-foreground text-sm max-w-xs mt-1 leading-relaxed">
                    We source only the finest teak and mahogany wood, ensuring unmatched durability and an exquisite finish.
                  </p>
                </div>
                <div className="w-12 h-12 bg-card border border-border rounded-sm flex items-center justify-center text-primary shrink-0 shadow-sm order-1 lg:order-2">
                  <Star size={24} />
                </div>
              </div>

              {/* Feature 2 - Master Craftsmanship */}
              <div className="flex flex-col lg:flex-row items-center lg:items-start justify-end gap-4">
                <div className="order-2 lg:order-1">
                  <h4 className="text-xl font-bold tracking-wide text-foreground uppercase">Master Craftsmanship</h4>
                  <p className="text-muted-foreground text-sm max-w-xs mt-1 leading-relaxed">
                    Our artisans bring decades of experience, hand-carving intricate designs that stand the test of time.
                  </p>
                </div>
                <div className="w-12 h-12 bg-card border border-border rounded-sm flex items-center justify-center text-primary shrink-0 shadow-sm order-1 lg:order-2">
                  <CheckCircle size={24} />
                </div>
              </div>

              {/* Feature 3 - Custom Designs*/}
              <div className="flex flex-col lg:flex-row items-center lg:items-start justify-end gap-4">
                <div className="order-2 lg:order-1">
                  <h4 className="text-xl font-bold tracking-wide text-foreground uppercase">Custom Designs</h4>
                  <p className="text-muted-foreground text-sm max-w-xs mt-1 leading-relaxed">
                    Tailored made to match your architectural requirements, dimensions, and personal aesthetic style perfectly.
                  </p>
                </div>
                <div className="w-12 h-12 bg-card border border-border rounded-sm flex items-center justify-center text-primary shrink-0 shadow-sm order-1 lg:order-2">
                  <Shield size={24} />
                </div>
              </div>

            </div>

            {/* Center: Product Feature Image*/}
            <div className="flex justify-center order-1 lg:order-2 my-8 lg:my-0 relative">
              {/* (Dotted Accent Circle) */}
              <div className="absolute inset-0 border border-dashed border-border rounded-full scale-125 pointer-events-none -z-10 opacity-60" />

              <div className="relative w-[280px] h-[280px] md:w-[320px] md:h-[420px]">
                <Image
                  src="/images/door-1.png"
                  alt="Velavan Wood Showcase"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Right Side: Features*/}
            <div className="space-y-12 text-center lg:text-left order-3">

              {/* Feature 4 - Guaranteed Durability */}
              <div className="flex flex-col lg:flex-row items-center lg:items-start justify-start gap-4">
                <div className="w-12 h-12 bg-card border border-border rounded-sm flex items-center justify-center text-primary shrink-0 shadow-sm">
                  <Shield size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold tracking-wide text-foreground uppercase">Guaranteed Durability</h4>
                  <p className="text-muted-foreground text-sm max-w-xs mt-1 leading-relaxed">
                    Treated with advanced techniques to resist termites, moisture, and wear, our doors are built for generations.
                  </p>
                </div>
              </div>

              {/* Feature 5 - Eco Friendly Sourcing (புதியது) */}
              <div className="flex flex-col lg:flex-row items-center lg:items-start justify-start gap-4">
                <div className="w-12 h-12 bg-card border border-border rounded-sm flex items-center justify-center text-primary shrink-0 shadow-sm">
                  <Star size={24} /> {/* உங்களுக்கு தேவையான Lucide ஐகானை மாற்றிக்கொள்ளலாம் */}
                </div>
                <div>
                  <h4 className="text-xl font-bold tracking-wide text-foreground uppercase">Eco Friendly</h4>
                  <p className="text-muted-foreground text-sm max-w-xs mt-1 leading-relaxed">
                    We responsibly source high-grade timber from sustainably managed plantations and forests.
                  </p>
                </div>
              </div>

              {/* Feature 6 - Perfect Finish (புதியது) */}
              <div className="flex flex-col lg:flex-row items-center lg:items-start justify-start gap-4">
                <div className="w-12 h-12 bg-card border border-border rounded-sm flex items-center justify-center text-primary shrink-0 shadow-sm">
                  <CheckCircle size={24} /> {/* உங்களுக்கு தேவையான Lucide ஐகானை மாற்றிக்கொள்ளலாம் */}
                </div>
                <div>
                  <h4 className="text-xl font-bold tracking-wide text-foreground uppercase">Premium Polish</h4>
                  <p className="text-muted-foreground text-sm max-w-xs mt-1 leading-relaxed">
                    Coated with superior, weather-resistant wood polish that highlights the natural beauty of the wood grain.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
      {/* Featured Door Section */}
      <section className="py-24 bg-foreground text-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2 relative h-[600px]">
              <div className="absolute inset-0 bg-primary/20 transform translate-x-4 translate-y-4 rounded-sm" />
              <Image
                src="/images/door-1.png"
                alt="Premium Teak Door"
                fill
                className="object-cover relative z-10 rounded-sm shadow-2xl"
              />
            </div>

            <div className="w-full lg:w-1/2 space-y-8">
              <h2 className="text-sm text-primary font-bold tracking-widest uppercase">Masterpiece Collection</h2>
              <h3 className="text-4xl md:text-5xl font-heading font-bold text-black">The Royal Teak Entrance</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Experience the grandeur of our signature Teak Entrance door. Handcrafted with precision, it features elegant golden handles and a rich mahogany finish that commands attention.
              </p>

              <ul className="space-y-4">
                {['100% Solid Teak Wood', 'Customizable Dimensions', 'Weather & Termite Resistant', 'Premium Brass Hardware Included'].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="text-primary shrink-0" size={20} />
                    <span className="text-black/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-6">
                <Link
                  href="/products/royal-teak"
                  className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider hover:text-black transition-colors group"
                >
                  View Product Details
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}