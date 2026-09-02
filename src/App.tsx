import React from "react";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import Application from "./routes";
import { store } from "./store";
import Toast from "./components/Toast";
import GlobalLoader from "./components/Shared/GlobalLoader";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Application />
        <GlobalLoader />
        <Toast />
      </Provider>
    </div>
  );
}

export default App;
