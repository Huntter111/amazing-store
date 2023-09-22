import { TYPE_CHART } from '../../common/constants';
import moment from 'moment';

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

const getFilteredOrdersData = (ordersList, from, to) => {
  if (from && to) {
    return ordersList.filter((item) => {
      return !moment(item.orderDate).isBefore(from, 'date') && !moment(item.orderDate).isAfter(to, 'date');
    });
  }
  return ordersList;
};

const getHighlightDates = (ordersList) => {
  if (ordersList.length) {
    return ordersList
      ?.reduce((acc, date) => {
        if (!acc.includes(date?.orderDate)) {
          return [...acc, date.orderDate];
        }
        return acc;
      }, [])
      .map((_) => moment(_, 'M/D/YYYY').subtract(0, 'days').toDate());
  }
};
const getUserStatisticData = (products, from, to) => {
  const filteredData = products && getFilteredOrdersData(products, from, to);
  const ordersDataList = filteredData && formattedUserList(filteredData);
  const fullPricesDataByUsers = generateDataToGraph(ordersDataList.fullPrices);
  const averagePricesData = generateDataToGraph(ordersDataList.averagePrices);
  const fullOrdersSum = calculateSum(fullPricesDataByUsers.y);
  const averageOrdersSum = calculateSum(averagePricesData.y);

  const datepickerHighlightDates = getHighlightDates(products);
  return {
    datepickerHighlightDates,
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
