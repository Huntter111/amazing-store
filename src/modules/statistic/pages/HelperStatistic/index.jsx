import React, { useEffect } from 'react';
import AppLayout from '../../../common/components/AppLayout';
import { useUserData } from '../../../auth/context/UserDataContext';
// import { SINGLE_PRODUCT, SET_PRODUCTS } from
const ProductsListPage = () => {
  const { usersData, getAllUsersDataInfo } = useUserData();

  useEffect(() => {
    getAllUsersDataInfo();
  }, []);

  return <AppLayout></AppLayout>;
};

export default ProductsListPage;
