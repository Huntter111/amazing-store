import React from "react";
import AppLayout from "../../../common/components/AppLayout";
import OrdersList from '../../components/OrdersList';

const OrdersListPage = () => {
  return (
    <AppLayout>
      <OrdersList />
    </AppLayout>
  );
};

export default OrdersListPage;
