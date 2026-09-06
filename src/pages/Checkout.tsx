import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import HeadingSection from "../components/Shared/HeadingSection";
import BillingSection from "../components/Checkout/BillingSection";
import ProductsInfo from "../components/Checkout/ProductsInfo";
import {
  getCartDetailsAction,
  getDistrictOnPinCodeAction,
} from "../store/actions/cartAction";
import { getUserAddressListAction } from "../store/actions/userAction";
import {
  placeUserOrderAction,
  resetOrderStatusAction,
} from "../store/actions/orderAction";
import { getAllProductsAction } from "../store/actions/productAction";
import { uploadUrl } from "../utils/axios";
import { request } from "../utils/request";
import {
  SET_USER_INFO,
  SHOW_ERROR_MESSAGE,
  SHOW_SUCCESS_MESSAGE,
} from "../store/actionTypes";

const getReceiptUrl = (receipt: any) => {
  const url = receipt?.publicUrl || receipt?.receipt_url || receipt?.storagePath || "";
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  return `${uploadUrl}${`${url}`.replace(/^\/?uploads\/?/, "")}`;
};

const parsePriceRows = (value: any) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
};

const normalizeUnit = (unit: any) => {
  const normalized = `${unit || ""}`.trim().toLowerCase();
  if (["piece", "pieces", "piece(s)"].includes(normalized)) return "piece(s)";
  if (["plate", "plates", "plate(s)"].includes(normalized)) return "plate(s)";
  return normalized;
};

