import React from "react";
import { Link } from "react-router-dom";

function AboutSection() {
  return (
    <section className="about-section padding">
      <div className="bg-shape grey"></div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 wow fadeInLeft" data-wow-delay="200ms">
            <div id="gallery-videos-demo" className="content-img-holder">
              <img src="assets/imgs/about.png" alt="img" />
            </div>
          </div>
          <div className="col-md-6 wow fadeInRight" data-wow-delay="400ms">
            <div className="about-info">
              <h2 className="mb-20">
                Best Quality Meats <br /> <span>No Preservatives!</span>
              </h2>
              <p>
                JhatkaByte is a Bengal-based E-commerce (Registered No:
                0917P169223529, FSSAI Lic: 12822014000043) for home delivery of
                Jhatka mutton of Black Bengal variety and also ‘Deshi chicken’.
              </p>
              <p>
                Jhatka is an ancient India’s meat processing technique for
                Sanatani believers. We are certified by Jhatka Certification
                Authority pioneered by Shri Ravi Ranjan Singh ji. Our
                registration number 721301JCA/2022/JB-1/1/167A.
              </p>
              <p>
                JhatkaByte aims to establish itself as a distribution chain to
                connect agricultural producers with end consumers within the
                same locality with just-in-time mode of home delivery. We are
                firmly founded on Local Production, Local Consumption, No
                Preservative.
              </p>
              <p className="fst-italic">
                <span className="text-decoration-underline">DISCLAIMER:</span>{" "}
                We are unable to serve the individual choice for sina/frontal
                rang/leg piece of mutton. We follow a uniform distribution
                ensuring fairness of choice for every customer.
              </p>
              <Link to={"/products"} className="default-btn">
                Order Now <span></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
