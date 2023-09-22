import React, { useEffect, useState } from 'react';
import { getUserStatisticOrdersData } from '../../helpers/getUserStatisticData';
import UsersOrders from '../UsersOrders';
import UserStatisticFilter from '../OrdersStatisticFilter';

const OrdersStatistic = ({ allOrders }) => {
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [highlightDates, setHighlightDates] = useState(null);
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    const { from, to } = dateRange;
    const { datepickerHighlightDates, graphData } = getUserStatisticOrdersData(allOrders, from, to);
    setGraphData(graphData);
    setHighlightDates(datepickerHighlightDates);
  }, [allOrders, dateRange]);

  return (
    <>
      <UserStatisticFilter setDateRange={setDateRange} highlightDates={highlightDates} />
      <UsersOrders graphData={graphData} />
    </>
  );
};

export default OrdersStatistic;
