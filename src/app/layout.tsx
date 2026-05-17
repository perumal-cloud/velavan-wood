import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Velavan Wooden Doors | Premium Luxury Wooden Doors",
  description: "Experience premium craftsmanship with Velavan Wooden Doors. We specialize in luxury wooden doors, custom designs, and high-end interior solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1e150d',
              color: '#f5efe6',
              border: '1px solid #ca8e3e40'
            },
            success: {
              iconTheme: {
                primary: '#ca8e3e',
                secondary: '#1e150d',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
