import React from 'react';
import Chart from '../../../common/components/Chart';

const SizeAndPriceGraph = ({ data, graphType, hole }) => {
  console.log(data, 'data');
  return (
    <div>
      <div>asas</div>
      {data?.map(({ title, productCosts, productSizes }, index) => {
        const sizeTitle = `${title} (Розмiр)`;
        const costTitle = `${title} ('Цiна')`;
        return (
          <React.Fragment key={index}>
            <Chart
              key={costTitle}
              dataY={productCosts.y}
              dataX={productCosts.x}
              title={costTitle}
              hole={hole}
              type={graphType}
            />
            <Chart
              key={sizeTitle}
              dataY={productSizes.y}
              dataX={productSizes.x}
              title={sizeTitle}
              hole={hole}
              type={graphType}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default SizeAndPriceGraph;
