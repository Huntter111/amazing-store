import React from "react";
import { Form } from "antd";
import classnames from "classnames";
import styles from "./inputFieldTitle.module.scss";

const InputFieldTitle = ({
  title,
  required = true,
  errorMessage,
  className,
  titleClassName,
  children,
  style,
}) => {
  return (
    <div className={classnames([styles.inputWrapper, className])} style={style}>
      <div className={styles.inputInfo}>
        {required && <span className={styles.asterisk}>*</span>}{" "}
        <span className={classnames([styles.title, titleClassName])}>
          {title}
        </span>
      </div>
      <Form.Item
        className={errorMessage ? styles.errorMassage : ""}
        validateStatus={errorMessage ? "error" : undefined}
        help={errorMessage}
      >
        {children}
      </Form.Item>
    </div>
  );
};

export default InputFieldTitle;
