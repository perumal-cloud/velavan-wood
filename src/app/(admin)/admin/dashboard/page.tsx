"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  MessageSquare,
  Image as ImageIcon,
  Users,
  FileText,
  TrendingUp,
  Clock,
  ArrowRight,
  Phone,
  Mail,
} from "lucide-react";

interface Stats {
  products: number;
  enquiries: number;
  blogs: number;
  gallery: number;
  testimonials: number;
}

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  productInterest?: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    products: 0,
    enquiries: 0,
    blogs: 0,
    gallery: 0,
    testimonials: 0,
  });
  const [recentEnquiries, setRecentEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        const json = await res.json();
        if (json.success) {
          setStats(json.data.counts);
          setRecentEnquiries(json.data.recentEnquiries);
        }
      } catch (err) {
        console.error("Failed to fetch stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Products",
      value: stats.products,
      icon: Package,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
      href: "/admin/products",
    },
    {
      title: "Enquiries",
      value: stats.enquiries,
      icon: MessageSquare,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
      href: "/admin/enquiries",
    },
    {
      title: "Blog Posts",
      value: stats.blogs,
      icon: FileText,
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
      href: "/admin/blogs",
    },
    {
      title: "Gallery Images",
      value: stats.gallery,
      icon: ImageIcon,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-200",
      href: "/admin/gallery",
    },
    {
      title: "Testimonials",
      value: stats.testimonials,
      icon: Users,
      color: "text-rose-600",
      bg: "bg-rose-50",
      border: "border-rose-200",
      href: "/admin/testimonials",
    },
  ];

  const quickActions = [
    { label: "Add Product", href: "/admin/products/new", icon: Package },
    { label: "New Blog Post", href: "/admin/blogs/new", icon: FileText },
    { label: "Upload Gallery", href: "/admin/gallery/new", icon: ImageIcon },
    { label: "Add Testimonial", href: "/admin/testimonials/new", icon: Users },
  ];

  return (
    <div className="space-y-8">

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((stat) => (
          <Link
            key={stat.title}
            href={stat.href}
            className={`bg-card border ${stat.border} p-5 rounded-lg shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow group`}
          >
            <div className={`w-10 h-10 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center`}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                {stat.title}
              </p>
              {loading ? (
                <div className="h-8 w-16 bg-muted animate-pulse rounded mt-1" />
              ) : (
                <h3 className="text-3xl font-bold text-foreground mt-1">
                  {stat.value}
                </h3>
              )}
            </div>
            <div className={`flex items-center gap-1 text-xs font-semibold ${stat.color} group-hover:gap-2 transition-all`}>
              Manage <ArrowRight size={12} />
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Enquiries */}
        <div className="lg:col-span-2 bg-card border border-border rounded-lg shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <MessageSquare size={16} className="text-blue-600" />
              Recent Enquiries
            </h3>
            <Link
              href="/admin/enquiries"
              className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="px-6 py-4 space-y-2 animate-pulse">
                  <div className="h-4 bg-muted rounded w-1/3" />
                  <div className="h-3 bg-muted rounded w-2/3" />
                </div>
              ))
            ) : recentEnquiries.length === 0 ? (
              <div className="px-6 py-10 text-center text-muted-foreground text-sm">
                No enquiries yet.
              </div>
            ) : (
              recentEnquiries.map((enq) => (
                <div key={enq._id} className="px-6 py-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-foreground text-sm">{enq.name}</p>
                      {enq.productInterest && (
                        <span className="inline-block text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full mt-1">
                          {enq.productInterest}
                        </span>
                      )}
                      <p className="text-muted-foreground text-xs mt-1 line-clamp-1">{enq.message}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0 ml-4">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock size={10} />
                        {new Date(enq.createdAt).toLocaleDateString("en-IN")}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-2">
                    <a href={`tel:${enq.phone}`} className="text-xs text-blue-600 flex items-center gap-1 hover:underline">
                      <Phone size={10} /> {enq.phone}
                    </a>
                    <a href={`mailto:${enq.email}`} className="text-xs text-blue-600 flex items-center gap-1 hover:underline">
                      <Mail size={10} /> {enq.email}
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card border border-border rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="font-bold text-foreground">Quick Actions</h3>
          </div>
          <div className="p-4 space-y-2">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-background border border-border hover:border-primary hover:bg-primary/5 transition-colors group"
              >
                <action.icon size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {action.label}
                </span>
                <ArrowRight size={14} className="ml-auto text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
