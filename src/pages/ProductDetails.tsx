import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HeadingSection from "../components/Shared/HeadingSection";
import ImageSection from "../components/Products/ImageSection";
import DetailsSection from "../components/Products/DetailsSection";
import DescriptionSection from "../components/Products/DescriptionSection";
import {
  getAllProductsAction,
  getReviewsOnProductAction,
} from "../store/actions/productAction";

import { resetCartStatus } from "../store/actions/cartAction";

function ProductDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, shippingCost } = useSelector((state: any) => state.cart);
  const { productList, productReview } = useSelector(
    (state: any) => state.product
  );
  const { productId } = useParams();
  console.log("isSuccess = ", isSuccess);

  useEffect(() => {
    return () => {
      console.log("UNMOUNT CALLED");
      dispatch(resetCartStatus());
    };
  }, []);

  useEffect(() => {
    if (isSuccess) navigate("/cart");
  }, [isSuccess]);

  useEffect(() => {
    if (!productList.length) {
      const pinCode = localStorage.getItem("pincode");
      dispatch(getAllProductsAction(pinCode));
    }
  }, [dispatch, productList]);

  useEffect(() => {
    dispatch(getReviewsOnProductAction(productId));
  }, [dispatch, productId]);

  const productDetails = productList.find((item: any) => item.id == productId);
  const productWeights = productDetails?.quantity_wise_price
    ? JSON.parse(productDetails.quantity_wise_price)
    : null;
  const deliveryDays = productDetails?.delevery_days
    ? JSON.parse(productDetails.delevery_days)
    : null;
  return (
    <>
      <HeadingSection heading={productDetails?.name || "Product Details"} />
      <section className="food-details bg-grey pt-80">
        <div className="container">
          <div className="row mt-5">
            <ImageSection productDetails={productDetails} />
            <DetailsSection
              productDetails={productDetails}
              reviewCount={productReview.length}
              productWeights={productWeights}
              deliveryDays={deliveryDays}
              shippingCost={shippingCost}
            />
          </div>
          <DescriptionSection
            productDetails={productDetails}
            productReview={productReview}
          />
        </div>
      </section>
    </>
  );
}

export default ProductDetails;
