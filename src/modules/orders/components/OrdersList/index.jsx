import { Breadcrumb } from "antd";
import { useEffect } from "react";

import OrderItem from "../OrderItem";
import { ROUTES } from "../../../../routes";
import { useUserAuth } from "../../../auth/context/AuthContext";
import { useOrders } from "../../context/OrdersContext";

import styles from "./ordersList.module.scss";

const OrdersList = () => {
  const { orders, getOrdersData } = useOrders();
  const { user } = useUserAuth();

  useEffect(() => {
    user && getOrdersData(user.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Breadcrumb className={styles.breadcrumbs} separator=">">
        <Breadcrumb.Item href={ROUTES.PRODUCTS_LIST}>
          Список продуктів
        </Breadcrumb.Item>
        <Breadcrumb.Item>Історія замовлень</Breadcrumb.Item>
      </Breadcrumb>
      <div className={styles.listWrapper}>
        <h1 className={styles.title}>Мої замовлення</h1>
        {orders.map(({ orderNumber, orderDate, id, cartProducts }) => {
          const totalAmount = cartProducts.reduce((acc, item) => {
            return acc + item.price.priceAmount;
          }, 0);

          return (
            <OrderItem
              key={id}
              {...{ orderNumber, orderDate, id, cartProducts, totalAmount }}
            />
          );
        })}
      </div>
    </>
  );
};

export default OrdersList;
