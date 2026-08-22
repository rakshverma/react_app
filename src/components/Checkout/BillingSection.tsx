import React, { useEffect, useState } from "react";
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
    deliveryDay,
    additionalNote,
  } = formData;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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
                disabled={district ? true : false}
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
          {Object.keys(userInfo).length === 0 && (
            <ul className="mt-20 mb-20">
              <li>
                <input
                  type="checkbox"
                  id="option-3"
                  name="selector"
                  checked
                  disabled
                  onChange={() => {}}
                />
                <label style={{ marginLeft: 10 }}>Create an account</label>
              </li>
            </ul>
          )}
        </div>
        <div className="checkout-form-wrap mb-10">
          <h2>Select Delivery Dates</h2>
          <table className="table cart-total mb-0">
            <tbody>
              {uniqueProducts.map((item: any, i: number) => {
                return (
                  <tr key={`picker_row_${i}`}>
                    <td className="text-start ps-3">
                      <span className="text-dark">{item.name}</span>
                    </td>
                    <td className="pe-3 text-dark">
                      <div className="form-field">
                        <EnabledDatePicker
                          deliveryDay={item.delevery_days}
                          productId={item.productId}
                          onDateChange={(date: any) => {
                            console.log("FIRSTTIME DATE ID = ", item.productId);
                            console.log("FIRSTTIME DATE DATE = ", date);
                            updateorderDeliveryDate(item.productId, date);
                          }}
                          orderDeliveryDates={orderDeliveryDates}
                          key={`picker_${item.productId}`}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
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
            <button type="submit" className="default-btn">
              Place Your Order <span></span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function EnabledDatePicker({
  deliveryDay,
  productId,
  onDateChange,
  orderDeliveryDates,
}: any) {
  const filterDates = (date: any, deliveryDay: any) => {
    // Disable dates that are not Monday, Wednesday, or Friday
    const day = date.toLocaleString("en-US", { weekday: "long" });
    return deliveryDay.includes(day);
  };
  const parseDeliveryDay = (deliveryDay: any) => {
    try {
      return JSON.parse(deliveryDay);
    } catch (error) {
      return [];
    }
  };
  const daysToEnable = parseDeliveryDay(deliveryDay);
  const [firstEnabledDate, setFirstEnabledDate] = useState<any>(null);
  let today = new Date();
  let minDate = today.setDate(today.getDate() + 1);
  useEffect(() => {
    let currentDate = new Date(today);
    while (!filterDates(currentDate, daysToEnable) && daysToEnable.length) {
      currentDate.setDate(currentDate.getDate() + 1);
    }
    // onDateChange(currentDate);
    // setFirstEnabledDate(currentDate);
    onDateChange("");
    setFirstEnabledDate("");
  }, [deliveryDay]);

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
          id={productId}
          defaultValue={firstEnabledDate}
          name="deliveryDay"
          className="form-control"
          placeholder="Day of Week for delivery"
          readOnly={true}
        />
      }
    />
  );
}

export default BillingSection;
