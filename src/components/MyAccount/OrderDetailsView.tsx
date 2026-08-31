import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Link, useLocation } from "react-router-dom";
import { uploadUrl } from "../../utils/axios";

const getReceiptUrl = (receiptUrl: string) => {
  if (!receiptUrl) return "";
  return `${uploadUrl}${receiptUrl.replace(/^\/?uploads\/?/, "")}`;
};

function OrderDetailsView() {
  const { orderList } = useSelector((state: any) => state.order);
  const location = useLocation();
  const searchParams = new URLSearchParams(location?.search);
  const refId = searchParams.get("ref");
  console.log("refId = ", refId);
  let product: any = [];
  if (orderList.length && refId) {
    product = orderList.filter((obj: any) => Number(obj.id) + 1000 === Number(refId));
  }

  const details = () => {
    if (product.length > 0) {
      const {
        name,
        inserted_at,
        updated_at,
        total_price,
        status,
        receipt_url,
      } = product[0];
      const receiptUrl = getReceiptUrl(receipt_url);
      return (
        <div className="row">
          <div className="col-md-6">
            <h2 className="border-bottom">Order Status</h2>
            {status === 1 && (
              <p className="text-success">
                <i className="las la-check-circle la-lg"></i> Confirmed -
                {moment(inserted_at).format("DD/MM/YYYY")}
              </p>
            )}
            {status === 2 && (
              <p className="text-info">
                <i className="las la la-clock-o la-lg"></i> Completed -
                {moment(updated_at).format("DD/MM/YYYY")}
              </p>
            )}
            {status === 3 && (
              <p className="text-danger">
                <i className="las la la-clock-o la-lg"></i> Canceled -
                {moment(updated_at).format("DD/MM/YYYY")}
              </p>
            )}
          </div>
          <div className="col-md-6">
            <h2 className="border-bottom">Details</h2>
            <p>
              Name - <samp className="text-muted">{name}</samp> <br /> Order
              Date -{" "}
              <samp className="text-muted">
                {moment(inserted_at).format("MMMM D, YYYY")}
              </samp>{" "}
              <br /> Total -{" "}
              <samp className="text-muted">₹{`${Number(total_price).toFixed(2)}`}</samp>{" "}
              <br /> Payment Method -{" "}
              <samp className="text-muted">
                Scan QR on Delivery / Pay By Cash
              </samp>{" "}
              {receiptUrl && (
                <>
                  <br /> Invoice -{" "}
                  <a href={receiptUrl} target="_blank" rel="noreferrer">
                    View Invoice
                  </a>
                </>
              )}
            </p>
          </div>
        </div>
      );
    } else return null;
  };

  const products = () => {
    if (product.length) {
      const { total_price, shipping_cost } =
        product[0];

      return (
        <>
          <h2 className="border-bottom">Orders</h2>
          <table className="table my-account-orders-table">
            <thead>
              <tr>
                <th className="text-start">Product</th>
                <th className="text-center">Delivery Date</th>
                <th className="text-center">Delivery Status</th>
                <th className="text-end">Total</th>
              </tr>
            </thead>

            <tbody>
              {product[0].itemList.map((item: any, i: number) => {
                const {
                  name,
                  quantity,
                  price,
                  unit,
                  count,
                  delivery_date,
                  product_id,
                  delivery_status,
                } = item;
                let status = "";
                if (delivery_status === 1) status = "Processing";
                if (delivery_status === 2) status = "On the way";
                if (delivery_status === 3) status = "Delivered";
                if (delivery_status === 4) status = "canceled";
                return (
                  <tr key={`ord_itm_${i}`}>
                    <td className="text-start" data-label="Product" style={{ flexDirection: "row" }}>
                      <div>
                        <Link to={`/product/details/${product_id}`}>
                          {name}
                        </Link>
                        <p className="mb-0">
                          weight: {`${quantity}${unit}`} x {count}
                        </p>
                      </div>
                    </td>
                    <td className="text-center" data-label="Delivery Date">{delivery_date}</td>
                    <td className="text-center" data-label="Delivery Status">{status}</td>
                    <td className="text-end" data-label="Total">₹{(Number(price) * Number(count)).toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>

            <tfoot>
              <tr>
                <td className="text-start" data-label="Subtotal">Subtotal:</td>
                <td></td>
                <td></td>
                <td className="text-end" data-label="Subtotal">
                  ₹{(Number(total_price) - Number(shipping_cost)).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className="text-start" data-label="Shipping">
                  Shipping: <small>(via Home Delivery) </small>
                </td>
                <td></td>
                <td></td>
                <td className="text-end" data-label="Shipping">
                  {" "}
                  ₹
                  {Number(shipping_cost) > 0 ? Number(shipping_cost).toFixed(2) : Number(shipping_cost)}
                </td>
              </tr>
              <tr>
                <td className="text-start text-dark fw-bold" data-label="Total">Total:</td>
                <td></td>
                <td></td>
                <td className="text-end text-dark fw-bold" data-label="Total">
                  ₹{Number(total_price).toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </>
      );
    } else return null;
  };

  return (
    <div className="col-md-9">
      <div className="checkout-form-wrap py-4">
        {refId ? (
          <>
            {details()}
            {products()}
          </>
        ) : null}
      </div>
    </div>
  );
}

export default OrderDetailsView;
