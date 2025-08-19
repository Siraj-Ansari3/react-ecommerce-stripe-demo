// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<CartPage />} />

      {/* create your own custom success and cancel pages */}
      <Route path="/success" element={<div>Payment Successful</div>} />
      <Route path="/cancel" element={<div>Payment Canceled</div>} />

      <Route path="*" element={<div>404 Page Not Found</div>} />
    </Routes>
  );
}
