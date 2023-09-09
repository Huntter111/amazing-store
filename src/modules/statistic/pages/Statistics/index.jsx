import React from 'react';
import AppLayout from '../../../common/components/AppLayout';
import { Link } from 'react-router-dom';

const StatisticsPage = () => {
  return (
    <AppLayout>
      <button>
        <Link to={'/helper-statistic'}>Helper</Link>
      </button>
      <button>
        <Link to={'/product-statistic'}>product</Link>
      </button>
    </AppLayout>
  );
};

export default StatisticsPage;
