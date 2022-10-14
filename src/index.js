import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import OrdersModule from "./modules/orders";
import ProductsModule from "./modules/products";
import CartModule from "./modules/cart";
import "antd/dist/antd.min.css";
import reportWebVitals from "./reportWebVitals";

render(
  <Router>
    <ProductsModule />
    <CartModule />
    <OrdersModule />
  </Router>,
  document.getElementById("root")
);

reportWebVitals();
