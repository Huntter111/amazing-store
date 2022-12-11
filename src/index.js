import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ROUTES } from "./routes";
import { OrdersListPage } from "./modules/orders";
import { ProductsListPage, ProductInfoPage } from "./modules/products";
import { CartPage } from "./modules/cart";
import NotFoundPage from "./modules/common/pages/NotFound";
import "antd/dist/antd.min.css";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./modules/auth/context/AuthContext";
import { CartContextProvider } from "./modules/cart/context/CartContext";
import GlobalState from "./modules/common/context";
import "./modules/common/globalStyles/antd.scss";
import "./modules/common/globalStyles/app.scss";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <AuthContextProvider>
    <GlobalState>
      <CartContextProvider>
        <Router>
          <Routes>
            <Route path={ROUTES.PRODUCTS_LIST} element={<ProductsListPage />} />
            <Route path={ROUTES.PRODUCT_INFO} element={<ProductInfoPage />} />
            <Route path={ROUTES.ORDERS_LIST} element={<OrdersListPage />} />
            <Route path={ROUTES.CART} element={<CartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </CartContextProvider>
    </GlobalState>
  </AuthContextProvider>
);

reportWebVitals();
