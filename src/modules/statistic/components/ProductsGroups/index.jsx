import React, {useEffect} from 'react';
import styles from './productsGroups.module.scss'
import {getProductsGroups} from "../../helpers/getProductsGroups";
import {useGlobalContext} from "../../../common/context";

const ProductsGroups = ({orders}) => {
  const { products } = useGlobalContext();

  useEffect(() => {
    getProductsGroups(products, orders)
  }, [products, orders]);

  return (
    <div className={styles.wrapper}>
      ProductsGroups
    </div>
  );
};

export default ProductsGroups;
