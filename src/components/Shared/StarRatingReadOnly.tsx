import React from "react";

function StarRatingReadOnly({ rating }: any) {
  const show = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <li key={`star_${i}`}>
          <i className={`las la la-star${i < rating ? "" : "-o"}`}></i>
        </li>
      );
    }
    return stars;
  };

  return <ul className="ratting">{show()}</ul>;
}

export default StarRatingReadOnly;
