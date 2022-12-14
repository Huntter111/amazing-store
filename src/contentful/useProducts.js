/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useGetContentfulEntries } from "./";

const useProductsContentful = () => {
  const [productData, setProductData] = useState();
  const getContentfulEntry = useGetContentfulEntries();

  useEffect(() => {
    getContentfulEntry("product", "fields").then(({ total, items }) => {
      const products = items.map(({ fields, sys }) => {
        const { id } = sys;
        const { description, name, price, type, productSlides } = fields;
        const images = productSlides.map(({ fields }) => fields);

        return {
          id,
          name,
          type,
          description,
          price,
          images,
        };
      });

      setProductData({
        products,
        total,
      });
    });
  }, []);

  return { productData };
};

export default useProductsContentful;
