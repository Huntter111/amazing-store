/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useMemo } from "react";
import useProducts from "../../../../contentful/useProducts";
import ProductCard from "../ProductCard";

const ProductsList = () => {
  const { productData } = useProducts();

  return useMemo(() => {
    if (!productData) return null;

    const { products } = productData;

    return products?.map(({ id, name, description, images, price }) => {
      console.log(images)
      return (
        <ProductCard
          key={id}
          title={name}
          description={description}
          price={price}
          url={images[0].file.url}
        />
      );
    });
  }, [productData]);
};

export default ProductsList;
