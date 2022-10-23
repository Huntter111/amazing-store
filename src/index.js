import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import OrdersModule from "./modules/orders";
import ProductsModule from "./modules/products";
import CartModule from "./modules/cart";
import "antd/dist/antd.min.css";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./modules/auth/context/AuthContext";
import "./modules/common/globalStyles/antd.scss";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <AuthContextProvider>
    <Router>
      <ProductsModule />
      <CartModule />
      <OrdersModule />
    </Router>
  </AuthContextProvider>
);

reportWebVitals();
