import React from "react";

function FranchiseListSection() {
  return (
    <section className="branches-section bg-grey pt-0 padding">
      <div className="bg-shape white"></div>
      <div className="container">
        <div className="contact-details-wrap">
          <div className="contact-title">
            <h2>
              List of Franchises<span></span>
            </h2>
          </div>
        </div>
        <div className="row branches-lists">
          <div className="col-lg-3 col-sm-6 sm-padding">
            <div className="branches-list">
              <h3>North Kolkata</h3>
              <ul>
                <li>1 Epping Road</li>
                <li>North Ryde, NSW 2113</li>
                <li>
                  <a href="#">+61 2 9870 7689</a>
                </li>
                <li>
                  <a href="#">email@example.com</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 sm-padding">
            <div className="branches-list">
              <h3>South Kolkata</h3>
              <ul>
                <li>1 Epping Road</li>
                <li>North Ryde, NSW 2113</li>
                <li>
                  <a href="#">+61 2 9870 7689</a>
                </li>
                <li>
                  <a href="#">email@example.com</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 sm-padding">
            <div className="branches-list">
              <h3>Howrah</h3>
              <ul>
                <li>1 Epping Road</li>
                <li>North Ryde, NSW 2113</li>
                <li>
                  <a href="#">+61 2 9870 7689</a>
                </li>
                <li>
                  <a href="#">email@example.com</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 sm-padding">
            <div className="branches-list">
              <h3>Krishnanagar</h3>
              <ul>
                <li>1 Epping Road</li>
                <li>North Ryde, NSW 2113</li>
                <li>
                  <a href="#">+61 2 9870 7689</a>
                </li>
                <li>
                  <a href="#">email@example.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FranchiseListSection;
