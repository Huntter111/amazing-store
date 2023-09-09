import React, { useEffect, useMemo, useState } from 'react';
import AppLayout from '../../../common/components/AppLayout';
import { useUserData } from '../../../auth/context/UserDataContext';
import getCountData from '../../helpers/getCountData';

import { COMPONENT_TYPE } from '../../constants';
import AllProducts from '../../components/AllProducts';
import SizeAndPriceGraph from '../../components/SizeAndPriceGraph';
import Control from '../../components/Control';
import GraphsLayout from '../../components/GraphsLayout';

const HelperStatisticPage = () => {
  const { usersData, getAllUsersDataInfo } = useUserData();
  const [graphData, setGraphData] = useState(null);
  const [graphStatisticKey, setGraphStatistic] = useState();

  useEffect(() => {
    getAllUsersDataInfo();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    usersData && setGraphData(getCountData(usersData));
  }, [usersData]);

  useEffect(() => {
    setGraphStatistic(COMPONENT_TYPE.ALL_PRODUCTS);
  }, [])

  const getGraphComponent = useMemo(() => {
    if (graphData) {
      const grapComponents = {
        [COMPONENT_TYPE.ALL_PRODUCTS]: <AllProducts graphData={graphData.generalStatistic} />,
        [COMPONENT_TYPE.SINGLES_PRODUCTS]: <SizeAndPriceGraph {...graphData.singleSizeAndPrice} />,
        [COMPONENT_TYPE.DRINKS_PRODUCTS]: <SizeAndPriceGraph {...graphData.drinksSizeAndPrice} />,
        [COMPONENT_TYPE.SETS_PRODUCTS]: <SizeAndPriceGraph {...graphData.setsSizeAndPrice} />,
      };

      return grapComponents[graphStatisticKey];
    }
  }, [graphStatisticKey, graphData]);

  return (
    <AppLayout>
      <div>
        <Control setGraphStatistic={setGraphStatistic} graphStatisticKey={graphStatisticKey} />
        <GraphsLayout>{getGraphComponent}</GraphsLayout>
      </div>
    </AppLayout>
  );
};

export default HelperStatisticPage;
