import React from "react";

function TestimonialSection() {
  return (
    <section className="testimonial-section bg-grey padding">
      <div className="bg-shape white"></div>
      <div className="container">
        <div
          className="section-heading mb-30 text-center wow fadeInUp"
          data-wow-delay="200ms"
        >
          <h4>Testimonials</h4>
          <h2>
            Our Customers <span>Reviews</span>
          </h2>
        </div>
        <div className="nav-outside">
          <div className="testimonial-carousel swiper-container nav-visible">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="testimonial-item">
                  <div className="testi-thumb">
                    <img src="assets/imgs/test-img.png" alt="img" />
                    <div className="author">
                      <h3>Mitali Das</h3>
                      <ul className="ratting">
                        <li>
                          <i className="las la-star"></i>
                        </li>
                        <li>
                          <i className="las la-star"></i>
                        </li>
                        <li>
                          <i className="las la-star"></i>
                        </li>
                        <li>
                          <i className="las la-star"></i>
                        </li>
                        <li>
                          <i className="las la-star"></i>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <p>
                    {" "}
                    Jhatka mutton served by JhatkaByte is an excellent quality
                    product. This is one of the rare tasted food that I have
                    ever had.
                  </p>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="testimonial-item">
                  <div className="testi-thumb">
                    <img src="assets/imgs/test-img.png" alt="img" />
                    <div className="author">
                      <h3>Ratan Haldar</h3>
                      <ul className="ratting">
                        <li>
                          <i className="las la-star"></i>
                        </li>
                        <li>
                          <i className="las la-star"></i>
                        </li>
                        <li>
                          <i className="las la-star"></i>
                        </li>
                        <li>
                          <i className="las la-star"></i>
                        </li>
                        <li>
                          <i className="las la-star"></i>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <p>
                    {" "}
                    Its a fabulous country side goat meat served by JhatkaByte.
                    The best part is no preservative and locally produced goats.
                    The quality and taste of goat meat is unparallel.
                  </p>
                </div>
              </div>
            </div>
            <div className="dl-slider-controls style-2">
              <div className="dl-slider-button-prev">
                <i className="las la-arrow-left"></i>
              </div>
              <div className="dl-swiper-pagination"></div>
              <div className="dl-slider-button-next">
                <i className="las la-arrow-right"></i>
              </div>
            </div>
            <div className="carousel-preloader">
              <div className="dot-flashing"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialSection;
