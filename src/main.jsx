import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "../app/globals.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="ml-[30vh]">
      <App />
    
    </div>
  </React.StrictMode>,
);
