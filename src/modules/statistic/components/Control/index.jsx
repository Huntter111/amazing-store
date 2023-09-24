import React from 'react';
import AppButton from '../../../common/components/AppButton';
import { BUTTON_TYPE } from '../../../common/constants/';
import styles from './control.module.scss';

const Control = ({ buttons, setControlKey, controlKey, callback }) => {
  const handleChange = (key) => {
    callback && callback();
    setControlKey(key);
  };

  return (
    <div className={styles.wrapper}>
      {buttons.map((button) => {
        return (
          <AppButton
            className={controlKey === button.key ? styles.activeBtn : ''}
            type={BUTTON_TYPE.DEFAULT}
            name={button.title}
            key={button.title}
            onClick={() => handleChange(button.key)}
          />
        );
      })}
    </div>
  );
};

export default Control;
