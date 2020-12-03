import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

import {
  GeneralContextProvider,
  AuthenticationContextProvider,
} from "./context";

const app = (
  <GeneralContextProvider>
    <AuthenticationContextProvider>
      <App />
    </AuthenticationContextProvider>
  </GeneralContextProvider>
);

/**
 * Entry point of the application
 */
ReactDOM.render(app, document.getElementById("root"));
