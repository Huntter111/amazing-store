/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useMemo } from "react";
import { isEqual } from "lodash";

import { formatProductsContentfulFirebase } from "../utils";
import useProductsContentful from "../../../contentful/useProducts";
import useProductsDB from "../../../api/products";

export const GlobalContext = createContext();

const GlobalState = ({ children }) => {
  const { productData } = useProductsContentful();
  const { products, createProduct, getProducts, updateProduct } =
    useProductsDB();

  const productsFromContentful = useMemo(() => {
    return productData ? productData.products : [];
  }, [productData]);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (products && productsFromContentful && productsFromContentful.length) {
      const uninitializedProducts = productsFromContentful.filter((product) => {
        const foundProduct = products.find(({ contentfulId }) =>
          isEqual(contentfulId, product.id)
        );

        return !foundProduct;
      });

      const updatedProducts = productsFromContentful
        .filter((product) => {
          const foundProduct = products.find(
            ({ contentfulId, description, images, name, price }) =>
              isEqual(contentfulId, product.id) &&
              isEqual(description, product.description) &&
              isEqual(images, product.images) &&
              isEqual(name, product.name) &&
              isEqual(price, product.price)
          );

          return !foundProduct;
        })
        .map((product) => {
          const { id, contentfulId } = products.find(({ contentfulId }) =>
            isEqual(contentfulId, product.id)
          );
          return {
            ...product,
            id,
            contentfulId,
          };
        });

      const formatedUninitializedProducts = formatProductsContentfulFirebase(
        uninitializedProducts
      );

      const formatedUpdatedProducts =
        formatProductsContentfulFirebase(updatedProducts);

      formatedUninitializedProducts.forEach((product) =>
        createProduct(product)
      );

      formatedUpdatedProducts.forEach((product) => {
        const updateData = {
          contentfulId: product.contentfulId,
          description: product.description,
          images: product.images,
          name: product.name,
          price: product.price,
        };

        updateProduct(product.id, updateData);
      });

      if (uninitializedProducts.length || updatedProducts.length) getProducts();
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
