import React from "react";
import { Layout } from "antd";
import AppHeader from "../AppHeader";
import styles from "./appLayout.module.scss";

const AppLayout = ({ children }) => {
  return (
    <Layout className={styles.layout}>
      <AppHeader />
      <div className={styles.wrapper}>{children}</div>
    </Layout>
  );
};

export default AppLayout;
