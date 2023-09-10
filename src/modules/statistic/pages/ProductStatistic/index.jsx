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

  useEffect(() => {
    getAllOrdersData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setGraphData(getProductsStatisticData(products, allOrders));
  }, [products, allOrders]);

  return (
    <AppLayout>
      <ProductStatisticFilter setDateRange={setDateRange} />
      <GraphsLayout>
        <AllProducts graphData={graphData} />
      </GraphsLayout>
    </AppLayout>
  );
};

export default ProductStatisticPage;
