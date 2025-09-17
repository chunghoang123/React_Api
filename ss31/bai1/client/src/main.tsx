import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // nếu dùng Tailwind / styles của bạn

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
