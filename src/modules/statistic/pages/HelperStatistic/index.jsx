import React, { useEffect, useMemo, useState } from 'react';

import AppLayout from '../../../common/components/AppLayout';
import { useUserData } from '../../../auth/context/UserDataContext';
import getCountData from '../../helpers/getCountData';

import { COMPONENT_TYPE } from '../../constants';
import AllProducts from '../../components/AllProducts';
import SizeAndPriceGraph from '../../components/SizeAndPriceGraph';
import Control from '../../components/Control';
import GraphsLayout from '../../components/GraphsLayout';
import { useCheckAndProtectAdminRoute } from '../../../common/hooks/useCheckAndProtectAdminRoute';

const HelperStatisticPage = () => {
  const { usersData, getAllUsersDataInfo } = useUserData();
  const [graphData, setGraphData] = useState(null);
  const [graphStatisticKey, setGraphStatistic] = useState();
  const [menuState, setMenuState] = useState(null);

  useCheckAndProtectAdminRoute();

  useEffect(() => {
    getAllUsersDataInfo();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    usersData && setGraphData(getCountData(usersData));
  }, [usersData]);

  useEffect(() => {
    setGraphStatistic(COMPONENT_TYPE.ALL_PRODUCTS);
  }, []);

  const getGraphComponent = useMemo(() => {
    if (graphData) {
      setMenuState('all');
      const grapComponents = {
        [COMPONENT_TYPE.ALL_PRODUCTS]: <AllProducts graphData={graphData.generalStatistic} />,
        [COMPONENT_TYPE.SINGLES_PRODUCTS]: (
          <SizeAndPriceGraph
            setMenuState={setMenuState}
            menuState={menuState}
            {...graphData.singleSizeAndPrice}
          />
        ),
        [COMPONENT_TYPE.DRINKS_PRODUCTS]: (
          <SizeAndPriceGraph
            setMenuState={setMenuState}
            menuState={menuState}
            {...graphData.drinksSizeAndPrice}
          />
        ),
        [COMPONENT_TYPE.SETS_PRODUCTS]: (
          <SizeAndPriceGraph
            setMenuState={setMenuState}
            menuState={menuState}
            {...graphData.setsSizeAndPrice}
          />
        ),
      };

      return grapComponents[graphStatisticKey];
    }
  }, [graphStatisticKey, graphData, menuState]);

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
