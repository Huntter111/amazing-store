import React, {useCallback} from "react";
import AppDropDown from "../../../common/components/AppDropDown";

import styles from './associativeProductsFilter.module.scss';
import {
  ASSOCIATIONS_CONFIDENCE_TITLE,
  ASSOCIATIONS_SUPPORT_TITLE
} from "../../constants";
const AssociativeProductsFilter = ({ productsAssociationsEnum, filter, setFilter }) => {
  const handleSelectProduct = useCallback(
    (value) => {
      setFilter({
        product: {name: filter.product.name, type: value},
        associationMinSupport: {name: filter.associationMinSupport.name, type: filter.associationMinSupport.type},
        associationMinConfidence: {name: filter.associationMinConfidence.name, type: filter.associationMinConfidence.type}
      });
    },
    [
      filter.associationMinConfidence.name,
      filter.associationMinConfidence.type,
      filter.associationMinSupport.name,
      filter.associationMinSupport.type,
      filter.product.name,
      setFilter
    ],
  );

  const handleSelectAssociativesMinSupport = useCallback(
    (value) => {
      setFilter({
        product: {name: filter.product.name, type: filter.product.type},
        associationMinSupport: {name: filter.associationMinSupport.name, type: value},
        associationMinConfidence: {name: filter.associationMinConfidence.name, type: filter.associationMinConfidence.type}
      });
    },
    [
      filter.associationMinConfidence.name,
      filter.associationMinConfidence.type,
      filter.associationMinSupport.name,
      filter.product.name,
      filter.product.type,
      setFilter
    ],
  );

  const handleSelectAssociativesMinConfidence = useCallback(
    (value) => {
      setFilter({
        product: {name: filter.product.name, type: filter.product.type},
        associationMinSupport: {name: filter.associationMinSupport.name, type: filter.associationMinSupport.type},
        associationMinConfidence: {name: filter.associationMinConfidence.name, type: value}
      });
    },
    [
      filter.associationMinConfidence.name,
      filter.associationMinSupport.name,
      filter.associationMinSupport.type,
      filter.product.name,
      filter.product.type,
      setFilter
    ],
  );

  return (
    <div className={styles.wrapper}>
      <AppDropDown
        arrayTypes={Object.keys(productsAssociationsEnum).map((type) => {
          return {title: type}
        })}
        enumData={productsAssociationsEnum}
        enumKeyWithoutUppercase
        handleSelect={handleSelectProduct}
        styles={styles.select}
        value={filter.product.type}
        placeholder="Назва продукту"
      />
      <AppDropDown
        arrayTypes={Object.keys(ASSOCIATIONS_SUPPORT_TITLE).map((type) => {
          return {title: type}
        })}
        enumData={ASSOCIATIONS_SUPPORT_TITLE}
        handleSelect={handleSelectAssociativesMinSupport}
        styles={styles.select}
        value={filter.associationMinSupport.type}
        placeholder="Кількість співпадінь"
      />
      <AppDropDown
        arrayTypes={Object.keys(ASSOCIATIONS_CONFIDENCE_TITLE).map((type) => {
          return {title: type}
        })}
        enumData={ASSOCIATIONS_CONFIDENCE_TITLE}
        handleSelect={handleSelectAssociativesMinConfidence}
        styles={styles.select}
        value={filter.associationMinConfidence.type}
        placeholder="Мінімальна достовірність"
      />
    </div>
  );
};

export default AssociativeProductsFilter;
