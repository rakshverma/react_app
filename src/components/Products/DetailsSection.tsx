import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCartItemAction } from "../../store/actions/cartAction";
import StarRatingReadOnly from "../Shared/StarRatingReadOnly";

function DetailsSection({
  productDetails,
  reviewCount,
  productWeights,
  deliveryDays,
  shippingCost,
}: any) {
  const dispatch = useDispatch();
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [quantityCount, setQuantityCount] = useState<any>(1);
  const [error, setError] = useState("");

  const handleAddToCart = () => {
    const cartItem = {
      productId: productDetails.id,
      franchiseId: productDetails.franchise_id,
      details: productWeights[selectedQuantity],
      count: quantityCount,
    };
    dispatch(setCartItemAction(cartItem));
  };
  const getOptions = () => {
    const options = [];
    for (let i = 1; i <= 20; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };
  console.log("productDetails = ", productDetails);
  return (
    <div className="col-md-6 sm-padding my-auto">
      {productDetails && (
        <div className="product-details">
          <div className="product-info">
            <div className="product-inner">
              <ul className="category">
                <li>{productDetails.category_name}</li>
              </ul>
              <StarRatingReadOnly rating={0} />
              <ul className="ratting">
                <li>
                  <a href="#" className="ps-2">
                    {" "}
                    {`(${reviewCount} reviews)`}
                  </a>{" "}
                </li>
              </ul>
            </div>
            <h2>{productDetails.name}</h2>
            <h4 className="price">
              {productWeights?.length > 0 ? (
                <>
                  {`₹${productWeights[selectedQuantity].price}`}
                  {/* <span className="reguler">₹820.00</span> */}
                </>
              ) : null}{" "}
              {productDetails.is_available == 1 &&
              productDetails.status &&
              productWeights !== null ? (
                <span>(In Stock)</span>
              ) : (
                <span style={{ color: "red" }}>(Out of Stock)</span>
              )}
            </h4>
            <p>{productDetails.description}</p>
            {productWeights?.length > 0 && (
              <>
                <div className="mb-3 d-md-flex">
                  <div className="my-auto me-2" style={{ fontWeight: "bold" }}>
                    Weight -{" "}
                  </div>
                  {productWeights.map((item: any, index: number) => {
                    return (
                      <div
                        className="myradio"
                        key={`quantity_${index}`}
                        onClick={(e) => setSelectedQuantity(index)}
                      >
                        <input
                          type="radio"
                          name="selectedQuantity"
                          id="one"
                          className="myradio__input"
                          checked={index === selectedQuantity}
                          onChange={(e) => setSelectedQuantity(index)}
                          value={selectedQuantity}
                        />
                        <label className="myradio__label">
                          {item.quantity}
                          {item.unit}
                        </label>
                      </div>
                    );
                  })}
                </div>
                <p>
                  <span style={{ fontWeight: "bold" }}>Delivery Days -</span>{" "}
                  {deliveryDays && deliveryDays.join(", ")}
                </p>
              </>
            )}
            {productWeights?.length > 0 && (
              <h3 className="mb-4">
                ₹{productWeights[selectedQuantity].price}{" "}
                <span className="fs-6 fw-light ps-2">
                  for {productWeights[selectedQuantity].quantity}
                  {productWeights[selectedQuantity].unit}
                </span>
                <span className="fs-6 fw-light ps-2">
                  (shipping cost: ₹
                  {shippingCost > 0 ? shippingCost.toFixed(2) : 0})
                </span>
              </h3>
            )}
            {productDetails.is_available == 1 &&
              productDetails?.status &&
              productWeights?.length > 0 && (
                <div className="product-btn">
                  <form>
                    <select
                      name="quantityCount"
                      onChange={(e: any) => {
                        setQuantityCount(e.target.value);
                      }}
                    >
                      {getOptions()}
                    </select>
                  </form>
                  <div>
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="purchase-btn"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailsSection;
