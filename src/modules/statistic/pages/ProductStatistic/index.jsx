import React, { useEffect, useState } from 'react';
import AppLayout from '../../../common/components/AppLayout';
import getProductsStatisticData from '../../helpers/getProductsStatisticData';
import { useOrders } from '../../../orders/context/OrdersContext';
import { useGlobalContext } from '../../../common/context';
import ProductStatisticFilter from '../../components/ProductStatisticFilter';

const ProductStatisticPage = () => {
  const { products } = useGlobalContext();
  const { allOrders, getAllOrdersData } = useOrders();
  const [dateRange, setDateRange] = useState({ from: null, to: null });

  useEffect(() => {
    getAllOrdersData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(getProductsStatisticData(products, allOrders));
  }, [products, allOrders]);

  return (
    <AppLayout>
      <ProductStatisticFilter setDateRange={setDateRange} />
      <div>graph</div>
    </AppLayout>
  );
};

export default ProductStatisticPage;
