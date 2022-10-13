import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { ROUTES } from "./routes";
import { OrdersListPage } from "./modules/orders";
import { ProductsListPage } from "./modules/products";
import { CartPage } from "./modules/cart";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.PRODUCTS_LIST} element={<ProductsListPage />} />
        <Route path={ROUTES.CART} element={<CartPage />} />
        <Route path={ROUTES.ORDERS_LIST} element={<OrdersListPage />} />
      </Routes>
    </Router>
  );
};

export default App;
