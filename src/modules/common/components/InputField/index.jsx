import React from "react";
import { Input } from "antd";
import InputFieldTitle from "../InputFieldTitle";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const InputField = ({
  title,
  required,
  wrapperClassName,
  titleClassName,
  errorMessage,
  titleStyle,
  passwordEye,
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
      {!passwordEye ? (
        <Input {...props} />
      ) : (
        <Input.Password
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          {...props}
        />
      )}
    </InputFieldTitle>
  );
};

export default InputField;
