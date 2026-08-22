import React from "react";
import HeadingSection from "../Shared/HeadingSection";
import ContactFormSection from "./ContactFormSection";
import FranchiseListSection from "./FranchiseListSection";

function ContactUsView() {
  return (
    <>
      <HeadingSection heading={"Contact Us"} />
      <ContactFormSection />
      {/* <FranchiseListSection /> */}
    </>
  );
}

export default ContactUsView;
