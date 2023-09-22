import React from 'react';
import DatePicker from '../ProductDatePicker';
import styles from './ordersStatistic.module.scss';

const OrdersStatistic = ({ setDateRange, highlightDates }) => {
  return (
    <div className={styles.filterWrapper}>
      <DatePicker setDateRange={setDateRange} highlightDates={highlightDates} />
    </div>
  );
};

export default OrdersStatistic;
