"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Loader2, Mail, Phone, MapPin, Clock } from "lucide-react";

// Using the same API schema we created for Enquiries
const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Please provide more details"),
  productInterest: z.string().optional(),
  budget: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Adding default values for standard contact form submission
      const payload = {
        ...data,
        productInterest: data.productInterest || "General Inquiry",
        budget: data.budget || "Not Specified"
      };
      
      const response = await axios.post("/api/enquiries", payload);
      if (response.data.success) {
        toast.success("Message sent successfully! We'll be in touch.");
        reset();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Whether you have a question about our products, pricing, or custom designs, our team is ready to answer all your questions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-24">
          {/* Contact Details */}
          <div className="space-y-8">
            <h3 className="text-3xl font-heading font-bold text-foreground mb-8">Contact Information</h3>
            
            <div className="flex gap-6 items-start">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                <MapPin size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-foreground mb-2">Our Headquarters</h4>
                <p className="text-muted-foreground leading-relaxed">
                  123 Woodcrafter's Lane<br />
                  Design District<br />
                  New York, NY 10001
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                <Phone size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-foreground mb-2">Phone</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Sales: +1 (555) 123-4567<br />
                  Support: +1 (555) 123-4568
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                <Mail size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-foreground mb-2">Email</h4>
                <p className="text-muted-foreground leading-relaxed">
                  info@velavanwood.com<br />
                  support@velavanwood.com
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                <Clock size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-foreground mb-2">Business Hours</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Monday - Saturday: 9:00 AM - 6:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card border border-border p-8 rounded-sm shadow-xl"
          >
            <h3 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Full Name</label>
                <input
                  {...register("name")}
                  className="w-full bg-background border border-border px-4 py-3 rounded-sm focus:outline-none focus:border-primary transition-colors text-foreground"
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Phone Number</label>
                  <input
                    {...register("phone")}
                    className="w-full bg-background border border-border px-4 py-3 rounded-sm focus:outline-none focus:border-primary transition-colors text-foreground"
                    placeholder="+1 234 567 8900"
                  />
                  {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>}
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
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Your Message</label>
                <textarea
                  {...register("message")}
                  rows={5}
                  className="w-full bg-background border border-border px-4 py-3 rounded-sm focus:outline-none focus:border-primary transition-colors text-foreground resize-none"
                  placeholder="How can we help you today?"
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
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Google Maps Placeholder */}
        <div className="w-full h-96 bg-muted rounded-sm flex items-center justify-center border border-border relative overflow-hidden group">
          <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center gap-4 group-hover:bg-background/90 transition-colors z-10">
            <MapPin size={48} className="text-primary" />
            <span className="font-heading font-bold text-xl">Google Maps Embed Location</span>
          </div>
        </div>
      </div>
    </div>
  );
}
