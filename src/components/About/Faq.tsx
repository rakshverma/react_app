import React from "react";

function Faq() {
  return (
    <section className="branches-section bg-grey padding">
      <div className="bg-shape white"></div>
      <div className="container">
        <div className="contact-details-wrap">
          <div className="contact-title">
            <h2>
              Help and Faq's<span></span>
            </h2>
          </div>
        </div>
        <div className="row branches-lists">
          <div className="col-lg-12 col-sm-12 sm-padding">
            <div className="accordion faq-accordion" id="faq-accordion">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    What is Jhatka?{" "}
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#faq-accordion"
                >
                  <div className="accordion-body">
                    <p>
                      Ancient India’s meat processing technique rendering
                      minimum possible pain to the animal which is still being
                      practised by country side villagers.
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    What if individual consumers have any preference on leg
                    piece, dabhna, sina?
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#faq-accordion"
                >
                  <div className="accordion-body">
                    <p>
                      We follow uniformity in distribution of this kind of
                      choice across all the consumers.
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    {" "}
                    What all areas are getting served presently for home
                    delivery?{" "}
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#faq-accordion"
                >
                  <div className="accordion-body">
                    <p>
                      Krishnanagar (Nadia), Kharagpur (Paschim Medinipur) and
                      South Kolkata: Garia – Santoshpur – Jadavpur – Kasba-Garia
                      Hat – Tollygunge
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFour">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    {" "}
                    What is the source of procurement in Kolkata?
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFour"
                  data-bs-parent="#faq-accordion"
                >
                  <div className="accordion-body">
                    <p>
                      Gopal Patha which is a renowned meat shop who is serving
                      Jhatka meat in Central Kolkata for past 80 years.
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFive">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFive"
                    aria-expanded="false"
                    aria-controls="collapseFive"
                  >
                    {" "}
                    What is the source of procurement in Krishnanagar?
                  </button>
                </h2>
                <div
                  id="collapseFive"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFive"
                  data-bs-parent="#faq-accordion"
                >
                  <div className="accordion-body">
                    <p>
                      Jhatka meat shop run by villagers of Bhandar khola,
                      Ghurni, Doier Bazar, Chitta Shali etc.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Faq;
