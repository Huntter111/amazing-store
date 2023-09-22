import React, { useEffect, useState, useMemo } from 'react';
import AppLayout from '../../../common/components/AppLayout';
import Control from '../../components/Control';
import { USER_STATISTIC_COMPONENT_TITLES, USER_STATISTIC_COMPONENT_TYPE } from '../../constants';
import GraphsLayout from '../../components/GraphsLayout';
import { useOrders } from '../../../orders/context/OrdersContext';
import getUserStatisticData from '../../helpers/getUserStatisticData';
import UsersOrders from '../../components/UsersOrders';

const UserStatistic = () => {
  const { allOrders, getAllOrdersData } = useOrders();
  const [menuState, setMenuState] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [controlKey, setControlKey] = useState();

  const controlButtons = [
    {
      key: USER_STATISTIC_COMPONENT_TYPE.STATISTIC_ORDERS,
      title: USER_STATISTIC_COMPONENT_TITLES.STATISTIC_ORDERS,
    },
    {
      key: USER_STATISTIC_COMPONENT_TYPE.STATISTIC_LOYALTY,
      title: USER_STATISTIC_COMPONENT_TITLES.STATISTIC_LOYALTY,
    },
    {
      key: USER_STATISTIC_COMPONENT_TYPE.STATISTIC_PROFITABILITY,
      title: USER_STATISTIC_COMPONENT_TITLES.STATISTIC_PROFITABILITY,
    },
  ];

  useEffect(() => {
    getAllOrdersData();
  }, []);
  useEffect(() => {
    allOrders && setGraphData(getUserStatisticData(allOrders));
  }, [allOrders]);

  useEffect(() => {
    setControlKey(USER_STATISTIC_COMPONENT_TYPE.STATISTIC_ORDERS);
  }, []);

  const getComponent = useMemo(() => {
    if (graphData) {
      const components = {
        [USER_STATISTIC_COMPONENT_TYPE.STATISTIC_ORDERS]: <UsersOrders graphData={graphData.graphData} />,
      };

      return components[controlKey];
    }
  }, [controlKey, graphData]);

  return (
    <AppLayout>
      <Control buttons={controlButtons} controlKey={controlKey} setControlKey={setControlKey} callback={() => setMenuState(USER_STATISTIC_COMPONENT_TYPE.STATISTIC_ORDERS)} />
      <GraphsLayout>{getComponent}</GraphsLayout>
    </AppLayout>
  );
};

export default UserStatistic;
