import ReactDOM from 'react-dom/client';
import React from 'react';
import '../node_modules/react-datepicker/dist/react-datepicker.css';
import { AppRoutes } from './routes';
import 'antd/dist/antd.min.css';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './modules/auth/context/AuthContext';
import { CartContextProvider } from './modules/cart/context/CartContext';
import { OrdersProvider } from './modules/orders/context/OrdersContext';
import { AssociativeDataProvider } from './modules/statistic/context/AssociativesContext';
import { LoyaltiesDataProvider } from './modules/statistic/context/LoyaltyContext';
import { UserDataProvider } from './modules/auth/context/UserDataContext';
import { ProductsDataProvider } from "./modules/products/context/ProductsContext";
import GlobalState from './modules/common/context';
import './modules/common/globalStyles/antd.scss';
import './modules/common/globalStyles/app.scss';
import './modules/common/globalStyles/reactDatepicker.scss';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <AuthContextProvider>
    <GlobalState>
      <UserDataProvider>
        <ProductsDataProvider>
          <OrdersProvider>
            <AssociativeDataProvider>
              <LoyaltiesDataProvider>
                <CartContextProvider>
                  <AppRoutes />
                </CartContextProvider>
              </LoyaltiesDataProvider>
            </AssociativeDataProvider>
          </OrdersProvider>
        </ProductsDataProvider>
      </UserDataProvider>
    </GlobalState>
  </AuthContextProvider>,
);

reportWebVitals();
