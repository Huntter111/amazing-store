import React, { useEffect, useState, useMemo } from 'react';
import AppLayout from '../../../common/components/AppLayout';
import Control from '../../components/Control';
import { USER_STATISTIC_COMPONENT_TITLES, USER_STATISTIC_COMPONENT_TYPE } from '../../constants';
import GraphsLayout from '../../components/GraphsLayout';
import { useOrders } from '../../../orders/context/OrdersContext';
import UsersOrdersStatistic from '../../components/UsersOrdersStatistic';
import UsersStatistic from '../../components/UsersStatistic';

const UserStatistic = () => {
  const [controlKey, setControlKey] = useState();
  const { allOrders, getAllOrdersData } = useOrders();

  const controlButtons = [
    {
      key: USER_STATISTIC_COMPONENT_TYPE.STATISTIC_ORDERS,
      title: USER_STATISTIC_COMPONENT_TITLES.STATISTIC_ORDERS,
    },
    {
      key: USER_STATISTIC_COMPONENT_TYPE.STATISTIC_USER,
      title: USER_STATISTIC_COMPONENT_TITLES.STATISTIC_USER,
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
        [USER_STATISTIC_COMPONENT_TYPE.STATISTIC_ORDERS]: <UsersOrdersStatistic allOrders={allOrders} />,
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
