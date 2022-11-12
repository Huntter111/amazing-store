/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useMemo } from "react";
import useProducts from "../../../../contentful/useProducts";
import ProductCard from "../ProductCard";

import styles from "./productList.module.scss";

const ProductsList = () => {
  const { productData } = useProducts();

  return useMemo(() => {
    if (!productData) return null;

    const { products } = productData;

    console.log('products', products)

    return (
      <div className={styles.wrapper}>
        {products?.map(({ id, name, description, images, price }) => (
          <ProductCard
            key={id}
            title={name}
            description={description}
            price={price}
            url={images[0].file.url}
          />
        ))}
      </div>
    );
  }, [productData]);
};

export default ProductsList;
