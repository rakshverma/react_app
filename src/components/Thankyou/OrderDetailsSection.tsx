import React from "react";
import { uploadUrl } from "../../utils/axios";

const getReceiptUrl = (receiptUrl: string) => {
  if (!receiptUrl) return "";
  return `${uploadUrl}${receiptUrl.replace(/^\/?uploads\/?/, "")}`;
};

function OrderDetailsSection({ orderList }: any) {
  const details = () => {
    if (orderList.length) {
      const { total_price, shipping_address, billing_address, landmark, shipping_cost } =
        orderList[0];
      const receiptUrl = getReceiptUrl(orderList[0].receipt_url);
      return (
        <>
          {receiptUrl && (
            <div className="mb-3 text-end">
              <a className="default-btn" href={receiptUrl} target="_blank" rel="noreferrer">
                View Invoice <span></span>
              </a>
            </div>
          )}
          <table className="table">
            <thead>
              <tr>
                <th className="text-start">Product</th>
                <th className="text-end">Delivery Date</th>
                <th className="text-end">Total</th>
              </tr>
            </thead>

            <tbody>
              {orderList[0].itemList.map((item: any, i: number) => {
                const {
                  product_id,
                  name,
                  quantity,
                  price,
                  unit,
                  count,
                  delivery_date,
                } = item;
                return (
                  <tr key={`ord_itm_${i}`}>
                    <td className="text-start">
                      <a href="shop-details.html">{name}</a>
                      <p className="mb-0">
                        weight: {`${quantity}${unit}`} x {count}
                      </p>
                    </td>
                    <td className="text-end">{delivery_date}</td>
                    <td className="text-end">₹{(Number(price) * Number(count)).toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>

            <tfoot>
              <tr>
                <td className="text-start">Subtotal:</td>
                <td></td>
                <td className="text-end">₹{(Number(total_price) - Number(shipping_cost)).toFixed(2)}</td>
              </tr>
              <tr>
                <td className="text-start">
                  Shipping: <small>(via Home Delivery) </small>
                </td>
                <td></td>
                <td className="text-end"> ₹{Number(shipping_cost) > 0 ? Number(shipping_cost).toFixed(2) : Number(shipping_cost)}</td>
              </tr>
              <tr>
                <td className="text-start text-dark fw-bold">Total:</td>
                <td></td>
                <td className="text-end text-dark fw-bold">
                  ₹{Number(total_price).toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
          <div className="row">
            <div className="col-md-6">
              <h2>Shipping Address</h2>
              <p>{shipping_address}</p>
              <p>Landmark: {landmark}</p>
            </div>
            <div className="col-md-6">
              <h2>Billing Address</h2>
              <p>{billing_address}</p>
            </div>
          </div>
        </>
      );
    } else return null;
  };

  return (
    <div className="col-lg-8 sm-padding">
      <form action="#" className="checkout-form-wrap">
        <h2>Order Details</h2>
        {details()}
      </form>
    </div>
  );
}

export default OrderDetailsSection;
