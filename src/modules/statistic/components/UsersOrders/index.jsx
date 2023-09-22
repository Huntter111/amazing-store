import React from 'react';
import Chart from '../../../common/components/Chart';
import styles from './usersOrders.module.scss';

const UsersOrders = ({ graphData }) => {
  return (
    <div className={styles.graphWrapper}>
      {graphData?.map((graphData) => {
        return <Chart key={graphData.title + graphData.data.x} dataY={graphData.data.y} dataX={graphData.data.x} title={graphData.title} hole={graphData.hole} type={graphData.graphType} hovertemplate={graphData.hovertemplate} />;
      })}
    </div>
  );
};

export default UsersOrders;
