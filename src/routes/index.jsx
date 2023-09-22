import React, { useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ProductInfoPage, ProductsListPage } from '../modules/products';
import { OrdersListPage } from '../modules/orders';
import { CartPage } from '../modules/cart';
import StatisticsPage from '../modules/statistic/pages/Statistics';
import { HelperStatisticPage } from '../modules/statistic';
import ProductStatisticPage from '../modules/statistic/pages/ProductStatistic';
import UserStatistic from '../modules/statistic/pages/UserStatistic';
import NotFoundPage from '../modules/common/pages/NotFound';
import { useUserAuth } from '../modules/auth/context/AuthContext';
import { USER_ADMIN_EMAIL } from '../env';

export const ROUTES = {
  PRODUCTS_LIST: '/',
  PRODUCT: '/product',
  PRODUCT_INFO: '/product/:id',
  ORDERS_LIST: '/orders',
  CART: '/cart',
  HELPER_STATISTIC: '/helper-statistic',
  PRODUCT_STATISTIC: '/product-statistic',
  USER_STATISTIC: '/user-statistic',
  STATISTICS: '/statistics',
};

export const AppRoutes = () => {
  const { user } = useUserAuth();

  const publicRoutes = useMemo(
    () => (
      <>
        <Route path={ROUTES.PRODUCTS_LIST} element={<ProductsListPage />} />
        <Route path={ROUTES.PRODUCT_INFO} element={<ProductInfoPage />} />
        <Route path={ROUTES.ORDERS_LIST} element={<OrdersListPage />} />
        <Route path={ROUTES.CART} element={<CartPage />} />
      </>
    ),
    [],
  );

  const privateRoutes = useMemo(
    () => (
      <>
        <Route path={ROUTES.STATISTICS} element={<StatisticsPage />} />
        <Route path={ROUTES.HELPER_STATISTIC} element={<HelperStatisticPage />} />
        <Route path={ROUTES.PRODUCT_STATISTIC} element={<ProductStatisticPage />} />
        <Route path={ROUTES.USER_STATISTIC} element={<UserStatistic />} />
      </>
    ),
    [],
  );

  return useMemo(() => {
    const isRouteExist = Object.values(ROUTES).includes(window.location.pathname);
    return (
      <Router>
        <Routes>
          {publicRoutes}
          {user?.email === USER_ADMIN_EMAIL && privateRoutes}
          {!isRouteExist && <Route path="*" element={<NotFoundPage />} />}
        </Routes>
      </Router>
    );
  }, [privateRoutes, publicRoutes, user?.email]);
};
