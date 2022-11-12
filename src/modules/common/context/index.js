import { createContext, useContext, useMemo } from "react";
import useProducts from "../../../contentful/useProducts";

export const GlobalContext = createContext();

const GlobalState = ({ children }) => {
  const { productData } = useProducts();

  const products = useMemo(() => {
    return productData ? productData.products : [];
  }, [productData]);

  return (
    <GlobalContext.Provider value={{ products }}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  const { products } = useContext(GlobalContext);

  return { products };
};

export default GlobalState;
export { useGlobalContext };
