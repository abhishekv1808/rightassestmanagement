import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MarketTickerStrip from "@/components/widgets/MarketTickerStrip";
import WhatsAppButton from "@/components/widgets/WhatsAppButton";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Root LocalBusiness JSON-LD — present on every marketing page */}
      <LocalBusinessSchema />
      <Navbar />
      <MarketTickerStrip />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
