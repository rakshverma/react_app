import React from "react";
import { useSelector } from "react-redux";

const GlobalLoader = () => {
  const isLoading = useSelector((state: any) => state.loader.loading);
  if (!isLoading) return null;

  return (
    <div className="global-loader-overlay" role="status" aria-live="polite" aria-busy="true">
      <div className="global-loader-card">
        <div className="global-loader-spinner"></div>
        <h3>Please wait</h3>
        <p>Completing your request...</p>
      </div>
    </div>
  );
};

export default GlobalLoader;
