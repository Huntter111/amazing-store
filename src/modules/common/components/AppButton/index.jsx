import { Button } from "antd";
import { BUTTON_TYPE } from "../../constants";
import React from "react";
import styles from "./button.module.scss";

const AppButton = ({ type, name, className, onClick }) => {
  if (type === BUTTON_TYPE.PRIMARY) {
    return (
      <Button
        className={`${styles.primaryButton} ${className}`}
        onClick={onClick}
      >
        {name}
      </Button>
    );
  }
  if (type === BUTTON_TYPE.DEFAULT) {
    return (
      <Button
        className={`${styles.defaultButton} ${className}`}
        onClick={onClick}
      >
        {name}
      </Button>
    );
  }
};

export default AppButton;
