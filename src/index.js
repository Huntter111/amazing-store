import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import OrdersModule from "./modules/orders";
import ProductsModule from "./modules/products";
import CartModule from "./modules/cart";
import "antd/dist/antd.min.css";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./modules/auth/context/AuthContext";
import GlobalState from "./modules/common/context";
import "./modules/common/globalStyles/antd.scss";
import "./modules/common/globalStyles/app.scss";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <AuthContextProvider>
    <GlobalState>
      <Router>
        <ProductsModule />
        <CartModule />
        <OrdersModule />
      </Router>
    </GlobalState>
  </AuthContextProvider>
);

reportWebVitals();
