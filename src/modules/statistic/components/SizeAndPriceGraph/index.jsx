import React, { useCallback, useMemo } from 'react';
import Chart from '../../../common/components/Chart';
import styles from './siezeAndPrice.module.scss';
import AppDropDown from '../../../common/components/AppDropDown';
import {STATISTIC_PRODUCT_TYPES} from "../../constants";

const SizeAndPriceGraph = ({ data, graphType, hole, menuState, setMenuState }) => {
  const handlerChangeState = useCallback(
    (value) => {
      setMenuState(value);
    },
    [setMenuState],
  );

  const graphData = useMemo(() => {
    if (!menuState || menuState.toUpperCase() === STATISTIC_PRODUCT_TYPES.ALL) {
      return data;
    }
    return data.filter((data) => {
      return data.title === menuState;
    });
  }, [menuState, data]);

  const SelectWithOptions = useMemo(() => {
    return (
      <AppDropDown
        initialOptionKey={STATISTIC_PRODUCT_TYPES.ALL}
        allOptionTitle="Всi продукти"
        arrayTypes={data}
        handleSelect={handlerChangeState}
        styles={styles.select}
        value={menuState}
        placeholder="Всi продукти"
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
