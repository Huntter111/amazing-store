import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../../routes";
import CartPage from "./pages/Cart";

const CartModule = () => {
  return (
    <Routes>
      <Route path={ROUTES.CART} element={<CartPage />} />
    </Routes>
  );
};

export default CartModule;
