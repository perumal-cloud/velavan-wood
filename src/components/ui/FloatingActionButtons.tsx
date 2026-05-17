"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function FloatingActionButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const pathname = usePathname();

  // Handle scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  // Handle scroll visibility for the button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Replace this with the actual WhatsApp number
  const whatsappNumber = "919876543210"; 
  const whatsappMessage = encodeURIComponent("Hello! I'm interested in your premium wooden doors.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-4">
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.5 }}
            onClick={scrollToTop}
            className="w-12 h-12 bg-card border border-border shadow-lg rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors z-50"
            aria-label="Scroll to top"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] shadow-lg rounded-full flex items-center justify-center text-white hover:bg-[#1EBE5D] hover:scale-110 transition-all z-50"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={32} />
      </Link>
    </div>
  );
}
