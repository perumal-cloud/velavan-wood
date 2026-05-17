"use client";

import { motion } from "framer-motion";
import { Hammer, PaintBucket, Wrench, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      title: "Custom Door Design",
      description: "Work with our master artisans to design a door that perfectly matches your architectural vision. From intricate carvings to modern minimalism, we bring your ideas to life.",
      icon: Hammer,
      features: ["3D Rendering", "Wood Selection", "Hardware Consultation"]
    },
    {
      title: "Professional Installation",
      description: "Our certified installation team ensures your premium doors are fitted perfectly, guaranteeing optimal insulation, smooth operation, and structural integrity.",
      icon: Wrench,
      features: ["Frame Alignment", "Weather Stripping", "Hardware Fitting"]
    },
    {
      title: "Polishing & Finishing",
      description: "Restore or enhance the natural beauty of your wooden doors with our premium polishing services. We use high-end sealants and stains for long-lasting protection.",
      icon: PaintBucket,
      features: ["PU Coating", "Melamine Polish", "Natural Oil Finish"]
    },
    {
      title: "Maintenance & Care",
      description: "Protect your investment with our comprehensive maintenance packages. We handle termite treatments, moisture protection, and hardware servicing.",
      icon: ShieldCheck,
      features: ["Termite Proofing", "Squeak Removal", "Annual Inspection"]
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Our Premium <span className="text-primary">Services</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Beyond manufacturing, we offer a comprehensive suite of services to ensure your wooden masterpieces remain flawless for generations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-card border border-border p-8 md:p-10 rounded-sm shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                <service.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold font-heading text-foreground mb-4">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {service.description}
              </p>
              <div className="space-y-3 mb-8">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-bold tracking-wider text-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </div>
                ))}
              </div>
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm hover:text-foreground transition-colors"
              >
                Book Service
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 bg-foreground text-background p-12 rounded-sm text-center max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/10" />
          <div className="relative z-10">
            <h2 className="text-3xl font-heading font-bold text-black mb-6">Need a Custom Solution?</h2>
            <p className="text-black/80 text-lg mb-8 max-w-2xl mx-auto">
              Our experts are ready to discuss your unique project requirements and provide a tailored consultation.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-widest rounded-sm hover:bg-primary/90 transition-all hover:scale-105 shadow-lg"
            >
              Contact Our Experts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
