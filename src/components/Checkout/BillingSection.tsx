import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { loginUserAction } from "../../store/actions/loginAction";
import Input from "../Input";
import { LoginFormData } from "../../types";

function BillingSection({
  userInfo,
  formData,
  updateFormData,
  cartDetails,
  submitOrderDetails,
  orderErrors,
  orderDeliveryDates,
  updateorderDeliveryDate,
  uniqueProducts,
  shippingCost,
  cartError,
  accountError,
  isPlacingOrder,
  isCreatingAccount,
  isOrderPlaced,
}: any) {
  const {
    name,
    email,
    phone,
    state,
    district,
    landmark,
    street,
    pincode,
    additionalNote,
    password,
    confPassword,
    secretCode,
  } = formData;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const [isShowLogin, setIsShowLogin] = useState(false);

  const onSubmit = (data: any) => {
    console.log(data);
    dispatch(loginUserAction(data));
  };

  return (
    <div className="col-lg-8 sm-padding">
      {Object.keys(userInfo).length === 0 && (
        <div
          className="checkout-form-wrap"
          style={{ marginBottom: 10, padding: 20 }}
        >
          Returning customer?{" "}
          <span onClick={() => setIsShowLogin(!isShowLogin)}>
            <span style={{ color: "red", cursor: "pointer" }}>Click here</span>{" "}
            to login
          </span>
          {isShowLogin && (
            <>
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="form-horizontal"
              >
                <div className="contact-form-group">
                  <div className="form-field full-w">
                    <Input
                      type={"text"}
                      name={"email"}
                      placeholder={"Email Address"}
                      className={"form-control"}
                      register={register}
                      validationObj={{
                        required: "Please enter your email",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      }}
                      error={errors?.email || null}
                    />
                  </div>
                  <div className="form-field full-w">
                    <Input
                      type={"password"}
                      name={"password"}
                      placeholder={"Password"}
                      className={"form-control"}
                      register={register}
                      validationObj={{
                        required: "Please enter your password",
                        minLength: {
                          value: 6,
                          message: "Password should be minimum 6 characters",
                        },
                        maxLength: {
                          value: 30,
                          message: "Password should be max 30 chars",
                        },
                      }}
                      error={errors?.password || null}
                    />
                  </div>
                  <div className="form-field full-w d-grid">
                    <button type="submit" className="default-btn text-center">
                      Sign In
                    </button>
                  </div>
                </div>
              </form>
              <div id="form-messages" className="alert" role="alert"></div>
            </>
          )}
        </div>
      )}

      <form onSubmit={submitOrderDetails}>
        {Object.keys(userInfo).length === 0 && (
          <div className="checkout-form-wrap checkout-account-create mb-10 pb-1">
            <h2>Create Account To Place Order</h2>
            <p className="checkout-account-note">
              Add a password and secret code first. Your order will be placed right after the account is created.
            </p>
            <div className="checkout-form">
              <div className="form-field">
                <input
                  type="password"
                  name="password"
                  value={password || ""}
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => updateFormData("password", e.target.value)}
                />
                {orderErrors.password && <p style={{ color: "red" }}>{orderErrors.password}</p>}
              </div>
              <div className="form-field">
                <input
                  type="password"
                  name="confPassword"
                  value={confPassword || ""}
                  className="form-control"
                  placeholder="Confirm Password"
                  onChange={(e) => updateFormData("confPassword", e.target.value)}
                />
                {orderErrors.confPassword && <p style={{ color: "red" }}>{orderErrors.confPassword}</p>}
              </div>
              <div className="form-field full-w">
                <input
                  type="text"
                  name="secretCode"
                  value={secretCode || ""}
                  className="form-control"
                  placeholder="Your Secret Code"
                  onChange={(e) => updateFormData("secretCode", e.target.value)}
                />
                {orderErrors.secretCode && <p style={{ color: "red" }}>{orderErrors.secretCode}</p>}
              </div>
            </div>
            {accountError && <p style={{ color: "red" }}>{accountError}</p>}
          </div>
        )}
        <div className="checkout-form-wrap mb-10 pb-1">
          <h2>Billing Details</h2>
          <div className="checkout-form">
            <div className="form-field">
              <input
                type="text"
                id="firstname"
                name="name"
                value={name || ""}
                className="form-control"
                placeholder="Name"
                onChange={(e) => {
                  updateFormData("name", e.target.value);
                }}
              />
              {orderErrors.name && (
                <p style={{ color: "red" }}>{orderErrors.name}</p>
              )}
            </div>
            <div className="form-field">
              <input
                type="text"
                id="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={email || ""}
                disabled={userInfo?.email ? true : false}
                onChange={(e) => {
                  updateFormData("email", e.target.value);
                }}
              />
              {orderErrors.email && (
                <p style={{ color: "red" }}>{orderErrors.email}</p>
              )}
            </div>
            <div className="form-field">
              <input
                type="text"
                id="phone"
                name="phone"
                className="form-control"
                placeholder="Phone"
                value={phone}
                onChange={(e) => {
                  updateFormData("phone", e.target.value);
                }}
              />
              {orderErrors.phone && (
                <p style={{ color: "red" }}>{orderErrors.phone}</p>
              )}
            </div>
            <div className="form-field">
              <input
                type="text"
                id="state"
                name="state"
                value={state}
                className="form-control"
                placeholder="State"
                disabled={true}
                onChange={(e) => {
                  updateFormData("state", e.target.value);
                }}
              />
              {orderErrors.state && (
                <p style={{ color: "red" }}>{orderErrors.state}</p>
              )}
            </div>
            <div className="form-field">
              <input
                type="text"
                id="district"
                name="district"
                className="form-control"
                placeholder="District"
                value={district}
                onChange={(e) => {
                  updateFormData("district", e.target.value);
                }}
              />
              {orderErrors.district && (
                <p style={{ color: "red" }}>{orderErrors.district}</p>
              )}
            </div>
            <div className="form-field">
              <input
                type="text"
                id="street"
                name="street"
                className="form-control"
                placeholder="Street"
                value={street}
                onChange={(e) => {
                  updateFormData("street", e.target.value);
                }}
              />
              {orderErrors.street && (
                <p style={{ color: "red" }}>{orderErrors.street}</p>
              )}
            </div>
            <div className="form-field">
              <input
                type="text"
                id="pinCode"
                name="pincode"
                className="form-control"
                placeholder="Post Code"
                value={pincode || ""}
                disabled={true}
                onChange={(e) => {
                  updateFormData("pincode", e.target.value);
                }}
              />
              {orderErrors.pincode && (
                <p style={{ color: "red" }}>{orderErrors.pincode}</p>
              )}
            </div>

            <div className="form-field">
              <input
                type="text"
                id="landmark"
                name="landmark"
                className="form-control"
                placeholder="Nearest Landmark"
                value={landmark}
                onChange={(e) => {
                  updateFormData("landmark", e.target.value);
                }}
              />
              {orderErrors.landmark && (
                <p style={{ color: "red" }}>{orderErrors.landmark}</p>
              )}
            </div>
          </div>
          <div className="additional-info" style={{ marginTop: 20 }}>
            <div className="form-field">
              <textarea
                id="message"
                name="additionalNote"
                cols={30}
                rows={3}
                className="form-control"
                placeholder="Order Notes"
                value={additionalNote}
                onChange={(e) => {
                  updateFormData("additionalNote", e.target.value);
                }}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="checkout-form-wrap mb-10">
          <h2>Select Delivery Date</h2>
          <table className="table cart-total mb-0">
            <tbody>
              {uniqueProducts.map((item: any, i: number) => {
                return (
                  <tr key={`picker_row_${i}`}>
                    <td className="text-start ps-3">
                      <span className="text-dark">{item.name}</span>
                    </td>
                    <td className="pe-3 text-dark">{item.quantity}{item.unit} x {item.count}</td>
                  </tr>
                );
              })}
              <tr>
                <td className="text-start ps-3">
                  <span className="text-dark">Delivery Date</span>
                </td>
                <td className="pe-3 text-dark">
                  <div className="form-field">
                    <EnabledDatePicker
                      products={uniqueProducts}
                      onDateChange={(date: any) => {
                        updateorderDeliveryDate("order", date);
                      }}
                    />
                  </div>
                </td>
              </tr>
              {orderErrors.deliveryDate && (
                <p style={{ color: "red" }}>{orderErrors.deliveryDate}</p>
              )}
            </tbody>
          </table>
        </div>
        <div className="checkout-form-wrap mb-10">
          <div className="payment-method">
            <h2>Payment Method</h2>
            <ul className="mb-20">
              <li>
                <input
                  type="radio"
                  id="option-3"
                  name="selector"
                  checked
                  onChange={() => {}}
                />
                <label>Scan QR on Delivery / Pay By Cash</label>
              </li>
            </ul>
            <p>
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our <a href="#">privacy policy</a> .
            </p>
            {cartError && <p style={{ color: "red" }}>{cartError}</p>}
            <button type="submit" className="default-btn" disabled={isCreatingAccount || isPlacingOrder || isOrderPlaced}>
              {isCreatingAccount ? "Creating Account..." : isPlacingOrder ? "Processing..." : isOrderPlaced ? "Order Placed" : "Place Your Order"} <span></span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function EnabledDatePicker({
  products,
  onDateChange,
}: any) {
  const filterDates = (date: any, deliveryDayLists: any) => {
    const day = date.toLocaleString("en-US", { weekday: "long" });
    const configuredDeliveryDays = deliveryDayLists.filter((deliveryDay: string[]) => deliveryDay.length > 0);
    if (!configuredDeliveryDays.length) return true;
    return configuredDeliveryDays.some((deliveryDay: string[]) => deliveryDay.includes(day));
  };
  const parseDeliveryDay = (deliveryDay: any) => {
    try {
      return JSON.parse(deliveryDay);
    } catch (error) {
      return [];
    }
  };
  const deliveryDayKey = products.map((item: any) => `${item.productId}:${item.delevery_days || ""}`).join("|");
  const daysToEnable = useMemo(() => products.map((item: any) => parseDeliveryDay(item.delevery_days)), [deliveryDayKey]);
  const [firstEnabledDate, setFirstEnabledDate] = useState<any>(null);
  let today = new Date();
  let minDate = today.setDate(today.getDate() + 1);
  useEffect(() => {
    onDateChange("");
    setFirstEnabledDate(null);
  }, [deliveryDayKey]);

  return (
    <DatePicker
      selected={firstEnabledDate}
      onChange={(date) => {
        onDateChange(date);
        setFirstEnabledDate(date);
      }}
      filterDate={(date) => filterDates(date, daysToEnable)}
      minDate={new Date(minDate)}
      dateFormat="dd/MM/yyyy"
      customInput={
        <input
          type="text"
          id="deliveryDate"
          name="deliveryDay"
          className="form-control"
          placeholder="Delivery date"
          readOnly={true}
        />
      }
    />
  );
}

export default BillingSection;
