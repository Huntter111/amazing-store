import React from 'react';
import styles from './usersStatisticFilter.module.scss';
import DatePicker from '../ProductDatePicker';
import { Select } from 'antd';
const { Option } = Select;

const UsersStatisticFilter = ({ handlerChangeFilterKey, userMails, setDateRange, highlightDates }) => {
  const firstUser = userMails && userMails[0];
  return (
    <div className={styles.filterWrapper}>
      <DatePicker setDateRange={setDateRange} highlightDates={highlightDates} />
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder={firstUser}
        optionFilterProp="children"
        onChange={handlerChangeFilterKey}
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {userMails?.map((user) => {
          return (
            <Option key={user} value={user}>
              {user}
            </Option>
          );
        })}
      </Select>
    </div>
  );
};

export default UsersStatisticFilter;
