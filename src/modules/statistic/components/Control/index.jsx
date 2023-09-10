import React from 'react';
import { COMPONENT_TYPE, COMPONENT_TITLES } from '../../constants';
import AppButton from '../../../common/components/AppButton';
import { BUTTON_TYPE } from '../../../common/constants/';
import styles from './control.module.scss';

const Control = ({ setGraphStatistic, graphStatisticKey, setMenuState }) => {
  const buttonsInfo = [
    { keyGraph: COMPONENT_TYPE.ALL_PRODUCTS, title: COMPONENT_TITLES.ALL_PRODUCTS_TITLE },
    { keyGraph: COMPONENT_TYPE.SINGLES_PRODUCTS, title: COMPONENT_TITLES.SINGLES_PRODUCTS_TITLE },
    { keyGraph: COMPONENT_TYPE.SETS_PRODUCTS, title: COMPONENT_TITLES.SETS_PRODUCTS_TITLE },
    { keyGraph: COMPONENT_TYPE.DRINKS_PRODUCTS, title: COMPONENT_TITLES.DRINKS_PRODUCTS_TITLE },
  ];
  const hendlerChangesGraphStatistic = (key) => {
    setMenuState('all')
    setGraphStatistic(key);
  };

  return (
    <div className={styles.wrapper}>
      {buttonsInfo.map((button, i) => {
        return (
          <AppButton
            className={graphStatisticKey === button.keyGraph ? styles.activeBtn : ''}
            type={BUTTON_TYPE.DEFAULT}
            name={button.title}
            key={button.title}
            onClick={() => hendlerChangesGraphStatistic(button.keyGraph)}
          />
        );
      })}
    </div>
  );
};

export default Control;
