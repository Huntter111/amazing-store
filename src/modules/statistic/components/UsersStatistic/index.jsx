import React, { useEffect, useState } from 'react';
import UsersStatisticFilter from '../UsersStatisticFilter';
import { getStatisticOrdersByUser } from '../../helpers/getUserStatisticData';
import UsersOrders from '../UsersOrders';
import styles from './usersStatistic.module.scss';
import Loyalty from '../Loyalty';

const UsersStatistic = ({ allOrders }) => {
  const [filterKey, setFilterKey] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [userMails, setUsersMail] = useState(null);
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [highlightDates, setHighlightDates] = useState(null);

  useEffect(() => {
    const { from, to } = dateRange;
    const { usersMailList, graphData, highlightDates } = getStatisticOrdersByUser(allOrders, filterKey, from, to);
    setGraphData(graphData);
    setUsersMail(usersMailList);
    setHighlightDates(highlightDates);
  }, [allOrders, filterKey, dateRange]);

  const handlerChangeFilterKey = (value) => {
    setFilterKey(value);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.contenGraph}>
        <UsersStatisticFilter
          handlerChangeFilterKey={handlerChangeFilterKey}
          userMails={userMails}
          setDateRange={setDateRange}
          highlightDates={highlightDates}
        />
        <UsersOrders graphData={graphData} />
      </div>
      <div className={styles.contentLoyalty}>
        <Loyalty />
      </div>
    </div>
  );
};

export default UsersStatistic;
