"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Image as ImageIcon,
  MessageSquare,
  Users,
  LogOut,
  Menu,
  X,
  FileText
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        router.push("/admin/login");
      } else {
        // Fallback if API fails
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push("/admin/login");
      }
    } catch (e) {
      console.error("Logout failed", e);
      router.push("/admin/login");
    }
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
    { icon: Package, label: "Products", href: "/admin/products" },
    { icon: ImageIcon, label: "Gallery", href: "/admin/gallery" },
    { icon: MessageSquare, label: "Enquiries", href: "/admin/enquiries" },
    { icon: FileText, label: "Blogs", href: "/admin/blogs" },
    { icon: Users, label: "Testimonials", href: "/admin/testimonials" },
  ];

  const getPageTitle = () => {
    const segments = pathname.split("/").filter(Boolean);
    const section = segments[1]; // e.g. "dashboard", "products", "blogs"
    const sub = segments[2];     // e.g. "new", an ID
    const titles: Record<string, string> = {
      dashboard: "Dashboard",
      products: sub === "new" ? "Add New Product" : sub ? "Edit Product" : "Products",
      gallery: sub === "new" ? "Add Gallery Image" : "Gallery",
      enquiries: "Enquiries",
      blogs: sub === "new" ? "New Blog Post" : sub ? "Edit Blog Post" : "Blog Posts",
      testimonials: "Testimonials",
    };
    return titles[section] ?? section ?? "Admin";
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-20"
          } transition-all duration-300 bg-card border-r border-border flex flex-col`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          {sidebarOpen && (
            <span className="font-bold text-primary truncate">Admin Panel</span>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-primary/10 rounded-sm text-foreground transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 py-4">
          <ul className="space-y-2 px-2">
            {menuItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-4 px-3 py-3 rounded-sm transition-colors ${isActive
                      ? "bg-primary text-primary-foreground font-bold"
                      : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                      }`}
                  >
                    <item.icon size={20} className="shrink-0" />
                    {sidebarOpen && <span>{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-3 py-3 w-full text-left text-white cursor-pointer hover:bg-destructive/10 rounded-sm transition-colors"
          >
            <LogOut size={20} className="shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 flex items-center justify-between px-8 bg-card border-b border-border">
          <h2 className="font-bold text-xl text-foreground">
            {getPageTitle()}
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              A
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-8 bg-background">
          {children}
        </div>
      </main>
    </div>
  );
}
