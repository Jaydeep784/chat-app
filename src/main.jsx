import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserContextProvider } from "./contexts/UserContext.js";



createRoot(document.getElementById("root")).render(
  
  <StrictMode>
    <App />
  </StrictMode>
);
