"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Gallery", href: "/gallery" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();

  // Navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm py-3"
        : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-sm bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg sm:text-xl transition-transform duration-300 hover:scale-105">
              V
            </div>

            <span className="font-heading font-bold text-base sm:text-lg lg:text-xl uppercase tracking-wide text-foreground whitespace-nowrap">
              Velavan Wood
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm uppercase tracking-wider transition-colors duration-300 hover:text-primary ${isActive
                    ? "text-primary font-semibold"
                    : "text-white"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <Link
              href="/quote"
              className="ml-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-semibold uppercase tracking-wider hover:bg-primary/90 transition-all duration-300 shadow-md"
            >
              Get a Quote
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            aria-label="Toggle Menu"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 h-screen w-[80%] sm:w-[60%] bg-background border-l border-border shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between p-5 border-b border-border">
                <span className="font-bold text-lg">Menu</span>

                <button onClick={() => setIsOpen(false)}>
                  <X size={28} />
                </button>
              </div>

              <div className="flex flex-col p-6 gap-5">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`text-base uppercase tracking-wider transition-colors duration-300 ${isActive
                        ? "text-primary font-semibold"
                        : "text-foreground"
                        }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}

                <Link
                  href="/quote"
                  className="mt-4 w-full text-center px-6 py-3 bg-primary text-primary-foreground rounded-md font-semibold uppercase tracking-wider hover:bg-primary/90 transition"
                >
                  Get a Quote
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}