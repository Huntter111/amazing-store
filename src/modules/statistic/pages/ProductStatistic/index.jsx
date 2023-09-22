import React, {useEffect, useMemo, useState} from 'react';
import AppLayout from '../../../common/components/AppLayout';
import getProductsStatisticData from '../../helpers/getProductsStatisticData';
import { useOrders } from '../../../orders/context/OrdersContext';
import { useGlobalContext } from '../../../common/context';
import ProductStatisticFilter from '../../components/ProductStatisticFilter';
import GraphsLayout from '../../components/GraphsLayout';
import AllProducts from '../../components/AllProducts';
import {
  ASSOCIATIONS_CONFIDENCE_TITLE,
  ASSOCIATIONS_SUPPORT_TITLE,
  PRODUCTS_COMPONENT_TITLES,
  PRODUCTS_COMPONENT_TYPE,
  STATISTIC_PRODUCT_TYPES
} from "../../constants";
import Control from "../../components/Control";
import AssociativeProducts from "../../components/AssociativeProducts";
import ProductsGroups from "../../components/ProductsGroups";

const ProductStatisticPage = () => {
  const { products } = useGlobalContext();
  const { allOrders, getAllOrdersData } = useOrders();
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [controlKey, setControlKey] = useState();
  const [productStatisticFilter, setProductStatisticFilter] = useState({
    productType: {name: "Всі продукти", type: STATISTIC_PRODUCT_TYPES.ALL},
    productSubType: {name: "Всі продукти", type: STATISTIC_PRODUCT_TYPES.ALL}
  });
  const [associativesFilter, setAssociativesFilter] = useState({
    product: {name: "Всі продукти", type: STATISTIC_PRODUCT_TYPES.ALL},
    associationSupport: {name: ASSOCIATIONS_SUPPORT_TITLE.FIVE, type: Object.keys(ASSOCIATIONS_SUPPORT_TITLE)[0]},
    associationConfidence: {name: ASSOCIATIONS_CONFIDENCE_TITLE.TEN, type:  Object.keys(ASSOCIATIONS_CONFIDENCE_TITLE)[0]}
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
      productStatisticFilter?.productType.type,
      productStatisticFilter?.productSubType.type
    );

    setHighlightDates(datepickerHighlightDates);
    setGraphData(graphData);
  }, [products, allOrders, dateRange, productStatisticFilter]);

  const getComponent = useMemo(() => {
    if (graphData) {
      const components = {
        [PRODUCTS_COMPONENT_TYPE.PRODUCTS_STATISTIC]: (
          <>
            <ProductStatisticFilter
              setDateRange={setDateRange}
              highlightDates={highlightDates}
              filter={productStatisticFilter}
              setFilter={setProductStatisticFilter}
            />
            <GraphsLayout>
              <AllProducts graphData={graphData} />
            </GraphsLayout>
          </>
        ),
        [PRODUCTS_COMPONENT_TYPE.PRODUCTS_ASSOTIATIONS]: (
          <AssociativeProducts
            orders={allOrders}
            filter={associativesFilter}
            setFilter={setAssociativesFilter}
          />
        ),
        [PRODUCTS_COMPONENT_TYPE.PRODUCTS_GROUPS]: (
          <ProductsGroups />
        ),
      };

      return components[controlKey];
    }
  }, [
    graphData,
    highlightDates,
    productStatisticFilter,
    associativesFilter,
    controlKey
  ]);

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
