import React, { useEffect, useState } from 'react';
import AppLayout from '../../../common/components/AppLayout';
import { useUserData } from '../../../auth/context/UserDataContext';
import getCountData from '../../helpers/getCountData';
import Chart from '../../../common/components/Chart';

const ProductsListPage = () => {
  const { usersData, getAllUsersDataInfo } = useUserData();
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    getAllUsersDataInfo();
  }, []);

  useEffect(() => {
    usersData && setGraphData(getCountData(usersData));
  }, [usersData]);

  return (
    <AppLayout>
      {graphData?.map((graphData) => {
        return (
          <Chart
            dataY={graphData.data.y}
            dataX={graphData.data.x}
            title={graphData.title}
            hole={graphData.hole}
            type={graphData.graphType}
          />
        );
      })}
    </AppLayout>
  );
};

export default ProductsListPage;
