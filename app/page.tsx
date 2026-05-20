import Hero from "@/components/sections/Hero";
import ServicesGrid from "@/components/sections/ServicesGrid";
import StatsBar from "@/components/sections/StatsBar";
import WhyRightAsset from "@/components/sections/WhyRightAsset";
import FeaturedServices from "@/components/sections/FeaturedServices";
import ToolsTeaser from "@/components/sections/ToolsTeaser";
import Testimonials from "@/components/sections/Testimonials";
import CTASection from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <StatsBar />
      <WhyRightAsset />
      <FeaturedServices />
      <ToolsTeaser />
      <Testimonials />
      <CTASection />
    </>
  );
}
