/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useMemo } from "react";
import useProductsContentful from "../../../contentful/useProducts";
import useProductsDB from "../../../api/products";

export const GlobalContext = createContext();

const GlobalState = ({ children }) => {
  const { productData } = useProductsContentful();
  const { products, createProduct, getProducts } = useProductsDB();

  const productsFromContentful = useMemo(() => {
    return productData ? productData.products : [];
  }, [productData]);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (products && productsFromContentful && productsFromContentful.length) {
      const uninitializedProducts = productsFromContentful.filter((product) => {
        const foundProduct = products.find(
          ({ contentfulId }) => contentfulId === product.id
        );

        return !foundProduct;
      });

      const formatedUninitializedProducts = uninitializedProducts.map(
        ({ description, id, images, name, price }) => {
          return {
            description,
            contentfulId: id,
            images,
            name,
            price,
          };
        }
      );

      formatedUninitializedProducts.forEach((product) =>
        createProduct(product)
      );

      if (uninitializedProducts.length) getProducts();
    }
  }, [products, productsFromContentful]);

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
