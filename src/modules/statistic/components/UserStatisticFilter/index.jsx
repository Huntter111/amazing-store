import React from 'react';
import DatePicker from '../ProductDatePicker';
import styles from './userStatisticFilter.module.scss';

const UserStatisticFilter = ({ setDateRange, highlightDates, filter, setFilter }) => {
  return (
    <div className={styles.filter}>
      <DatePicker setDateRange={setDateRange} highlightDates={highlightDates} />
    </div>
  );
};

export default UserStatisticFilter;
