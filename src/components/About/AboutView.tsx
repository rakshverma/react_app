import React from "react";
import HeadingSection from "../Shared/HeadingSection";
import AboutSection from "../Shared/AboutSection";
import DeliverySection from "../Shared/DeliverySection";

function AboutView() {
  return (
    <>
      <HeadingSection heading={"About Us"} />
      <AboutSection />
      <DeliverySection />
    </>
  );
}

export default AboutView;
