import React, { useRef, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import { uploadUrl } from "../../utils/axios";

const images = [
  {
    original: "assets/imgs/pro-5.jpg",
    thumbnail: "assets/imgs/pro-5.jpg",
  },
  {
    original: "assets/imgs/pro-1.jpg",
    thumbnail: "assets/imgs/pro-1.jpg",
  },
  {
    original: "assets/imgs/pro-2.jpg",
    thumbnail: "assets/imgs/pro-2.jpg",
  },
];

const getProductImage = (data: string) => {
  try {
    const images = JSON.parse(data);
    if (images && images.length) {
      return (
        <img
          src={`${uploadUrl}${images[0]}`}
          alt="food"
          crossOrigin="anonymous"
          style={{ width: 500, height: 440 }}
        />
      );
    } else return null;
  } catch (e) {
    return null;
  }
};

function ImageSection({ productDetails }: any) {
  return (
    <div className="col-md-6 sm-padding product-details-wrap">
      <div className="demo">
        {/* <ImageGallery items={images} /> */}
        {/* <ul id="lightSlider">
          <li data-thumb="assets/imgs/pro-5.jpg">
            <img src="assets/imgs/pro-5.jpg" alt="" />
          </li>
          <li data-thumb="assets/imgs/pro-1.jpg">
            <img src="assets/imgs/pro-1.jpg" alt="" />
          </li>
          <li data-thumb="assets/imgs/pro-2.jpg">
            <img src="assets/imgs/pro-2.jpg" alt="" />
          </li>
          <li data-thumb="assets/imgs/pro-3.jpg">
            <img src="assets/imgs/pro-3.jpg" alt="" />
          </li>
          <li data-thumb="assets/imgs/pro-4.jpg">
            <img src="assets/imgs/pro-4.jpg" alt="" />
          </li>
        </ul> */}
        {getProductImage(productDetails?.images)}
      </div>
    </div>
  );
}

export default ImageSection;
