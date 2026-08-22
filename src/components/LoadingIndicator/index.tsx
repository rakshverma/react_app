import "./loader.css";
export default function LoadingIndicator() {
  return (
    <div className="spinner-container">
      <div className="mask-loader"></div>
      <div className="loading-spinner"></div>
    </div>
  );
}
