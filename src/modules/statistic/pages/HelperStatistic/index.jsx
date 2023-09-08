import React, {useEffect} from "react";
import AppLayout from "../../../common/components/AppLayout";
import { Chart, registerables } from 'chart.js';

import { Bar } from 'react-chartjs-2';
import {useUserData} from "../../../auth/context/UserDataContext";


const ProductsListPage = () => {
  const { usersData, getAllUsersDataInfo } = useUserData();

  useEffect(() => {
    getAllUsersDataInfo();
  }, []);

  console.log('usersData', usersData);

    Chart.register(...registerables);
    const data= {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      }
      const  options= {
        scales: {
          y: {
            beginAtZero: true
          }
        }
    }
    return (
        <AppLayout>
        <Bar
      data={data}
      options={options}
        />

        </AppLayout>
    );
};

export default ProductsListPage;
