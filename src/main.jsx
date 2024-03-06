import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "../app/globals.css";

import NavBar from "./components/Common/NavBar";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="ml-[270px]">
      <App />
    
    </div>
  </React.StrictMode>,
);
