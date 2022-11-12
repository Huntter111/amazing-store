/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useMemo } from "react";
import { Col, Row } from "antd";
import useProducts from "../../../../contentful/useProducts";
import ProductCard from "../ProductCard";

const ProductsList = () => {
  const { productData } = useProducts();

  return useMemo(() => {
    if (!productData) return null;

    const { products } = productData;

    console.log("products", products);

    return (
      <Row gutter={24}>
        {products?.map(({ id, name, description, images, price }) => (
          <Col className="row" lg={6} sm={12} xs={24} >
            <ProductCard
              key={id}
              title={name}
              description={description}
              price={price}
              url={images[0].file.url}
            />
          </Col>
        ))}
      </Row>
    );
  }, [productData]);
};

export default ProductsList;
