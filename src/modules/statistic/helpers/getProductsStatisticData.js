import moment from 'moment';
import { TYPE_CHART } from '../../common/constants';
import { PRODUCT_TYPES } from '../../products/constants';

const formattedProductsList = (data) => {
  return data.reduce((acc, item) => {
    acc[item.id] = item.name;
    return acc;
  }, {});
};

const formattedOrdersList = (data) => {
  return data.reduce((acc, item) => {
    const { cartProducts, orderDate } = item;
    const cartProductsWithOrderData = cartProducts.map((_) => {
      return { ..._, orderDate };
    });
    return [...acc, ...cartProductsWithOrderData];
  }, []);
};

const getFilteredOrdersData = (ordersList, from, to, type) => {
  if (from && to) {
    ordersList = ordersList.filter((item) => {
      return (
        !moment(item.orderDate).isBefore(from, 'date') &&
        !moment(item.orderDate).isAfter(to, 'date')
      );
    });
  }
  if (type) {
    ordersList = ordersList.filter((item) => item.type === type);
  }

  return ordersList;
};
const getHighlightDates = (ordersList) => {
  if (ordersList.length) {
    return ordersList
      ?.reduce((acc, date) => {
        if (!acc.includes(date?.orderDate)) {
          const substrDate = moment(date.orderDate).subtract(0, 'days').toDate()
          return [...acc, substrDate];
        }
        return acc;
      }, [])
  }
};
const generateDataByDataType = (ordersList, productsList, dataType, subDataType) => {
  let collectedData;

  if (dataType && subDataType) {
    collectedData = ordersList.reduce((acc, item) => {
      if (acc[productsList[item.id]]) {
        acc[productsList[item.id]] = acc[productsList[item.id]] + item[dataType][subDataType];
      } else {
        acc[productsList[item.id]] = item[dataType][subDataType];
      }
      return acc;
    }, {});
  } else {
    collectedData = ordersList.reduce((acc, item) => {
      if (acc[productsList[item.id]]) {
        acc[productsList[item.id]] = acc[productsList[item.id]] + item[dataType];
      } else {
        acc[productsList[item.id]] = item[dataType];
      }
      return acc;
    }, {});
  }

  return {
    x: Object.keys(collectedData),
    y: Object.values(collectedData),
  };
};
const getProductsStatisticData = (products, orders, from, to, type) => {
  const productsList = products && formattedProductsList(products);
  const ordersList = orders && formattedOrdersList(orders);
  const filteredOrdersList = orders && getFilteredOrdersData(ordersList, from, to, type);

  const datepickerHighlightDates = getHighlightDates(ordersList);

  const productsByCount = generateDataByDataType(filteredOrdersList, productsList, 'count');
  const productsByPrice = generateDataByDataType(
    filteredOrdersList,
    productsList,
    'price',
    'priceAmount',
  );

  return {
    datepickerHighlightDates,
    graphData: [
      {
        graphType: TYPE_CHART.PIE,
        title: `Продаж продуктів за категорією ${PRODUCT_TYPES[type]} (кількість)`,
        data: productsByCount,
        hole: 0.5,
      },
      {
        graphType: TYPE_CHART.PIE,
        title: `Продаж продуктів за категорією ${PRODUCT_TYPES[type]} (виручка грн)`,
        data: productsByPrice,
        hole: 0.5,
      },
    ],
  };
};

export default getProductsStatisticData;
