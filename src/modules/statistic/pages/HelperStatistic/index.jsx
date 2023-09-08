import React, { useEffect } from 'react';
import AppLayout from '../../../common/components/AppLayout';
import { useUserData } from '../../../auth/context/UserDataContext';
import getCountData from '../../helpers/getCountData';

const ProductsListPage = () => {
  const { usersData, getAllUsersDataInfo } = useUserData();

  useEffect(() => {
    getAllUsersDataInfo();
    getCountData(usersData);
  }, []);

  return <AppLayout></AppLayout>;
};

export default ProductsListPage;
