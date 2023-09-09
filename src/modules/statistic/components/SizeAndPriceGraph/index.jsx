import React, { useEffect, useMemo } from 'react';
import Chart from '../../../common/components/Chart';
import { useState } from 'react';
import { Select } from 'antd';
import styles from './siezeAndPrice.module.scss';
const { Option } = Select;

const SizeAndPriceGraph = ({ data, graphType, hole, menuState, setMenuState }) => {
  const handlerChangeState = (value) => {
    console.log(value, 'handlerChangeState');
    console.log(menuState, setMenuState);
    setMenuState(value);
  };
  useEffect(() => {
    console.log(menuState, 'menuState');
  }, [menuState]);

  const graphData = useMemo(() => {
    if (!menuState || menuState === 'all') {
      return data;
    }
    return data.filter((data) => {
      return data.title === menuState;
    });
  }, [menuState, data]);

  const SelectWithOptions = useMemo(() => {
    return (
      <Select placeholder="Тип продукту" className={styles.select} onChange={handlerChangeState}>
        <Option value="all" key="all">
          Всi продукти
        </Option>
        {data?.map(({ title }, index) => {
          return (
            <Option value={title} key={title + index}>
              {title}
            </Option>
          );
        })}
      </Select>
    );
  }, [menuState, handlerChangeState]);

  return (
    <>
      {SelectWithOptions}
      <div className={styles.graphWrapper}>
        {graphData?.map(({ title, productCosts, productSizes }, index) => {
          const sizeTitle = `${title} (Розмiр)`;
          const costTitle = `${title} (Цiна)`;

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
    </>
  );
};

export default SizeAndPriceGraph;
