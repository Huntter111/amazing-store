import React, { useCallback, useMemo } from 'react';
import Chart from '../../../common/components/Chart';
import { Select } from 'antd';
import styles from './siezeAndPrice.module.scss';
import ProductDropDown from '../../../products/components/ProductDropDown';
const { Option } = Select;

const SizeAndPriceGraph = ({ data, graphType, hole, menuState, setMenuState }) => {
  const handlerChangeState = useCallback(
    (value) => {
      setMenuState(value);
    },
    [setMenuState],
  );

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
      <ProductDropDown
        initialOptionKey="all"
        allOptionTitle="Всi продукти"
        arrayTypes={data}
        handleSelect={handlerChangeState}
        styles={styles.select}
        value={menuState}
      />
    );
    // eslint-disable-next-line
  }, [menuState, handlerChangeState, data]);

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
