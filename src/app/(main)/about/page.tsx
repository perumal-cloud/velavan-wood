"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, Award, Users, Clock } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { label: "Years Experience", value: "25+", icon: Clock },
    { label: "Happy Clients", value: "10k+", icon: Users },
    { label: "Awards Won", value: "15", icon: Award },
    { label: "Projects Done", value: "12k+", icon: CheckCircle },
  ];

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-4 lg:px-8 mb-24">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6">
            Our Legacy in <span className="text-primary">Woodcraft</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            Since 1998, Velavan Wooden Doors has been synonymous with premium craftsmanship, transforming luxury spaces with our masterpieces.
          </p>
        </div>

        <div className="relative h-[400px] md:h-[600px] rounded-sm overflow-hidden mb-24">
          <Image
            src="/images/hero-bg.png"
            alt="Velavan Wood Workshop"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border-4 border-primary flex items-center justify-center backdrop-blur-md cursor-pointer hover:bg-primary/20 transition-colors">
              <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-2" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center p-6 border border-border bg-card rounded-sm shadow-sm hover:shadow-xl transition-all"
            >
              <stat.icon className="mx-auto text-primary mb-4" size={32} />
              <h3 className="text-3xl font-heading font-bold text-foreground mb-2">{stat.value}</h3>
              <p className="text-sm font-bold tracking-widest uppercase text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="bg-foreground text-background py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
            <div className="space-y-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Our Mission</h2>
              <h3 className="text-3xl font-heading font-bold">Crafting Timeless Elegance</h3>
              <p className="text-black/80 leading-relaxed text-lg">
                To design and manufacture the highest quality wooden doors that not only secure homes but also elevate their aesthetic appeal. We believe every piece of wood has a story, and we bring it to life through our artisan touch.
              </p>
            </div>
            <div className="space-y-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Our Vision</h2>
              <h3 className="text-3xl font-heading font-bold text-black">Global Benchmark in Woodcraft</h3>
              <p className="text-black/80 leading-relaxed text-lg">
                To be the world's most trusted and prestigious brand for luxury wooden doors and interior architectural woodwork, preserving traditional craftsmanship while embracing modern precision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">Our Journey</h2>
          <h3 className="text-3xl font-heading font-bold text-foreground">The Velavan Timeline</h3>
        </div>

        <div className="max-w-4xl mx-auto space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary before:to-transparent">
          {[
            { year: "1998", title: "The Foundation", desc: "Started as a small artisan workshop focusing on custom hand-carved doors." },
            { year: "2005", title: "Factory Expansion", desc: "Opened our first major production facility integrating modern machinery with handcrafting." },
            { year: "2012", title: "National Recognition", desc: "Awarded 'Best Architectural Woodwork' for our signature Royal Teak collection." },
            { year: "2020", title: "Going Global", desc: "Began exporting premium doors to luxury markets across the Middle East and Europe." },
            { year: "Today", title: "Industry Leaders", desc: "Setting the standard for luxury wooden interiors with over 10,000 completed masterpieces." },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary bg-background text-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg z-10">
                <div className="w-3 h-3 bg-primary rounded-full" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-card border border-border rounded-sm shadow-sm hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-xl text-foreground">{item.title}</h4>
                  <span className="font-bold text-primary font-heading">{item.year}</span>
                </div>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
