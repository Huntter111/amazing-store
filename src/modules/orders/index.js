import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../../routes";
import OrdersListPage from "./pages/OrdersList";

const OrdersModule = () => {
  return (
    <Routes>
      <Route path={ROUTES.ORDERS_LIST} element={<OrdersListPage />} />
    </Routes>
  );
};

export default OrdersModule;
