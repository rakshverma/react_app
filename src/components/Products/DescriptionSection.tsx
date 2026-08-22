import React from "react";
import moment from "moment";

function DescriptionSection({ productDetails, productReview }: any) {
  return (
    <section className="product-description bg-grey pt-5 padding">
      <div className="container">
        <ul
          className="nav tab-navigation"
          id="product-tab-navigation"
          role="tablist"
        >
          <li role="presentation">
            <button
              className="active"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home"
              type="button"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              Description
            </button>
          </li>
          <li role="presentation">
            <button
              id="contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#contact"
              type="button"
              role="tab"
              aria-controls="contact"
              aria-selected="false"
            >
              Reviews ({productReview.length})
            </button>
          </li>
        </ul>
        <div className="tab-content" id="product-tab-content">
          <div
            className="tab-pane fade show active description"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <p>{productDetails?.description}</p>
          </div>
          <div
            className="tab-pane fade review"
            id="contact"
            role="tabpanel"
            aria-labelledby="contact-tab"
          >
            <ul className="comment-list">
              {productReview.map((item: any) => {
                let stars = (
                  <li>
                    <i className="las la-star"></i>
                  </li>
                );
                if (item.stars === 1)
                  stars = (
                    <li>
                      <i className="las la-star"></i>
                    </li>
                  );
                if (item.stars === 2)
                  stars = (
                    <>
                      <li>
                        <i className="las la-star"></i>
                      </li>
                      <li>
                        <i className="las la-star"></i>
                      </li>
                    </>
                  );
                if (item.stars === 3)
                  stars = (
                    <>
                      <li>
                        <i className="las la-star"></i>
                      </li>
                      <li>
                        <i className="las la-star"></i>
                      </li>
                      <li>
                        <i className="las la-star"></i>
                      </li>
                    </>
                  );
                if (item.stars === 4)
                  stars = (
                    <>
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
                    </>
                  );
                if (item.stars === 5)
                  stars = (
                    <>
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
                    </>
                  );
                return (
                  <li>
                    <div className="comment-thumb">
                      <img src="assets/imgs/test-img.png" alt="img" />
                    </div>
                    <div className="comment-text">
                      <div className="comment-author">
                        <h3>
                          <span>
                            {moment(item.inserted_at).format("MMM Do YYYY")}
                          </span>
                          {item.name}
                        </h3>
                        <ul className="ratting">
                          {stars}
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
                      <p>{item.message}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-shape white"></div>
    </section>
  );
}

export default DescriptionSection;
