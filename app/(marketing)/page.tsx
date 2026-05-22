import Hero from "@/components/sections/Hero";
import ImageGallerySlider from "@/components/sections/ImageGallerySlider";
import MutualFundTicker from "@/components/sections/MutualFundTicker";
import ServicesGrid from "@/components/sections/ServicesGrid";
import StatsBar from "@/components/sections/StatsBar";
import WhyRightAsset from "@/components/sections/WhyRightAsset";
import AllServicesSection from "@/components/sections/AllServicesSection";
import ToolsTeaser from "@/components/sections/ToolsTeaser";
import Testimonials from "@/components/sections/Testimonials";
import CTASection from "@/components/sections/CTASection";
import MarketOverviewCard from "@/components/widgets/MarketOverviewCard";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MutualFundTicker />
      <ServicesGrid />
      <StatsBar />
      <WhyRightAsset />
      <ImageGallerySlider />
      <AllServicesSection />
      <section className="py-14 lg:py-20" style={{ backgroundColor: "#EEF2F8" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-1.5" style={{ color: "#C9A84C" }}>
                Live Market Data
              </p>
              <h2 className="font-heading font-bold text-2xl lg:text-3xl" style={{ color: "#1B3A6B" }}>
                Indian Markets at a Glance
              </h2>
              <p className="text-sm text-gray-500 mt-1.5 max-w-lg">
                Real-time NIFTY, SENSEX, BANK NIFTY &amp; MIDCAP indices alongside top NSE stocks — all in one view.
              </p>
            </div>
          </div>
          <MarketOverviewCard />
        </div>
      </section>
      <ToolsTeaser />
      <Testimonials />
      <CTASection />
    </>
  );
}
