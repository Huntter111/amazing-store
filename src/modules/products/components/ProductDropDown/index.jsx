import React from 'react';
import { Select } from 'antd';
import styles from './productDropDown.module.scss';
const { Option } = Select;

const ProductDropDown = ({
  handleSelect,
  arrayTypes,
  allOptionTitle,
  styles,
  value,
  initialOptionKey,
}) => {
  return (
    <Select placeholder="Тип продукту" className={styles} onChange={handleSelect} value={value}>
      <Option key={initialOptionKey}>{allOptionTitle}</Option>
      {arrayTypes?.map(({ title }, index) => (
        <Option key={title + index} value={title}>
          {title}
        </Option>
      ))}
    </Select>
  );
};

export default ProductDropDown;
