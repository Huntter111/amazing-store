import { Button } from "antd";
import { BUTTON_TYPE } from "../../constants";
import React from "react";
import styles from "./button.module.scss";

const AppButton = ({ type, name, className, onClick, disabled }) => {
  if (type === BUTTON_TYPE.PRIMARY) {
    return (
      <Button
        disabled={disabled}
        className={`${
          disabled ? styles.disabledButton : styles.primaryButton
        } ${className}`}
        onClick={onClick}
      >
        {name}
      </Button>
    );
  }
  if (type === BUTTON_TYPE.DEFAULT) {
    return (
      <Button
        disabled={disabled}
        className={`${
          disabled ? styles.disabledButton : styles.defaultButton
        } ${className}`}
        onClick={onClick}
      >
        {name}
      </Button>
    );
  }
};

export default AppButton;
