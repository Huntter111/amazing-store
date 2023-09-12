import React, { useEffect, useMemo, useState } from 'react';

import AppLayout from '../../../common/components/AppLayout';
import { useUserData } from '../../../auth/context/UserDataContext';
import getHelperStatisticData from '../../helpers/getHelperStatisticData';

import { COMPONENT_TYPE } from '../../constants';
import AllProducts from '../../components/AllProducts';
import SizeAndPriceGraph from '../../components/SizeAndPriceGraph';
import Control from '../../components/Control';
import GraphsLayout from '../../components/GraphsLayout';

const HelperStatisticPage = () => {
  const { usersData, getAllUsersDataInfo } = useUserData();
  const [graphData, setGraphData] = useState(null);
  const [graphStatisticKey, setGraphStatistic] = useState();
  const [menuState, setMenuState] = useState(null);

  useEffect(() => {
    getAllUsersDataInfo();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    usersData && setGraphData(getHelperStatisticData(usersData));
  }, [usersData]);

  useEffect(() => {
    setGraphStatistic(COMPONENT_TYPE.ALL_PRODUCTS);
  }, []);

  const getGraphComponent = useMemo(() => {
    if (graphData) {
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
        <Control
          setGraphStatistic={setGraphStatistic}
          setMenuState={setMenuState}
          graphStatisticKey={graphStatisticKey}
        />
        <GraphsLayout>{getGraphComponent}</GraphsLayout>
      </div>
    </AppLayout>
  );
};

export default HelperStatisticPage;
