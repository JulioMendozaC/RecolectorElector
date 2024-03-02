import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "../app/globals.css";

import NavBar from "./components/Common/NavBar";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NavBar />

    <div className="flex h-[calc(100vh-100px)] items-center justify-center bg-background">
      <App />
    
    </div>
  </React.StrictMode>,
);
