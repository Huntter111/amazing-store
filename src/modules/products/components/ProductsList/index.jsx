/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from "react";
import { useMemo } from "react";
import { Col, Row, Input, Select } from "antd";
import { debounce } from "lodash";

import { useGlobalContext } from "../../../common/context";
import ProductCard from "../ProductCard";

import { PRODUCT_TYPES } from "../../constants";
import styles from "./productList.module.scss";

const { Option } = Select;

const ProductsList = () => {
  const { products } = useGlobalContext();
  const [filter, setFilter] = useState({ name: null, type: "ALL" });

  const productTypes = useMemo(() => {
    return products
      ?.map(({ type }) => {
        return {
          type: type[0].fields.name,
        };
      })
      .reduce((acc, item) => {
        return acc.find((_) => _.type === item.type) ? acc : [...acc, item];
      }, []);
  }, [products]);

  const handleSearch = useCallback(
    debounce((event) => {
      const value = event.target.value;
      if (value.length > 1) {
        setFilter({ name: value, type: filter.type });
      } else {
        setFilter({ name: null, type: filter.type });
      }
    }, 500),
    [filter]
  );

  const handleSelect = useCallback(
    (value) => {
      setFilter({ name: filter.name, type: value });
    },
    [filter]
  );

  const productFiltered = useMemo(() => {
    if (!products) return [];

    const productsByType = products.filter(({ type }) => {
      if (filter.type === "ALL") return true;
      return type[0].fields.name === filter.type;
    });

    if (filter.name) {
      return productsByType.filter(({ name }) => {
        const matchValue = filter.name.toLowerCase();
        if (name.toLowerCase().includes(matchValue)) return true;
        return false;
      });
    }

    return productsByType;
  }, [filter, products]);

  return useMemo(() => {
    if (!products) return null;

    return (
      <>
        <div className={styles.filterWrapper}>
          <Input placeholder="Назва продукту" onChange={handleSearch} />
          <Select
            placeholder="Тип продукту"
            className={styles.select}
            onChange={handleSelect}
          >
            <Option key="ALL" value="ALL">
              {PRODUCT_TYPES.ALL}
            </Option>
            {productTypes.map(({ type }) => (
              <Option key={type} value={type}>
                {PRODUCT_TYPES[type]}
              </Option>
            ))}
          </Select>
        </div>
        <Row gutter={24}>
          {productFiltered?.map(
            ({ id, name, description, type, images, price }) => (
              <Col key={id} className="row" lg={6} sm={12} xs={24}>
                <ProductCard
                  id={id}
                  title={name}
                  type={type[0].fields.name}
                  description={description}
                  price={price}
                  url={images[0].file.url}
                />
              </Col>
            )
          )}
        </Row>
      </>
    );
  }, [productFiltered]);
};

export default ProductsList;
