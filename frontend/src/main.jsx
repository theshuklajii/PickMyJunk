import axios from "axios";
axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/global.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