const getUnavailableCartItems = (cartDetails: any[], productList: any[]) => {
  return cartDetails.filter((cartItem: any) => {
    const product = productList.find((item: any) => `${item.id}` === `${cartItem.productId}`);
    if (!product || Number(product.is_available) !== 1 || `${product.franchise_id}` !== `${cartItem.franchiseId}`) return true;
    return !parsePriceRows(product.quantity_wise_price).some((priceRow: any) => {
      return (
        Number(priceRow.quantity) === Number(cartItem.quantity) &&
        normalizeUnit(priceRow.unit) === normalizeUnit(cartItem.unit) &&
        Number(priceRow.price) === Number(cartItem.price)
      );
    });
  });
};

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, district, addressList } = useSelector((state: any) => state.user);
  const { cartDetails, shippingCost } = useSelector((state: any) => state.cart);
  const { productList } = useSelector((state: any) => state.product);
  const { isSuccess, isError, orderDetails, isPlacingOrder, orderProgressStep } = useSelector(
    (state: any) => state.order
  );
  const pincode = localStorage.getItem("pincode");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "West Bengal",
    district: "",
    houseApartment: "",
    streetName: "",
    locality: "",
    city: "",
    street: "",
    landmark: "",
    pincode: pincode,
    deliveryDay: "",
    additionalNote: "",
    password: "",
    confPassword: "",
    secretCode: "",
  });
  const [orderDeliveryDates, setOrderDeliveryDates] = useState<any>({});
  const [orderErrors, setOrderErrors] = useState({});
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  const uniqueProducts = useMemo(
    () =>
      Object.values(
        cartDetails.reduce((acc: any, obj: any) => {
          acc[obj.productId] = obj;
          return acc;
        }, {})
      ),
    [cartDetails]
  );

  useEffect(() => {
    return () => {
      dispatch(resetOrderStatusAction());
    };
  }, []);

  const receiptUrl = getReceiptUrl(orderDetails?.receipt);

  useEffect(() => {
    if (district) {
      setFormData((state) => ({ ...state, district }));
    }
    if (Object.keys(userInfo).length > 0) {
      setFormData((state) => ({
        ...state,
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone_number,
        landmark: pincode === userInfo.pin_code ? userInfo.landmark : "",
        street: pincode === userInfo.pin_code ? userInfo.street : "",
        houseApartment: "",
        streetName: "",
        locality: "",
        city: pincode === userInfo.pin_code ? userInfo.district : "",
      }));
    } else {
      setFormData((state) => ({
        ...state,
        name: "",
        email: "",
        phone: "",
        houseApartment: "",
        streetName: "",
        locality: "",
        city: "",
        street: "",
        landmark: "",
        password: "",
        confPassword: "",
        secretCode: "",
      }));
    }
  }, [district, userInfo]);

  useEffect(() => {
    if (!cartDetails.length) {
      dispatch(getCartDetailsAction());
    }
    dispatch(getAllProductsAction(pincode));
    dispatch(getDistrictOnPinCodeAction(pincode));
  }, [dispatch, pincode]);

  useEffect(() => {
    if (Object.keys(userInfo).length > 0) {
      dispatch(getUserAddressListAction());
    }
  }, [dispatch, userInfo?.id]);

  const updateFormData = (name: string, value: string) => {
    setFormData((state: any) => {
      const nextState = { ...state, [name]: value };
      if (["houseApartment", "streetName", "locality"].includes(name)) {
        nextState.street = [nextState.houseApartment, nextState.streetName, nextState.locality].filter(Boolean).join(", ");
      }
      if (name === "city") nextState.district = value;
      return nextState;
    });
  };

  const selectSavedAddress = (address: any) => {
    setFormData((state: any) => ({
      ...state,
      name: address.recipient_name || state.name,
      phone: address.phone_number || state.phone,
      state: address.state || "West Bengal",
      district: address.district || "",
      houseApartment: address.house_apartment || "",
      streetName: address.street_name || "",
      locality: address.locality || "",
      city: address.city || address.district || "",
      street: address.street || [address.house_apartment, address.street_name, address.locality].filter(Boolean).join(", "),
      landmark: address.landmark || "",
      pincode: address.pin_code || pincode,
    }));
  };

  const formatDate = (date: any) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const updateorderDeliveryDate = (id: any, value: any) => {
    const formattedDate = value ? formatDate(value) : "";
    const nextDates: any = {};
    uniqueProducts.forEach((item: any) => {
      nextDates[item.productId] = formattedDate;
    });
    setOrderDeliveryDates((state: any) => ({
      ...state,
      ...nextDates,
    }));
  };

  const validateFormData = (formData: any, orderDeliveryDates: any) => {
    const errors: any = {};
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phoneNumberRegex = /^\d{10}$/;
    const pinRegex = /^\d{6}$/;
    const {
      name,
      email,
      phone,
      state,
      district,
      houseApartment,
      streetName,
      locality,
      city,
      street,
      landmark,
      pincode,
      deliveryDay,
      additionalNote,
      password,
      confPassword,
      secretCode,
    } = formData;
    if (!name) errors.name = "Please enter your name";
    if (!email) errors.email = "Please enter your email";
    if (email && !emailRegex.test(email))
      errors.email = "Please enter valid email";
    if (!phone) errors.phone = "Please enter your phone number";
    if (phone && !phoneNumberRegex.test(phone))
      errors.phone = "Please enter valid phone number";
    if (!state) errors.state = "Please select your state";
    if (!city && !district) errors.city = "Please enter your city";
    if (!houseApartment) errors.houseApartment = "Please enter house number and apartment name";
    if (!streetName) errors.streetName = "Please enter street name";
    if (!locality) errors.locality = "Please enter locality name";
    if (!street && (!houseApartment || !streetName || !locality)) errors.street = "Please complete your address";
    if (!pincode) errors.pincode = "Please enter your pincode";
    if (pincode && !pinRegex.test(pincode))
      errors.pincode = "Please enter valid pincode";
    if (Object.keys(userInfo).length === 0) {
      if (!password || password.length < 6) errors.password = "Password should be minimum 6 characters";
      if (!confPassword) errors.confPassword = "Please confirm your password";
      if (password && confPassword && password !== confPassword) errors.confPassword = "Passwords do not match";
      if (!secretCode || secretCode.trim().length < 4) errors.secretCode = "Secret code should be minimum 4 characters";
    }

    uniqueProducts.forEach((item: any) => {
      if (!orderDeliveryDates[item.productId]) {
        errors.deliveryDate = "Please select one delivery date for the order";
      }
    });

    const unavailableItems = getUnavailableCartItems(cartDetails, productList);
    if (unavailableItems.length) {
      errors.cart = `${unavailableItems.map((item: any) => item.name || "An item").join(", ")} is not available for your selected pincode. Please remove it from cart.`;
    }

    return errors;
  };

  const registerBeforeOrder = async () => {
    setIsCreatingAccount(true);
    try {
      const response = await request("post", "/auth/register", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        secretCode: formData.secretCode,
      });
      const user = response?.data?.data || {};
      localStorage.setItem("token", user.token || "");
      const { id, name, phone_number, email, status } = user;
      localStorage.setItem("userinfo", JSON.stringify({ id, name, phone_number, email, status }));
      dispatch({ type: SET_USER_INFO, payload: user });
      dispatch({
        type: SHOW_SUCCESS_MESSAGE,
        payload: "Account created. Placing your order now.",
      });
      return user;
    } catch (error: any) {
      const errMsg = error?.response?.data?.message || "Unable to create account before placing order.";
      dispatch({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
      setOrderErrors((state: any) => ({ ...state, account: errMsg }));
      return null;
    } finally {
      setIsCreatingAccount(false);
    }
  };

  const submitOrderDetails = async (e: any) => {
    e.preventDefault();
    if (cartDetails.length) {
      const errors = validateFormData(formData, orderDeliveryDates);
      if (Object.keys(errors).length > 0) {
        setOrderErrors(errors);
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload: Object.values(errors)[0] || "Please complete the checkout details.",
        });
        return;
      } else {
        let activeUser = userInfo;
        if (Object.keys(activeUser).length === 0) {
          const registeredUser = await registerBeforeOrder();
          if (!registeredUser?.id) return;
          activeUser = registeredUser;
        }
        const userId = activeUser.id;
        const isPincodeChanged = Boolean(activeUser.pin_code && pincode !== activeUser.pin_code);
        let shipping_cost = 0;
        if (Object.values(orderDeliveryDates).some(Boolean)) shipping_cost = shippingCost;
        setOrderErrors({});
        dispatch(
          placeUserOrderAction(
            formData,
            cartDetails,
            orderDeliveryDates,
            userId,
            isPincodeChanged,
            shipping_cost
          )
        );
      }
    } else {
      dispatch({
        type: SHOW_ERROR_MESSAGE,
        payload: "Your cart is empty. Please add items before checkout.",
      });
      return;
    }
  };
  return (
    <>
      <HeadingSection heading={"Checkout page"} />
      <section className="checkout-section bg-grey padding">
        <div className="container">
          <div className="row mt-5">
            <BillingSection
              userInfo={userInfo}
              formData={formData}
              cartDetails={cartDetails}
              orderErrors={orderErrors}
              orderDeliveryDates={orderDeliveryDates}
              updateFormData={updateFormData}
              submitOrderDetails={submitOrderDetails}
              updateorderDeliveryDate={updateorderDeliveryDate}
              uniqueProducts={uniqueProducts}
              shippingCost={shippingCost}
              addressList={addressList}
              onSelectSavedAddress={selectSavedAddress}
              cartError={(orderErrors as any).cart}
              accountError={(orderErrors as any).account}
              isPlacingOrder={isPlacingOrder}
              isCreatingAccount={isCreatingAccount}
              isOrderPlaced={isSuccess}
            />
            <ProductsInfo
              cartDetails={cartDetails}
              shippingCost={shippingCost}
              orderDeliveryDates={orderDeliveryDates}
            />
          </div>
        </div>
      </section>
      {(isCreatingAccount || isPlacingOrder || isSuccess) && (
        <div className="order-processing-overlay" role="status" aria-live="polite">
          <div className="order-processing-card">
            {!isSuccess ? (
              <>
                <div className="order-processing-spinner"></div>
                <h3>{isCreatingAccount ? "Creating Your Account" : orderProgressStep || "Processing Your Order"}</h3>
                <p>{isCreatingAccount ? "Please wait while we create your account before placing the order." : "Please wait while we confirm your cart and save your order."}</p>
              </>
            ) : (
              <>
                <div className="order-success-icon">
                  <i className="las la-check"></i>
                </div>
                <h3>Order Placed</h3>
                <p>
                  Your order #{orderDetails.refId} has been saved.
                  {receiptUrl ? " You can download the invoice now." : " The invoice will be prepared shortly."}
                </p>
                <div className="order-processing-actions">
                  {receiptUrl && (
                    <a href={receiptUrl} target="_blank" rel="noreferrer" className="default-btn">
                      Download Invoice <span></span>
                    </a>
                  )}
                  <button type="button" className="default-btn" onClick={() => navigate(`/thankyou/${orderDetails.refId}`)}>
                    View Order <span></span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Checkout;
