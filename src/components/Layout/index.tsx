import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import ProtectedRoutes from "../../routes/ProtectedRoutes";
import GlobalLoader from "../Shared/GlobalLoader";

function Layout() {
  return (
    <div id="layout-wrapper">
      <GlobalLoader />
      <Header />
      <ProtectedRoutes />
      <Footer />
    </div>
  );
}

export default Layout;
