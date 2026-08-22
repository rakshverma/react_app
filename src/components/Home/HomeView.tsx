import React from "react";
import BannerSection from "./BannerSection";
import AboutSection from "../Shared/AboutSection";
import BestSellerSection from "./BestSellerSection";
import DeliverySection from "../Shared/DeliverySection";
import TestimonialSection from "./TestimonialSection";

function HomeView() {
  return (
    <>
      <BannerSection />
      <AboutSection />
      {/* <BestSellerSection /> */}
      <DeliverySection />
      <TestimonialSection />
    </>
  );
}

export default HomeView;
