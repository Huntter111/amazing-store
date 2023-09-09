import React from 'react';
import styles from './graphsLayout.module.scss';

const GraphsLayout = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default GraphsLayout;
