import React, { useEffect, useMemo, useState } from 'react';
import AppLayout from '../../../common/components/AppLayout';
import { useUserData } from '../../../auth/context/UserDataContext';
import getCountData from '../../helpers/getCountData';

import styles from './helperStatistic.module.scss';
import { COMPONENT_TYPE } from '../../constants';
import AllProducts from '../../components/AllProducts';
import SingleProducts from '../../components/SinglesProducts';
import DrinksProducts from '../../components/DrinksProducts';
import SetsProducts from '../../components/SetsProducts';
import Control from '../../components/Control';
import GraphsLayout from '../../components/GraphsLayout';

const HelperStatisticPage = () => {
  const { usersData, getAllUsersDataInfo } = useUserData();
  const [graphData, setGraphData] = useState(null);
  const [graphStatisticKey, setGraphStatistic] = useState();

  useEffect(() => {
    getAllUsersDataInfo();
  }, []);
  useEffect(() => {
    usersData && setGraphData(getCountData(usersData));
  }, [usersData]);

  const getGraphComponent = useMemo(() => {
    const grapComponents = {
      [COMPONENT_TYPE.ALL_PRODUCTS]: <AllProducts graphData={graphData} />,
      [COMPONENT_TYPE.SINGLES_PRODUCTS]: <SingleProducts graphData={graphData} />,
      [COMPONENT_TYPE.DRINKS_PRODUCTS]: <DrinksProducts graphData={graphData} />,
      [COMPONENT_TYPE.SETS_PRODUCTS]: <SetsProducts graphData={graphData} />,
    };

    return grapComponents[graphStatisticKey];
  }, [graphStatisticKey]);

  return (
    <AppLayout>
      <div className={styles.wrapper}>
        <Control setGraphStatistic={setGraphStatistic} graphStatisticKey={graphStatisticKey} />
        <GraphsLayout>{getGraphComponent}</GraphsLayout>
      </div>
    </AppLayout>
  );
};

export default HelperStatisticPage;
