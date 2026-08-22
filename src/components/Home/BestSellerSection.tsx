import React from "react";

function BestSellerSection() {
  return (
    <section className="food-menu bg-grey padding">
      <div className="container">
        <div className="heading-wrap">
          <div className="section-heading mb-30">
            <h4>Popular Products</h4>
            <h2>
              Best Selling <span>Products</span>
            </h2>
          </div>
          <div>
            <a href="products.html" className="default-btn">
              <i className="fas fa-shopping-cart"></i>Shop Now
              <span></span>
            </a>
          </div>
        </div>
        <div className="nav-outside">
          <div className="food-carousel swiper-container nav-visible">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="product-item">
                  <div className="sale">-5%</div>
                  <div className="product-thumb">
                    <img src="assets/imgs/food01.png" alt="food" />
                    <div>
                      <a href="shop-details.html" className="order-btn">
                        Order Now
                      </a>
                    </div>
                  </div>
                  <div className="food-info">
                    <ul className="ratting">
                      <li>Mutton</li>
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
                    <h3>Black Bengal Kochi Khasi</h3>
                    <div className="price">
                      <h4>
                        ₹779.00 <span className="reguler">₹820.00</span>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="product-item">
                  <div className="product-thumb">
                    <img src="assets/imgs/food02.png" alt="food" />
                    <div>
                      <a href="shop-details.html" className="order-btn">
                        Order Now
                      </a>
                    </div>
                  </div>
                  <div className="food-info">
                    <ul className="ratting">
                      <li>Chicken</li>
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
                    <h3>Deshi Chicken (unskined)</h3>
                    <div className="price">
                      <h4>₹490.00</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="product-item">
                  <div className="product-thumb">
                    <img src="assets/imgs/food03.png" alt="food" />
                    <div>
                      <a href="shop-details.html" className="order-btn">
                        Order Now
                      </a>
                    </div>
                  </div>
                  <div className="food-info">
                    <ul className="ratting">
                      <li>Mutton</li>
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
                    <h3>Mutton Liver</h3>
                    <div className="price">
                      <h4>₹220.00</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="product-item">
                  <div className="product-thumb">
                    <img src="assets/imgs/food04.png" alt="food" />
                    <div>
                      <a href="shop-details.html" className="order-btn">
                        Order Now
                      </a>
                    </div>
                  </div>
                  <div className="food-info">
                    <ul className="ratting">
                      <li>Mutton</li>
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
                    <h3>Rewaji Khasi</h3>
                    <div className="price">
                      <h4>₹800.00</h4>
                    </div>
                  </div>
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

export default BestSellerSection;
