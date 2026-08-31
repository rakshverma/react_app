import React from "react";

function ContactFormSection() {
  return (
    <section className="contact-section bg-grey pb-5 padding">
      <div className="map"></div>
      <div className="container">
        <div className="row align-items-center mt-5">
          <div className="col-md-6">
            <div className="contact-details-wrap">
              <div className="contact-title">
                <h2>
                  Do You Have Any Questions? <span></span>
                </h2>
                <p>
                  Get in touch to discuss your employee wellbeing needs today.{" "}
                  <br /> Please give us a call or drop us an email.
                </p>
              </div>
              <ul className="contact-details">
                <li>
                  <i className="fas fa-map-marker-alt"></i>Shanti Bazar,
                  Barrackpur, <br /> West Bengal 700120
                </li>
                <li>
                  <i className="fas fa-envelope"></i>jhatkabyte@gmail.com
                </li>
                <li>
                  <i className="fas fa-phone"></i>+91 6289560934 <br />
                  +91 9239031756 <br />
                  +91 89619 94324 <br />
                  +91 79083 87963 (Bardhaman)
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-6">
            <div className="contact-form">
              <form
                action="#"
                method="post"
                id="ajax_contact"
                className="form-horizontal"
              >
                <div className="contact-title">
                  <h2>
                    Request for Franchise <span></span>
                  </h2>
                </div>
                <div className="contact-form-group">
                  <div className="form-field">
                    <input
                      type="text"
                      id="firstname"
                      name="firstname"
                      className="form-control"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="form-field">
                    <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      className="form-control"
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="form-field">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-field">
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      className="form-control"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className="form-field message">
                    <textarea
                      id="message"
                      name="message"
                      cols={30}
                      rows={4}
                      className="form-control"
                      placeholder="Message"
                    ></textarea>
                  </div>
                  <div className="form-field">
                    <button id="submit" className="default-btn" type="submit">
                      Send Request<span></span>
                    </button>
                  </div>
                </div>
                <div id="form-messages" className="alert" role="alert"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactFormSection;
