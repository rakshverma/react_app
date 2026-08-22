import React from "react";

function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-top">
        <div className="footer-illustration"></div>
        <div className="running-cycle">
          <div></div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-sm-6 sm-padding">
              <div className="footer-widget">
                <a className="logo" href="#">
                  <img src="assets/imgs/jhatkabyte-logo.png" alt="img" />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 sm-padding">
              <div className="footer-widget">
                <h3>
                  Contact Info <span></span>
                </h3>
                <ul className="contact-info-list">
                  <li>info@jhatkabyte.com</li>
                  <li>
                    Flat no 4E, Ramas Garden, Sanjoal, near Oil Mill, Kharagpur
                    721301
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 sm-padding">
              <div className="footer-widget ml-25">
                <h3>
                  <span></span>
                </h3>
                <ul className="opening-hours-list">
                  <li>+91 89619 94324</li>
                  <li>Orders gets closed by previous day 11.00 PM</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-sm-6 sm-padding">
              <div className="footer-widget">
                <h3>
                  <span></span>
                </h3>
                <ul className="footer-social">
                  <li>
                    <a href="#">
                      <i className="fab fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-pinterest"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="copyright-wrap">
            <p>
              Copyright © <span id="currentYear"></span> JhatkaByte. All Rights
              Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
