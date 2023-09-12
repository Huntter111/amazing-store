import React from 'react';
import AppLayout from '../../../common/components/AppLayout';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../routes/';
import productImg from '../../../../assets/product.png';
import helperImg from '../../../../assets/helper.png';
import styles from './statisticsPage.module.scss';

const StatisticsPage = () => {
  return (
    <AppLayout>
      <nav className={styles.navMenu}>
        <Link to={ROUTES.HELPER_STATISTIC} className={styles.linkButtons}>
          <div className={styles.linkContent}>
            <h1 className={styles.title}>Статистика помічника</h1>
            <img className={styles.image} alt="Helper statistic img" src={helperImg} />
          </div>
        </Link>

        <Link to={ROUTES.PRODUCT_STATISTIC} className={styles.linkButtons}>
          <div className={styles.linkContent}>
            <h1 className={styles.title}>Статистика по продуктах</h1>
            <img className={styles.image} alt="Products statistic img" src={productImg} />
          </div>
        </Link>
      </nav>
    </AppLayout>
  );
};

export default StatisticsPage;
