"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Loader2, Mail, Phone, MapPin } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number required"),
  email: z.string().email("Invalid email address"),
  productInterest: z.string().min(1, "Please select an interest"),
  budget: z.string().min(1, "Please select a budget range"),
  message: z.string().min(10, "Please provide more details"),
});

type FormValues = z.infer<typeof formSchema>;

export default function QuotePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/enquiries", data);
      if (response.data.success) {
        toast.success("Quote request submitted successfully! We will contact you soon.");
        reset();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to submit request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Get a Custom <span className="text-primary">Quote</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Share your requirements with us, and our experts will craft the perfect solution for your space.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-card border border-border p-8 rounded-sm shadow-sm">
              <h3 className="text-2xl font-bold mb-6 text-primary">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Visit Our Showroom</h4>
                    <p className="text-muted-foreground mt-1">123 Woodcrafter's Lane, Design District, NY 10001</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Call Us</h4>
                    <p className="text-muted-foreground mt-1">+1 (555) 123-4567<br/>Mon-Sat, 9AM to 6PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Email Us</h4>
                    <p className="text-muted-foreground mt-1">info@velavanwood.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quote Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 bg-card border border-border p-8 md:p-10 rounded-sm shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Full Name</label>
                  <input
                    {...register("name")}
                    className="w-full bg-background border border-border px-4 py-3 rounded-sm focus:outline-none focus:border-primary transition-colors text-foreground"
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Phone Number</label>
                  <input
                    {...register("phone")}
                    className="w-full bg-background border border-border px-4 py-3 rounded-sm focus:outline-none focus:border-primary transition-colors text-foreground"
                    placeholder="+1 234 567 8900"
                  />
                  {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Email Address</label>
                <input
                  {...register("email")}
                  className="w-full bg-background border border-border px-4 py-3 rounded-sm focus:outline-none focus:border-primary transition-colors text-foreground"
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Product Interest</label>
                  <select
                    {...register("productInterest")}
                    className="w-full bg-background border border-border px-4 py-3 rounded-sm focus:outline-none focus:border-primary transition-colors text-foreground appearance-none"
                  >
                    <option value="">Select a category</option>
                    <option value="Main Entrance Doors">Main Entrance Doors</option>
                    <option value="Bedroom Doors">Bedroom Doors</option>
                    <option value="Carved Doors">Carved Doors</option>
                    <option value="Custom Design">Custom Design</option>
                  </select>
                  {errors.productInterest && <p className="text-destructive text-sm mt-1">{errors.productInterest.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Estimated Budget</label>
                  <select
                    {...register("budget")}
                    className="w-full bg-background border border-border px-4 py-3 rounded-sm focus:outline-none focus:border-primary transition-colors text-foreground appearance-none"
                  >
                    <option value="">Select range</option>
                    <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                    <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                    <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                    <option value="$10,000+">$10,000+</option>
                  </select>
                  {errors.budget && <p className="text-destructive text-sm mt-1">{errors.budget.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Project Details</label>
                <textarea
                  {...register("message")}
                  rows={5}
                  className="w-full bg-background border border-border px-4 py-3 rounded-sm focus:outline-none focus:border-primary transition-colors text-foreground resize-none"
                  placeholder="Tell us about your requirements, dimensions, wood preference, etc."
                />
                {errors.message && <p className="text-destructive text-sm mt-1">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-primary text-primary-foreground font-bold uppercase tracking-widest rounded-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Submitting...
                  </>
                ) : (
                  "Submit Quote Request"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
