import HeroSection from "@/components/Sections/Client/Home/HeroSection";
import LatestProductsSection from "@/components/Sections/Client/Home/LatestProductsSection";
import OccasionsSection from "@/components/Sections/Client/Home/OccasionsSection";
import PackageBannerSection from "@/components/Sections/Client/Home/PackageBannerSection";
import ServicesSection from "@/components/Sections/Client/Home/ServicesSection";
import React from "react";

const ClientHomepage = () => {
  return (
    <div className="space-y-4 md:space-y-10 pb-10">
      <HeroSection />
      {/* <ExpressDeliverySection /> */}
      <OccasionsSection />
      <ServicesSection />
      <PackageBannerSection />
      <LatestProductsSection />
    </div>
  );
};

export default ClientHomepage;
