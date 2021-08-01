import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
import reportWebVitals from "./reportWebVitals";

import "./style/global.scss";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
