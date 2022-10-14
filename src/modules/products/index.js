import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../../routes";
import ProductsListPage from "./pages/ProductsList";

const ProductsModule = () => {
  return (
    <Routes>
      <Route path={ROUTES.PRODUCTS_LIST} element={<ProductsListPage />} />
    </Routes>
  );
};

export default ProductsModule;
