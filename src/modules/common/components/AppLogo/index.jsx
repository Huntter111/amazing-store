import React from "react";
import styles from "./logo.module.scss";

const AppLogo = ({ className }) => {
  return <div className={`${styles.logo} ${className}`}>Amazing Pizza</div>;
};

export default AppLogo;
