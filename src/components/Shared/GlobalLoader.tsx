import React from "react";
import { useSelector } from "react-redux";
import LoadingIndicator from "../LoadingIndicator";

const GlobalLoader = () => {
  const isLoading = useSelector((state: any) => state.loader.loading);
  console.log("LOADFING= ", isLoading);
  return isLoading ? null : null;
};

export default GlobalLoader;
