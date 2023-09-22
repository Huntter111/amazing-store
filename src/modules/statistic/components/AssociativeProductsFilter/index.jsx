import React, {useCallback} from "react";
import AppDropDown from "../../../common/components/AppDropDown";

import {
  ASSOCIATIONS_CONFIDENCE_TITLE,
  ASSOCIATIONS_SUPPORT_TITLE
} from "../../constants";

import styles from './associativeProductsFilter.module.scss';
import AppButton from "../../../common/components/AppButton";
import {BUTTON_TYPE} from "../../../common/constants";

const AssociativeProductsFilter = ({ isAssociationSettingsExist, productsAssociationsEnum, filter, setFilter, setAssociativeSettings }) => {
  const handleSelectProduct = useCallback(
    (value) => {
      setFilter({
        product: {name: filter.product.name, type: value},
        associationSupport: {name: filter.associationSupport.name, type: filter.associationSupport.type},
        associationConfidence: {name: filter.associationConfidence.name, type: filter.associationConfidence.type}
      });
    },
    [
      filter.associationConfidence.name,
      filter.associationConfidence.type,
      filter.associationSupport.name,
      filter.associationSupport.type,
      filter.product.name,
      setFilter
    ],
  );

  const handleSelectAssociativesSupport = useCallback(
    (value) => {
      setFilter({
        product: {name: filter.product.name, type: filter.product.type},
        associationSupport: {name: filter.associationSupport.name, type: value},
        associationConfidence: {name: filter.associationConfidence.name, type: filter.associationConfidence.type}
      });
    },
    [
      filter.associationConfidence.name,
      filter.associationConfidence.type,
      filter.associationSupport.name,
      filter.product.name,
      filter.product.type,
      setFilter
    ],
  );

  const handleSelectAssociativesConfidence = useCallback(
    (value) => {
      setFilter({
        product: {name: filter.product.name, type: filter.product.type},
        associationSupport: {name: filter.associationSupport.name, type: filter.associationSupport.type},
        associationConfidence: {name: filter.associationConfidence.name, type: value}
      });
    },
    [
      filter.associationConfidence.name,
      filter.associationSupport.name,
      filter.associationSupport.type,
      filter.product.name,
      filter.product.type,
      setFilter
    ],
  );

  return (
    <div className={styles.wrapper}>
      <AppDropDown
        arrayTypes={Object.keys(productsAssociationsEnum || {}).map((type) => {
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
        handleSelect={handleSelectAssociativesSupport}
        styles={styles.select}
        value={filter.associationSupport.type}
        placeholder="Кількість співпадінь"
      />
      <AppDropDown
        arrayTypes={Object.keys(ASSOCIATIONS_CONFIDENCE_TITLE).map((type) => {
          return {title: type}
        })}
        enumData={ASSOCIATIONS_CONFIDENCE_TITLE}
        handleSelect={handleSelectAssociativesConfidence}
        styles={styles.select}
        value={filter.associationConfidence.type}
        placeholder="Мінімальна достовірність"
      />
      <AppButton
        className={styles.button}
        type={BUTTON_TYPE.PRIMARY}
        name={'Зберегти налаштування'}
        onClick={setAssociativeSettings}
        disabled={isAssociationSettingsExist}
      />
    </div>
  );
};

export default AssociativeProductsFilter;
