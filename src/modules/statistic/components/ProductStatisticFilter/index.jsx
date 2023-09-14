import DatePicker from '../ProductDatePicker';
import AppDropDown from "../../../common/components/AppDropDown";
import { PRODUCT_TYPES } from '../../../products/constants';
import React, {useCallback} from "react";

import styles from './productStaticFilter.module.scss';
import {PRODUCTS_SUB_TYPE_LIST} from "../../helpers/getProductsStatisticData";

const ProductStatisticFilter = ({ setDateRange, highlightDates, filter, setFilter }) => {

  const handleSelectProductType = useCallback(
    (value) => {
      setFilter({
        productType: {name: filter.productType.name, type: value},
        productSubType: {name: filter.productSubType.name, type: filter.productSubType.type}
      });
    },
    [filter.productSubType.name, filter.productSubType.type, filter.productType.name, setFilter],
  );

  const handleSelectProductSubType = useCallback(
    (value) => {
      setFilter({
        productType: {name: filter.productType.name, type: filter.productType.type},
        productSubType: {name: filter.productSubType.name, type: value}
      });
    },
    [filter.productSubType.name, filter.productType.name, filter.productType.type, setFilter],
  );

  return (
    <div className={styles.wrapper}>
      <DatePicker setDateRange={setDateRange} highlightDates={highlightDates} />
      <AppDropDown
        arrayTypes={Object.keys(PRODUCT_TYPES).map((type) => {
          return {title: type}
        })}
        enumData={PRODUCT_TYPES}
        handleSelect={handleSelectProductType}
        styles={styles.select}
        value={filter.productType.type}
        placeholder="Тип продукту"
      />
      <AppDropDown
        arrayTypes={Object.keys(PRODUCTS_SUB_TYPE_LIST).map((type) => {
          return {title: type}
        })}
        enumData={PRODUCTS_SUB_TYPE_LIST}
        handleSelect={handleSelectProductSubType}
        styles={styles.select}
        value={filter.productSubType.type}
        placeholder="Підтип продукту"
      />
    </div>
  );
};

export default ProductStatisticFilter;
