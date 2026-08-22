import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

function DeliverySection() {
  return (
    <section className="content-section delivery">
      <div className="bg-shape white"></div>
      <div className="bg-shape grey"></div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 wow fadeInLeft" data-wow-delay="200ms">
            <div className="content-info">
              <h2>
                A Moments Of Delivered <br /> On <span>Right Time</span> &amp;
                Place
              </h2>
              <p>
                We are currently serving at the below locations on everyday
                basis. Orders gets closed by previous day 11.00 PM. For placing
                repeat orders without re-entering delivery address, please
                create your Login by clicking “My Account”
              </p>
              <div className="order-content">
                <Link to={"/products"} className="default-btn">
                  Order Now <span></span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="delivery-boy-wrap">
              <div className="delivery-boy simple-parallax-initialized deliveryImage"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DeliverySection;
