import React from "react";
import InputMask from "react-input-mask";

import InputFieldTitle from "../InputFieldTitle";
import styles from './inputPhoneField.module.scss';

const InputPhoneField = ({
  title,
  required,
  wrapperClassName,
  titleClassName,
  errorMessage,
  titleStyle,
  ...props
}) => {
  return (
    <InputFieldTitle
      required={required}
      title={title || ""}
      errorMessage={errorMessage}
      style={titleStyle}
      className={wrapperClassName}
      titleClassName={titleClassName}
    >
      <InputMask className={styles.input} {...props} mask="(999)999-99-99" maskChar={null} />
    </InputFieldTitle>
  );
};

export default InputPhoneField;
