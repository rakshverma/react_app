import React from "react";
import { Link } from "react-router-dom";
import { uploadUrl } from "../../utils/axios";

const getProductImage = (data: string) => {
  try {
    const images = JSON.parse(data);
    if (images.length) {
      return (
        <img
          src={`${uploadUrl}${images[0]}`}
          alt="food"
          crossOrigin="anonymous"
        />
      );
    } else return null;
  } catch (e) {
    return null;
  }
};

function ProductListSection({ productList, filter }: any) {
  let list = [];
  if (filter != "All") {
    list = productList.filter((item: any) => item.category_name == filter);
  } else {
    list = productList.filter((item: any) => {
      const lowercaseName = item.name.toLowerCase();
      return (
        !lowercaseName.includes("pork") &&
        !lowercaseName.includes("ham") &&
        !lowercaseName.includes("bacon")
      );
    });
  }

  console.log("productList = ", list);
  return (
    <div className="row product-items">
      {list.map((item: any) => {
        let price = 0;
        let unit = "";
        if (item.quantity_wise_price) {
          let priceArray = JSON.parse(item.quantity_wise_price);
          price = parseInt(priceArray[0].price);
          unit = `${priceArray[0].quantity} ${priceArray[0].unit}`;
        }
        return (
          <div
            key={`product_list_${item.id}`}
            className={`col-lg-4 col-md-6 padding-15 isotop-grid ${item.category_name}_${item.category_id}`}
          >
            <Link to={`/product/details/${item.id}`}>
              <div className="product-item wow fadeInUp">
                {/* <div className="sale">-5%</div> */}
                <div className="product-thumb">
                  {getProductImage(item.images)}
                  <div>
                    <Link
                      to={`/product/details/${item.id}`}
                      className="order-btn"
                    >
                      {item.is_available == 0 ? "View Details" : "Order Now"}
                    </Link>
                  </div>
                </div>
                <div className="food-info">
                  <ul className="ratting">
                    <li>{item.category_name}</li>
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
                  <h3>{item.name}</h3>
                  <div className="price">
                    <h4>
                      {price > 0 ? `₹${price.toFixed(2)} / ${unit}` : ""}
                      {/* ₹779.00 <span className="reguler">₹820.00</span> */}
                      {item.is_available == 0 ? (
                        <span style={{ color: "red" }}>( out of stock )</span>
                      ) : null}
                    </h4>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default ProductListSection;
