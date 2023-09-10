import DatePicker from '../ProductDatePicker';
import AppDropDown from "../../../common/components/AppDropDown";
import { PRODUCT_TYPES } from '../../../products/constants';
import React, {useCallback} from "react";

import styles from './productStaticFilter.module.scss';

const ProductStatisticFilter = ({ setDateRange, highlightDates, filter, setFilter }) => {

  const handleSelect = useCallback(
    (value) => {
      setFilter({ name: filter.name, type: value });
    },
    [filter.name, setFilter],
  );

  return (
    <div className={styles.wrapper}>
      <DatePicker setDateRange={setDateRange} highlightDates={highlightDates} />
      <AppDropDown
        arrayTypes={Object.keys(PRODUCT_TYPES).map((type) => {
          return {title: type}
        })}
        enumData={PRODUCT_TYPES}
        handleSelect={handleSelect}
        styles={styles.select}
        value={filter?.type}
        placeholder="Тип продукту"
      />
    </div>
  );
};

export default ProductStatisticFilter;
