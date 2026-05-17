import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import FloatingActionButtons from "../../components/ui/FloatingActionButtons";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-screen">
        {children}
      </main>
      <Footer />
      <FloatingActionButtons />
    </>
  );
}
