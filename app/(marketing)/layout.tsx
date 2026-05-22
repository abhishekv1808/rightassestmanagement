import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MarketTickerStrip from "@/components/widgets/MarketTickerStrip";
import WhatsAppButton from "@/components/widgets/WhatsAppButton";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";
import CookieConsent from "@/components/ui/CookieConsent";
import ExitIntentPopup from "@/components/ui/ExitIntentPopup";
import StickyMobileCTA from "@/components/ui/StickyMobileCTA";
import SocialProofTicker from "@/components/ui/SocialProofTicker";

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
      <CookieConsent />
      {/* Conversion & engagement layer */}
      <ExitIntentPopup />
      <StickyMobileCTA />
      <SocialProofTicker />
    </div>
  );
}
