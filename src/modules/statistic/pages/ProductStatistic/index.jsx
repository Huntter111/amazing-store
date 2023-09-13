import React, { useEffect, useState } from 'react';
import AppLayout from '../../../common/components/AppLayout';
import getProductsStatisticData from '../../helpers/getProductsStatisticData';
import { useOrders } from '../../../orders/context/OrdersContext';
import { useGlobalContext } from '../../../common/context';
import ProductStatisticFilter from '../../components/ProductStatisticFilter';
import GraphsLayout from '../../components/GraphsLayout';
import AllProducts from '../../components/AllProducts';
import {STATISTIC_PRODUCT_TYPES} from "../../constants";

const ProductStatisticPage = () => {
  const { products } = useGlobalContext();
  const { allOrders, getAllOrdersData } = useOrders();
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [filter, setFilter] = useState({
    productType: {name: "Всі продукти", type: STATISTIC_PRODUCT_TYPES.ALL},
    productSubType: {name: "Всі продукти", type: STATISTIC_PRODUCT_TYPES.ALL}
  });
  const [graphData, setGraphData] = useState(null);
  const [highlightDates, setHighlightDates] = useState(null);

  useEffect(() => {
    getAllOrdersData();
    // eslint-disable-next-line
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

  return (
    <AppLayout>
      <ProductStatisticFilter setDateRange={setDateRange} highlightDates={highlightDates} filter={filter} setFilter={setFilter} />
      <GraphsLayout>
        <AllProducts graphData={graphData} />
      </GraphsLayout>
    </AppLayout>
  );
};

export default ProductStatisticPage;
