import React, { useEffect, useState } from 'react';
import AppLayout from '../../../common/components/AppLayout';
import { useUserData } from '../../../auth/context/UserDataContext';
import getCountData from '../../helpers/getCountData';
import Chart from '../../../common/components/Chart';
import styles from './helperStatistic.module.scss';

const HelperStatisticPage = () => {
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
      <div className={styles.wrapper}>
        {graphData?.map((graphData, idx) => {
          return (
              <Chart
                key={graphData.title + idx}
                dataY={graphData.data.y}
                dataX={graphData.data.x}
                title={graphData.title}
                hole={graphData.hole}
                type={graphData.graphType}
              />
          );
        })}
      </div>
    </AppLayout>
  );
};

export default HelperStatisticPage;
