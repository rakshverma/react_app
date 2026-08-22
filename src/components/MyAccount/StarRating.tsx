import React, { useState } from "react";

function StarRating(props: any) {
  const [selectedStars, setSelectedStars] = useState(0);
  const [review, setReview] = useState("");
  const [error, setError] = useState("");
  const maxStars = 5;

  const onSubmit = () => {
    if (!selectedStars || !review) {
      setError("Please select star & add review");
      return;
    }
    props.submitReview(selectedStars, review, props.pid);
    setSelectedStars(0);
    setReview("");
  };

  return (
    <>
      <div className="col-md-2">
        <div className="form-group comment-author">
          <label>Your Rating</label>
          <ul className="ratting">
            {Array.from({ length: maxStars }).map((_, index) => (
              <li
                key={index}
                onClick={() => setSelectedStars(index + 1)}
                style={{ paddingRight: 6 }}
              >
                <i
                  className={`las la la-star${
                    index < selectedStars ? "" : "-o"
                  }`}
                  style={{ cursor: "pointer" }}
                ></i>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="col-md-4">
        <div className="form-group mb-0">
          <textarea
            className="form-control"
            rows={2}
            onChange={(e: any) => setReview(e.target.value)}
            value={review}
          ></textarea>
        </div>
      </div>
      <div className="col-md-12 text-end">
        <p
          style={{
            color: "red",
            fontSize: 13,
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          {error}
        </p>
        <button type="button" className="btn-primary" onClick={onSubmit}>
          Submit
        </button>
        <hr />
      </div>
    </>
  );
}

export default StarRating;
