import Link from "next/link";
import { MessageCircle, MapPin, Phone, Mail, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background pt-20 pb-10 border-t-4 border-primary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-sm bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                V
              </div>
              <span className="font-heading font-bold text-2xl tracking-wide uppercase text-primary">
                Velavan Wood
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Crafting premium luxury wooden doors since 1998. We bring elegance, durability, and masterful craftsmanship to your doorstep.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <MessageCircle size={20} />
              </a>
              {/* <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter size={20} />
              </a> */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold uppercase tracking-wider mb-6 text-primary border-b border-background/10 pb-4 inline-block w-full">Quick Links</h4>
            <ul className="space-y-3">
              {['About Us', 'Our Products', 'Gallery', 'Services', 'Testimonials', 'Contact'].map((item) => {
                // நீங்கள் கேட்டபடி குறிப்பிட்ட வார்த்தைகளுக்கு மட்டும் URL பாத்-ஐ மாற்றியமைக்கிறோம்
                const pathMap: { [key: string]: string } = {
                  'About Us': '/about',
                  'Our Products': '/products',
                  'Gallery': '/gallery',
                  'Services': '/services',
                  'Testimonials': '/testimonials',
                  'Contact': '/contact'
                };

                return (
                  <li key={item}>
                    <Link
                      href={pathMap[item]}
                      className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                    >
                      <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-bold uppercase tracking-wider mb-6 text-primary border-b border-background/10 pb-4 inline-block w-full">Categories</h4>
            <ul className="space-y-3">
              {['Teak Wood Doors', 'Designer Doors', 'Main Entrance Doors', 'Carved Doors', 'Bedroom Doors', 'Custom Doors'].map((item) => (
                <li key={item}>
                  <Link href={`/products?category=${item.toLowerCase().replace(' ', '-')}`} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                    <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold uppercase tracking-wider mb-6 text-primary border-b border-background/10 pb-4 inline-block w-full">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 text-muted-foreground">
                <MapPin className="text-primary shrink-0 mt-1" size={20} />
                <span>123 Woodcrafter's Lane, Design District, NY 10001</span>
              </li>
              <li className="flex items-center gap-4 text-muted-foreground">
                <Phone className="text-primary shrink-0" size={20} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-4 text-muted-foreground">
                <Mail className="text-primary shrink-0" size={20} />
                <span>info@velavanwood.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Velavan Wooden Doors. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
