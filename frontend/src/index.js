import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { PredictionContextProvider } from "./store/prediction_context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PredictionContextProvider>
      <App />
    </PredictionContextProvider>
  </React.StrictMode>
);
