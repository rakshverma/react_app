import React from "react";

function HeadingSection({ heading }: any) {
  return (
    <section className="page-header">
      <div className="bg-shape grey"></div>
      <div className="container">
        <div className="page-header-content">
          <h2>{heading}</h2>
        </div>
      </div>
    </section>
  );
}

export default HeadingSection;
