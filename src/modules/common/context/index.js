/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useMemo } from "react";
import { isEqual } from "lodash";

import { formatProductsContentfulFirebase } from "../utils";
import useProductsContentful from "../../../contentful/useProducts";
import useProductsDB from "../../../api/products";

export const GlobalContext = createContext();

const GlobalState = ({ children }) => {
  const { productData } = useProductsContentful();
  const { products, createProduct, getProducts, updateProduct, deleteProduct } =
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

      const formatedUninitializedProducts = formatProductsContentfulFirebase(
        uninitializedProducts
      );

      formatedUninitializedProducts.forEach((product) =>
        createProduct(product)
      );

      if (uninitializedProducts.length) {
        getProducts();
        console.log(`${uninitializedProducts.length} products created`);
      }
    }
  }, [products, productsFromContentful]);

  useEffect(() => {
    if (products && productsFromContentful && productsFromContentful.length) {
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
          const foundProduct = products.find(({ contentfulId }) =>
            isEqual(contentfulId, product.id)
          );

          return {
            ...product,
            id: foundProduct?.id,
            contentfulId: foundProduct?.contentfulId,
          };
        });

      const formatedUpdatedProducts =
        formatProductsContentfulFirebase(updatedProducts);

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

      if (updatedProducts.length) {
        getProducts();
        console.log(`${updatedProducts.length} products updated`);
      }
    }
  }, [products, productsFromContentful]);

  useEffect(() => {
    if (products && productsFromContentful && productsFromContentful.length) {
      const shouldDeleteProducts = products.filter(({ contentfulId }) => {
        const foundProduct = productsFromContentful.find((product) =>
          isEqual(contentfulId, product.id)
        );

        return !foundProduct;
      });

      shouldDeleteProducts.forEach((product) => deleteProduct(product.id));

      if (shouldDeleteProducts.length) {
        getProducts();
        console.log(`${shouldDeleteProducts.length} products removed`);
      }
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
