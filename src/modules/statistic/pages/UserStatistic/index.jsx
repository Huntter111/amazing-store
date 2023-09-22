import React, { useEffect, useState, useMemo } from 'react';
import AppLayout from '../../../common/components/AppLayout';
import Control from '../../components/Control';
import { USER_STATISTIC_COMPONENT_TITLES, USER_STATISTIC_COMPONENT_TYPE } from '../../constants';
import GraphsLayout from '../../components/GraphsLayout';
import { useOrders } from '../../../orders/context/OrdersContext';
import OrdersStatistic from '../../components/OrdersStatistic';
import UsersStatistic from '../../components/UsersStatistic';

const UserStatistic = () => {
  const { allOrders, getAllOrdersData } = useOrders();

  const [controlKey, setControlKey] = useState();

  const controlButtons = [
    {
      key: USER_STATISTIC_COMPONENT_TYPE.STATISTIC_ORDERS,
      title: USER_STATISTIC_COMPONENT_TITLES.STATISTIC_ORDERS,
    },
    {
      key: USER_STATISTIC_COMPONENT_TYPE.STATISTIC_USER,
      title: USER_STATISTIC_COMPONENT_TITLES.STATISTIC_USER,
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
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setControlKey(USER_STATISTIC_COMPONENT_TYPE.STATISTIC_ORDERS);
  }, []);

  const getComponent = useMemo(() => {
    if (allOrders) {
      const components = {
        [USER_STATISTIC_COMPONENT_TYPE.STATISTIC_ORDERS]: <OrdersStatistic allOrders={allOrders} />,
        [USER_STATISTIC_COMPONENT_TYPE.STATISTIC_USER]: <UsersStatistic allOrders={allOrders} />,
      };

      return components[controlKey];
    }
  }, [controlKey, allOrders]);

  return (
    <AppLayout>
      <Control buttons={controlButtons} controlKey={controlKey} setControlKey={setControlKey} />
      <GraphsLayout>{getComponent}</GraphsLayout>
    </AppLayout>
  );
};

export default UserStatistic;
