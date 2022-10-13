import React from "react";
import { Layout } from "antd";
import Header from "../Header";
import styles from "./appLayout.module.scss";

const AppLayout = ({ children }) => {
  return (
    <Layout className={styles.layout}>
      <Header />
      <div className={styles.wrapper}>{children}</div>
    </Layout>
  );
};

export default AppLayout;
