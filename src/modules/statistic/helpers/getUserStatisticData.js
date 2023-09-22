import { TYPE_CHART } from '../../common/constants';
import moment from 'moment';

const sumPricesInOrder = (order) => {
  return order.cartProducts.reduce((acc, cart) => {
    acc += cart.price.priceAmount;
    return acc;
  }, 0);
};
const generateDataToGraph = (collectedData) => {
  const y = collectedData ? Object.values(collectedData) : [];
  const x = collectedData ? Object.keys(collectedData) : [];
  return {
    x,
    y,
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

const getHighlightDates = (ordersList, keyFilter) => {
  if (ordersList.length) {
    const filteredOrderList = keyFilter
      ? ordersList.filter((order) => {
          return order.userInfo.email === keyFilter;
        })
      : ordersList;

    return filteredOrderList
      ?.reduce((acc, date) => {
        if (!acc.includes(date?.orderDate)) {
          return [...acc, date.orderDate];
        }
        return acc;
      }, [])
      .map((_) => moment(_, 'M/D/YYYY').subtract(0, 'days').toDate());
  }
};
const getUserStatisticOrdersData = (orders, from, to) => {
  const filteredData = orders && getFilteredOrdersData(orders, from, to);
  const ordersDataList = filteredData && formattedUserList(filteredData);
  const fullPricesDataByUsers = generateDataToGraph(ordersDataList.fullPrices);
  const averagePricesData = generateDataToGraph(ordersDataList.averagePrices);
  const fullOrdersSum = calculateSum(fullPricesDataByUsers.y);
  const averageOrdersSum = calculateSum(averagePricesData.y);

  const datepickerHighlightDates = getHighlightDates(orders);
  return {
    datepickerHighlightDates,
    graphData: [
      {
        graphType: TYPE_CHART.PIE,
        title: `Продаж продуктів (загальна сума : ${fullOrdersSum.toFixed(2)} грн)`,
        data: fullPricesDataByUsers,
        hole: 0.5,
        hovertemplate: '%{label}<br>%{value:.2f} ₴<br>%{percent}<extra></extra>',
      },
      {
        graphType: TYPE_CHART.PIE,
        title: `Продаж продуктів (середнiй чек : ${averageOrdersSum.toFixed(2)} грн)`,
        data: averagePricesData,
        hole: 0.5,
        hovertemplate: '%{label}<br>%{value:.2f} ₴<br>%{percent}<extra></extra>',
      },
    ],
  };
};

const getListUsers = (orders) => {
  return orders.reduce((acc, user) => {
    if (acc[user.userInfo.email]) {
      acc[user.userInfo.email] = [...acc[user.userInfo.email], ...user.cartProducts];
    } else {
      acc[user.userInfo.email] = user.cartProducts;
    }
    return acc;
  }, {});
};

const filterUsersByMail = (usersData, keyFilter) => {
  if (keyFilter) {
    return usersData[keyFilter]?.reduce((acc, userData) => {
      if (acc[userData.title]) {
        acc[userData.title] = acc[userData.title] + userData.price.priceAmount;
        return acc;
      } else {
        acc[userData.title] = userData.price.priceAmount;
        return acc;
      }
    }, {});
  }
};

const getStatisticOrdersByUser = (orders, keyFilter, from, to) => {
  const highlightDates = getHighlightDates(orders, keyFilter);
  const filteredByDate = getFilteredOrdersData(orders, from, to);
  const usersListOrders = getListUsers(filteredByDate);
  const usersMailList = Object.keys(usersListOrders);
  const isKeyFilter = !keyFilter ? usersMailList[0] : keyFilter;
  const userOrdersNames = filterUsersByMail(usersListOrders, isKeyFilter, from, to);
  const userDataOrders = generateDataToGraph(userOrdersNames);

  return {
    highlightDates,
    usersMailList,
    graphData: [
      {
        graphType: TYPE_CHART.PIE,
        title: `Продаж продуктів у користувача (${isKeyFilter})`,
        data: userDataOrders,
        hole: 0.5,
        hovertemplate: '%{label}<br>%{value:.2f} ₴<br>%{percent}<extra></extra>',
      },
    ],
  };
};
export { getUserStatisticOrdersData, getStatisticOrdersByUser };
