import React from 'react';
import { Select } from 'antd';
const { Option } = Select;

const AppDropDown = ({
  handleSelect,
  arrayTypes,
  allOptionTitle,
  styles,
  value,
  enumData,
  initialOptionKey,
  placeholder
}) => {
  return (
    <Select placeholder={placeholder} className={styles} onChange={handleSelect} value={value}>
      <Option key={initialOptionKey}>{allOptionTitle}</Option>
      {arrayTypes?.map(({ title }, index) => (
        <Option key={title + index} value={title}>
          {enumData ? enumData[title] : title}
        </Option>
      ))}
    </Select>
  );
};

export default AppDropDown;
