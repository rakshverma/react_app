import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import HeadingSection from "../components/Shared/HeadingSection";
import BillingSection from "../components/Checkout/BillingSection";
import ProductsInfo from "../components/Checkout/ProductsInfo";
import {
  getCartDetailsAction,
  getDistrictOnPinCodeAction,
} from "../store/actions/cartAction";
import {
  placeUserOrderAction,
  resetOrderStatusAction,
} from "../store/actions/orderAction";
import { getAllProductsAction } from "../store/actions/productAction";

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

const getUnavailableCartItems = (cartDetails: any[], productList: any[]) => {
  return cartDetails.filter((cartItem: any) => {
    const product = productList.find((item: any) => `${item.id}` === `${cartItem.productId}`);
    if (!product || Number(product.is_available) !== 1 || `${product.franchise_id}` !== `${cartItem.franchiseId}`) return true;
    return !parsePriceRows(product.quantity_wise_price).some((priceRow: any) => {
      return (
        Number(priceRow.quantity) === Number(cartItem.quantity) &&
        `${priceRow.unit}` === `${cartItem.unit}` &&
        Number(priceRow.price) === Number(cartItem.price)
      );
    });
  });
};

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, district } = useSelector((state: any) => state.user);
  const { cartDetails, shippingCost } = useSelector((state: any) => state.cart);
  const { productList } = useSelector((state: any) => state.product);
  const { isSuccess, isError, orderDetails } = useSelector(
    (state: any) => state.order
  );
  const pincode = localStorage.getItem("pincode");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "West Bengal",
    district: "",
    street: "",
    landmark: "",
    pincode: pincode,
    deliveryDay: "",
    additionalNote: "",
  });
  const [orderDeliveryDates, setOrderDeliveryDates] = useState<any>({});
  const [orderErrors, setOrderErrors] = useState({});

  const uniqueProducts = Object.values(
    cartDetails.reduce((acc: any, obj: any) => {
      acc[obj.productId] = obj;
      return acc;
    }, {})
  );

  useEffect(() => {
    return () => {
      dispatch(resetOrderStatusAction());
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      navigate(`/thankyou/${orderDetails.refId}`);
    }
  }, [isSuccess, navigate]);

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

  const updateFormData = (name: string, value: string) => {
    setFormData((state: any) => ({
      ...state,
      [name]: value,
    }));
  };

  const formatDate = (date: any) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const updateorderDeliveryDate = (id: any, value: any) => {
    console.log("date value = ", value);
    console.log("date id = ", id);
    setOrderDeliveryDates((state: any) => ({
      ...state,
      [id]: value ? formatDate(value) : "",
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
      street,
      landmark,
      pincode,
      deliveryDay,
      additionalNote,
    } = formData;
    if (!name) errors.name = "Please enter your name";
    if (!email) errors.email = "Please enter your email";
    if (email && !emailRegex.test(email))
      errors.email = "Please enter valid email";
    if (!phone) errors.phone = "Please enter your phone number";
    if (phone && !phoneNumberRegex.test(phone))
      errors.phone = "Please enter valid phone number";
    if (!state) errors.state = "Please select your state";
    if (!district) errors.district = "Please select your district";
    if (!street) errors.street = "Please enter your street";
    if (!pincode) errors.pincode = "Please enter your pincode";
    if (pincode && !pinRegex.test(pincode))
      errors.pincode = "Please enter valid pincode";

    uniqueProducts.forEach((item: any) => {
      if (!orderDeliveryDates[item.productId]) {
        errors.deliveryDate = "Please select delivery dates for all the items";
      }
    });

    const unavailableItems = getUnavailableCartItems(cartDetails, productList);
    if (unavailableItems.length) {
      errors.cart = `${unavailableItems.map((item: any) => item.name || "An item").join(", ")} is not available for your selected pincode. Please remove it from cart.`;
    }

    return errors;
  };

  const submitOrderDetails = (e: any) => {
    e.preventDefault();
    if (cartDetails.length) {
      console.log("orderDeliveryDates = ", orderDeliveryDates);
      const userId = Object.keys(userInfo).length > 0 ? userInfo.id : null;
      const errors = validateFormData(formData, orderDeliveryDates);
      if (Object.keys(errors).length > 0) {
        setOrderErrors(errors);
        return;
      } else {
        const isPincodeChanged = pincode === userInfo.pin_code;
        let shipping_cost = 0;
        if (Object.keys(orderDeliveryDates).length > 0) {
          let temp: any = [];
          Object.keys(orderDeliveryDates).forEach((item: any) => {
            if (!temp.includes(orderDeliveryDates[item])) {
              shipping_cost += shippingCost;
              temp.push(orderDeliveryDates[item]);
            }
          });
        }
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
      return;
    }
  };
  console.log("orderDeliveryDates === ", orderDeliveryDates);
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
              cartError={(orderErrors as any).cart}
            />
            <ProductsInfo
              cartDetails={cartDetails}
              shippingCost={shippingCost}
              orderDeliveryDates={orderDeliveryDates}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Checkout;
