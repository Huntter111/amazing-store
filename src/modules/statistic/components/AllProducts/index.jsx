import React from 'react';
import Chart from '../../../common/components/Chart';
import styles from './allProducts.module.scss';

const AllProducts = ({ graphData }) => {
  return (
    <div className={styles.graphWrapper}>
      {graphData?.map((graphData) => {
        return (
          <Chart
            key={graphData.title + graphData.data.x}
            dataY={graphData.data.y}
            dataX={graphData.data.x}
            title={graphData.title}
            hole={graphData.hole}
            type={graphData.graphType}
          />
        );
      })}
    </div>
  );
};

export default AllProducts;
