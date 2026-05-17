"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("/api/projects");
        setProjects(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Our <span className="text-primary">Projects</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            A showcase of our successfully completed installations and custom interior designs.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="animate-spin text-primary" size={48} />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-24 bg-card border border-border rounded-sm">
            <p className="text-muted-foreground">No projects found. Please check back later.</p>
          </div>
        ) : (
          <div className="space-y-16">
            {projects.map((project: any, idx: number) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row gap-8 items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="w-full md:w-1/2 h-[400px] relative rounded-sm overflow-hidden shadow-xl">
                  {project.images && project.images[0] ? (
                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground">No Image Available</span>
                    </div>
                  )}
                </div>
                <div className="w-full md:w-1/2 space-y-4">
                  <h3 className="text-3xl font-heading font-bold text-foreground">{project.title}</h3>
                  <div className="w-16 h-1 bg-primary" />
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
