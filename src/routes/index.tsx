import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import MyAccount from "../pages/MyAccount";
import ProductDetails from "../pages/ProductDetails";
import Checkout from "../pages/Checkout";
import Thankyou from "../pages/Thankyou";
import About from "../pages/About";
import ContactUs from "../pages/ContactUs";
import ScrollToTop from "../components/Shared/ScrollToTop";

const Application = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route
            path="/product/details/:productId"
            element={<ProductDetails />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/create-account" element={<Checkout />} />
          <Route path="/thankyou/:refId" element={<Thankyou />} />
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="/myaccount/:page" element={<MyAccount />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/contactus" element={<ContactUs />} />
        </Route>
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </Router>
  );
};

export default Application;
