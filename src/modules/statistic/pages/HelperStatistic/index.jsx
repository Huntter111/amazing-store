import React, {useEffect} from "react";
import AppLayout from "../../../common/components/AppLayout";
import {useUserData} from "../../../auth/context/UserDataContext";
import Plot from 'react-plotly.js';

const ProductsListPage = () => {
  const { usersData, getAllUsersDataInfo } = useUserData();
  
  useEffect(() => {
    getAllUsersDataInfo();
  }, []);

  console.log('usersData', usersData);

    return (
        <AppLayout>
      
      <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          },
          {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
        ]}
        layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
      />
        </AppLayout>
    );
};

export default ProductsListPage;
