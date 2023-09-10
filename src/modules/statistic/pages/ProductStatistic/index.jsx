import React, { useEffect, useState } from 'react';
import AppLayout from '../../../common/components/AppLayout';
import getProductsStatisticData from '../../helpers/getProductsStatisticData';
import { useOrders } from '../../../orders/context/OrdersContext';
import { useGlobalContext } from '../../../common/context';
import ProductStatisticFilter from '../../components/ProductStatisticFilter';
import GraphsLayout from '../../components/GraphsLayout';
import AllProducts from '../../components/AllProducts';

const ProductStatisticPage = () => {
  const { products } = useGlobalContext();
  const { allOrders, getAllOrdersData } = useOrders();
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [graphData, setGraphData] = useState(null);
  const [highlightDates, setHighlightDates] = useState(null);

  const { from, to } = dateRange;
  useEffect(() => {
    getAllOrdersData();
    // eslint-disable-next-line
  }, []);

  //from, to, type
  useEffect(() => {
    const { graphData, datepickerHighlightDates } = getProductsStatisticData(
      products,
      allOrders,
      from,
      to,
    );

    setHighlightDates(datepickerHighlightDates);
    setGraphData(graphData);
  }, [products, allOrders, from, to]);

  return (
    <AppLayout>
      <ProductStatisticFilter setDateRange={setDateRange} highlightDates={highlightDates} />
      <GraphsLayout>
        <AllProducts graphData={graphData} />
      </GraphsLayout>
    </AppLayout>
  );
};

export default ProductStatisticPage;
