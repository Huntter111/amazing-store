const calculateOrdersData = (orders) => {
  const allOrders = orders.reduce((acc, order) => {
    acc = [...acc, ...order.cartProducts];
    return acc;
  }, []);

  return allOrders.reduce((acc, order) => {
    acc += order.price.priceAmount;
    return acc;
  }, 0);
};

const setUserLoyalty = ({ loyaltiesData, orders, updateUserDataInfo, userData }) => {
  const sumOrders = calculateOrdersData(orders);
  const loyaltyUser = loyaltiesData?.find((item) => sumOrders >= item.totalAmount);
  if (loyaltyUser && userData) {
    updateUserDataInfo(userData.id, { ...userData, loyalty: loyaltyUser });
  } else {
    updateUserDataInfo(userData.id, { ...userData, loyalty: null });
  }
};
export default setUserLoyalty;
