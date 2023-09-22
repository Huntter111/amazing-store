import { TYPE_CHART } from '../../common/constants';
const sumPricesInOrder = (order) => {
  return order.cartProducts.reduce((acc, cart) => {
    acc += cart.initialPriceAmount;
    return acc;
  }, 0);
};
const generateDataToGraph = (collectedData) => {
  return {
    x: Object.keys(collectedData),
    y: Object.values(collectedData),
  };
};

const formattedUserList = (products) => {
  const dataOrders = products.reduce(
    (acc, user) => {
      if (acc.fullSummData[user.userInfo.email]) {
        acc.fullSummData[user.userInfo.email] = acc.fullSummData[user.userInfo.email] + sumPricesInOrder(user);
        acc.transactionCountData[user.userInfo.email] = acc.transactionCountData[user.userInfo.email] + 1;
      } else {
        acc.fullSummData[user.userInfo.email] = sumPricesInOrder(user);
        acc.transactionCountData[user.userInfo.email] = 1;
      }
      return acc;
    },
    { fullSummData: {}, transactionCountData: {} },
  );

  const usersName = Object.keys(dataOrders.fullSummData);
  const averagePrices = usersName.reduce((acc, username) => {
    acc[username] = dataOrders.fullSummData[username] / dataOrders.transactionCountData[username];
    return acc;
  }, {});

  return { averagePrices, fullPrices: dataOrders.fullSummData };
};

const calculateSum = (data) => {
  return data.reduce((acc, sum) => {
    acc += sum;
    return acc;
  }, 0);
};
const getUserStatisticData = (products) => {
  const ordersDataList = products && formattedUserList(products);
  const fullPricesDataByUsers = generateDataToGraph(ordersDataList.fullPrices);
  const averagePricesData = generateDataToGraph(ordersDataList.averagePrices);
  const fullOrdersSum = calculateSum(fullPricesDataByUsers.y);
  const averageOrdersSum = calculateSum(averagePricesData.y);
  return {
    graphData: [
      {
        graphType: TYPE_CHART.PIE,
        title: `Продаж продуктів (загальна сума : ${fullOrdersSum.toFixed(2)} грн)`,
        data: fullPricesDataByUsers,
        hole: 0.5,
      },
      {
        graphType: TYPE_CHART.PIE,
        title: `Продаж продуктів (середнiй чек : ${averageOrdersSum.toFixed(2)} грн)`,
        data: averagePricesData,
        hole: 0.5,
      },
    ],
  };
};
export default getUserStatisticData;
