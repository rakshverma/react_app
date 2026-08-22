import React from "react";
import { Link } from "react-router-dom";

function BannerSection() {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-img wow fadeInRight" data-wow-delay="400ms">
          <img src="assets/imgs/raw-mutton.png" alt="raw-chicken" />
          <div className="sale">
            <div>
              <h4>Get Up To</h4>
              <h2>
                <span>10%</span>Off Now
              </h2>
            </div>
          </div>
        </div>
        <div className="hero-content wow fadeInLeft" data-wow-delay="200ms">
          <h3>Best Quality Products</h3>
          <h1>
            Black Bengal Fresh <span>Jhatka Mutton</span> in Kolkata
          </h1>
          <ul className="hero-list">
            <li>
              <i className="fas fa-check"></i>No Preservatives
            </li>
            <li>
              <i className="fas fa-check"></i>100% Fresh
            </li>
            <li>
              <i className="fas fa-check"></i>Fast Delivery
            </li>
          </ul>
          <p>
            We are currently serving at the below locations on everyday basis.
            Orders gets closed by previous day 11.00 PM. For placing repeat
            orders without re-entering delivery address, please create your
            Login by clicking “My Account”{" "}
          </p>
          <Link to={"/products"} className="default-btn">
            <i className="fas fa-shopping-cart"></i>Order Now
            <span></span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default BannerSection;
