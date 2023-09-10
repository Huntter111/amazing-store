import { createContext, useContext} from "react";
import { notification } from "antd";

import useOrdersDB from '../../../api/orders';

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const { orders, allOrders, createOrder, getOrders, getAllOrders } = useOrdersDB();

  const getOrdersData = async (email) => {
    try {
      await getOrders(email);
    } catch (error) {
      notification.error({
        message: "Не вдалося отримати даних замовлень",
        description:
          "На жаль не вдалося отримати даних замовлень, спробуйте пізніше",
      });
    }
  };

  const getAllOrdersData = async () => {
    try {
      await getAllOrders();
    } catch (error) {
      notification.error({
        message: "Не вдалося отримати даних замовлень",
        description:
          "На жаль не вдалося отримати даних замовлень, спробуйте пізніше",
      });
    }
  };

  const createOrderData = async (data) => {
    try {
      await createOrder(data);
      notification.success({
        message: "Дякуємо за замовлення",
        description:
          "Ваше замовлення буде виконано в найкоротший срок",
      });
    } catch (error) {
      notification.error({
        message: "Не вдалося додати даних замовлення",
        description:
          "На жаль не вдалося додати даних замовлення, спробуйте пізніше",
      });
    }
  };

  return (
    <OrdersContext.Provider value={{ orders, allOrders, getOrdersData, getAllOrdersData, createOrderData }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  return useContext(OrdersContext);
};
