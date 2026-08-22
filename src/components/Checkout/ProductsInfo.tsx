import React from "react";

function ProductsInfo({ cartDetails, shippingCost, orderDeliveryDates }: any) {
  let subTotal = 0;
  let calculateShipping = 0;
  if (cartDetails.length) {
    cartDetails.forEach((item: any) => {
      subTotal += Number(item.price) * Number(item.count);
    });
  }
  if(Object.keys(orderDeliveryDates).length > 0) {
    let temp: any = [];
    Object.keys(orderDeliveryDates).forEach((item: any) => {
      if(!temp.includes(orderDeliveryDates[item])) {
        calculateShipping += shippingCost;
        temp.push(orderDeliveryDates[item]);
      }
    })
  }
  return (
    <div className="col-lg-4 sm-padding">
      {cartDetails.length > 0 && (
        <table className="table cart-total mb-0">
          <thead>
            <tr>
              <th className="text-start ps-3">Product</th>
              <th>Quantity</th>
              <th className="pe-3">Price</th>
            </tr>
          </thead>
          <tbody>
            {cartDetails.map((item: any, index: number) => {
              return (
                <tr key={`cart_product_${index}`}>
                  <td className="text-start ps-3">
                    <span className="text-dark">{item.name}</span>
                    <br />
                    <span className="small">
                      Weight : {item.quantity}
                      {item.unit}
                    </span>{" "}
                  </td>
                  <td>{item.count}</td>
                  <td className="pe-3 text-dark">
                ₹{(Number(item.price) * Number(item.count)).toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <ul className="cart-total p-4">
        <li>
          <span>Subtotal:</span>₹{subTotal.toFixed(2)}
        </li>
        <li>
          <span>Shipping:</span>₹{calculateShipping > 0 ? calculateShipping.toFixed(2) : calculateShipping}
        </li>
        <li>
          <span>Total:</span>₹{(subTotal + calculateShipping).toFixed(2)}
        </li>
      </ul>
    </div>
  );
}

export default ProductsInfo;
