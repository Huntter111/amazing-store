import React from 'react';
import Chart from '../../../common/components/Chart';
import { COMPONENT_TITLES, INFO_PAGE_TITLE } from '../../constants';
import styles from './drinksProducts.module.scss';

const DrinksProducts = ({ graphData }) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <h3>{INFO_PAGE_TITLE}</h3>
        <h4>"{COMPONENT_TITLES.DRINKS_PRODUCTS_TITLE.toLowerCase()}"</h4>
      </div>
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

export default DrinksProducts;
