import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import ProtectedRoutes from "../../routes/ProtectedRoutes";

function Layout() {
  return (
    <div id="layout-wrapper">
      <Header />
      <ProtectedRoutes />
      <Footer />
    </div>
  );
}

export default Layout;
