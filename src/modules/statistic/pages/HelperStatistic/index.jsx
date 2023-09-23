import React, { useEffect, useMemo, useState } from 'react';

import AppLayout from '../../../common/components/AppLayout';
import { useUserData } from '../../../auth/context/UserDataContext';
import getHelperStatisticData from '../../helpers/getHelperStatisticData';

import {HELPER_COMPONENT_TITLES, HELPER_COMPONENT_TYPE, STATISTIC_PRODUCT_TYPES} from '../../constants';
import AllProducts from '../../components/AllProducts';
import SizeAndPriceGraph from '../../components/SizeAndPriceGraph';
import Control from '../../components/Control';
import GraphsLayout from '../../components/GraphsLayout';

const HelperStatisticPage = () => {
  const { usersData, getAllUsersDataInfo } = useUserData();
  const [graphData, setGraphData] = useState(null);
  const [graphStatisticKey, setGraphStatisticKey] = useState();
  const [menuState, setMenuState] = useState(null);
  const controlButtons = [
    { key: HELPER_COMPONENT_TYPE.ALL_PRODUCTS, title: HELPER_COMPONENT_TITLES.ALL_PRODUCTS },
    { key: HELPER_COMPONENT_TYPE.SINGLES_PRODUCTS, title: HELPER_COMPONENT_TITLES.SINGLES_PRODUCTS },
    { key: HELPER_COMPONENT_TYPE.SETS_PRODUCTS, title: HELPER_COMPONENT_TITLES.SETS_PRODUCTS },
    { key: HELPER_COMPONENT_TYPE.DRINKS_PRODUCTS, title: HELPER_COMPONENT_TITLES.DRINKS_PRODUCTS },
  ];

  useEffect(() => {
    if(!usersData?.length) getAllUsersDataInfo();
    // eslint-disable-next-line
  }, [usersData]);

  useEffect(() => {
    usersData && setGraphData(getHelperStatisticData(usersData));
  }, [usersData]);

  useEffect(() => {
    setGraphStatisticKey(HELPER_COMPONENT_TYPE.ALL_PRODUCTS);
  }, []);

  const getGraphComponent = useMemo(() => {
    if (graphData) {
      const grapComponents = {
        [HELPER_COMPONENT_TYPE.ALL_PRODUCTS]: <AllProducts graphData={graphData.generalStatistic} />,
        [HELPER_COMPONENT_TYPE.SINGLES_PRODUCTS]: (
          <SizeAndPriceGraph
            setMenuState={setMenuState}
            menuState={menuState}
            {...graphData.singleSizeAndPrice}
          />
        ),
        [HELPER_COMPONENT_TYPE.DRINKS_PRODUCTS]: (
          <SizeAndPriceGraph
            setMenuState={setMenuState}
            menuState={menuState}
            {...graphData.drinksSizeAndPrice}
          />
        ),
        [HELPER_COMPONENT_TYPE.SETS_PRODUCTS]: (
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
      <Control
        buttons={controlButtons}
        controlKey={graphStatisticKey}
        setControlKey={setGraphStatisticKey}
        callback={() => setMenuState(STATISTIC_PRODUCT_TYPES.ALL)}
      />
      <GraphsLayout>{getGraphComponent}</GraphsLayout>
    </AppLayout>
  );
};

export default HelperStatisticPage;
