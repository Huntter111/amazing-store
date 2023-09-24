import React from "react";
import { Layout } from "antd";
import styles from "./appLayout.module.scss";

const AppLayout = ({ children }) => {
  return (
    <Layout className={styles.layout}>
      <div className={styles.wrapper}>{children}</div>
    </Layout>
  );
};

export default AppLayout;
