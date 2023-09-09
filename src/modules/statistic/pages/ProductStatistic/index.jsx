import React, {useEffect} from 'react';
import AppLayout from '../../../common/components/AppLayout';
import getProductsStatisticData from "../../helpers/getProductsStatisticData";
import {useOrders} from "../../../orders/context/OrdersContext";
import {useGlobalContext} from "../../../common/context";

const ProductStatisticPage = () => {
  const { products } = useGlobalContext();
  const { allOrders, getAllOrdersData } = useOrders();

  useEffect(() => {
    getAllOrdersData()
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getProductsStatisticData(products, allOrders);
  }, [products, allOrders]);

  return (
    <AppLayout>
      <div>ProductStatisticPage</div>
    </AppLayout>
  );
};

export default ProductStatisticPage;
