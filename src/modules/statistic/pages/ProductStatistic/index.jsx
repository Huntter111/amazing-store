import React, {useEffect, useMemo, useState} from 'react';
import AppLayout from '../../../common/components/AppLayout';
import getProductsStatisticData from '../../helpers/getProductsStatisticData';
import { useOrders } from '../../../orders/context/OrdersContext';
import { useGlobalContext } from '../../../common/context';
import ProductStatisticFilter from '../../components/ProductStatisticFilter';
import GraphsLayout from '../../components/GraphsLayout';
import AllProducts from '../../components/AllProducts';
import {
  PRODUCTS_COMPONENT_TITLES,
  PRODUCTS_COMPONENT_TYPE,
  STATISTIC_PRODUCT_TYPES
} from "../../constants";
import Control from "../../components/Control";

const ProductStatisticPage = () => {
  const { products } = useGlobalContext();
  const { allOrders, getAllOrdersData } = useOrders();
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [controlKey, setControlKey] = useState();
  const [filter, setFilter] = useState({
    productType: {name: "Всі продукти", type: STATISTIC_PRODUCT_TYPES.ALL},
    productSubType: {name: "Всі продукти", type: STATISTIC_PRODUCT_TYPES.ALL}
  });
  const [graphData, setGraphData] = useState(null);
  const [highlightDates, setHighlightDates] = useState(null);
  const controlButtons = [
    { key: PRODUCTS_COMPONENT_TYPE.PRODUCTS_STATISTIC, title: PRODUCTS_COMPONENT_TITLES.PRODUCTS_STATISTIC },
    { key: PRODUCTS_COMPONENT_TYPE.PRODUCTS_ASSOTIATIONS, title: PRODUCTS_COMPONENT_TITLES.PRODUCTS_ASSOTIATIONS },
    { key: PRODUCTS_COMPONENT_TYPE.PRODUCTS_GROUPS, title: PRODUCTS_COMPONENT_TITLES.PRODUCTS_GROUPS },
  ];

  useEffect(() => {
    getAllOrdersData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setControlKey(PRODUCTS_COMPONENT_TYPE.PRODUCTS_STATISTIC);
  }, []);

  //from, to, type
  useEffect(() => {
    const { from, to } = dateRange;
    const { graphData, datepickerHighlightDates } = getProductsStatisticData(
      products,
      allOrders,
      from,
      to,
      filter?.productType.type,
      filter?.productSubType.type
    );

    setHighlightDates(datepickerHighlightDates);
    setGraphData(graphData);
  }, [products, allOrders, dateRange, filter]);

  const getComponent = useMemo(() => {
    if (graphData) {
      const components = {
        [PRODUCTS_COMPONENT_TYPE.PRODUCTS_STATISTIC]: (
          <>
            <ProductStatisticFilter setDateRange={setDateRange} highlightDates={highlightDates} filter={filter} setFilter={setFilter} />
            <GraphsLayout>
              <AllProducts graphData={graphData} />
            </GraphsLayout>
          </>
        ),
        [PRODUCTS_COMPONENT_TYPE.PRODUCTS_ASSOTIATIONS]: (
          <div>PRODUCTS_COMPONENT_TYPE.PRODUCTS_ASSOTIATIONS</div>
        ),
        [PRODUCTS_COMPONENT_TYPE.PRODUCTS_GROUPS]: (
          <div>PRODUCTS_COMPONENT_TYPE.PRODUCTS_GROUPS</div>
        ),
      };

      return components[controlKey];
    }
  }, [controlKey, filter, graphData, highlightDates]);

  return (
    <AppLayout>
      <Control
        buttons={controlButtons}
        controlKey={controlKey}
        setControlKey={setControlKey}
      />
      {getComponent}
    </AppLayout>
  );
};

export default ProductStatisticPage;
