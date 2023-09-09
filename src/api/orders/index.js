import { useState } from "react";
import { db, collection, getDocs, addDoc } from "../";

const useOrdersDB = () => {
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);

  const ordersRef = collection(db, "orders");

  const createOrder = async (data) => {
    await addDoc(ordersRef, data);
  };

  const getOrders = async (email) => {
    const data = await getDocs(ordersRef);
    const formatedData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    const ordersByEmail = formatedData.filter(
      ({ userInfo }) => userInfo.email === email
    );

    setOrders(ordersByEmail);
  };

  const getAllOrders = async (email) => {
    const data = await getDocs(ordersRef);
    const formatedData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setAllOrders(formatedData);
  };

  return { orders, allOrders, createOrder, getOrders, getAllOrders };
};

export default useOrdersDB;
