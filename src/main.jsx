import React from "react";
import './index.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import RecorderPage from "./pages/RecorderPage";
import ReplayPage from "./pages/ReplayPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/record" element={<RecorderPage />} />
        <Route path="/replay" element={<ReplayPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
