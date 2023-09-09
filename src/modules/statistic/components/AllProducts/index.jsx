import React from 'react';
import Chart from '../../../common/components/Chart';

const AllProducts = ({ graphData }) => {
  return (
    <div>
      <div>asas</div>
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
