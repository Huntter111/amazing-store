import moment from 'moment';
import { TYPE_CHART } from '../../common/constants';
import { PRODUCT_TYPES } from '../../products/constants';
import {STATISTIC_PRODUCT_TYPES} from "../constants";
import {DRINK_PRODUCTS, SET_PRODUCTS, SINGLE_PRODUCT} from "../../helper/constants";
import {formattedHelperConstants} from "./getHelperStatisticData";

export const PRODUCTS_SUB_TYPE_LIST = (() => {
  const singleProductsMap = formattedHelperConstants(SINGLE_PRODUCT, true);
  const setProductsMap = formattedHelperConstants(SET_PRODUCTS, true);
  const drinkProductsMap = formattedHelperConstants(DRINK_PRODUCTS, true);

  return {
    ...{[STATISTIC_PRODUCT_TYPES.ALL]: "Всі підкатегорії"},
    ...singleProductsMap,
    ...setProductsMap,
    ...drinkProductsMap}
})();

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

const getFilteredOrdersData = (products, ordersList, from, to, type, subType) => {
  if (from && to) {
    ordersList = ordersList.filter((item) => {
      return (
        !moment(item.orderDate).isBefore(from, 'date') &&
        !moment(item.orderDate).isAfter(to, 'date')
      );
    });
  }

  if (type && type.toUpperCase() !== STATISTIC_PRODUCT_TYPES.ALL) {
    ordersList = ordersList.filter((item) => item.type.toLowerCase() === type.toLowerCase());
  }

  if (subType && subType.toUpperCase() !== STATISTIC_PRODUCT_TYPES.ALL) {
    ordersList = ordersList.filter((item) => {
      const foundProduct = products.find(_ => _.id === item.id);
      return foundProduct?.type[0]?.fields?.type.toLowerCase() === subType.toLowerCase()
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
      }, []).map(_ => moment(_, 'M/D/YYYY').subtract(0, "days").toDate())
  }
};
const generateDataByDataType = (ordersList, productsList, dataType, subDataType) => {
  let collectedData;

  if (dataType && subDataType) {
    collectedData = ordersList.reduce((acc, item) => {
      if(productsList[item.id]) {
        if (acc[productsList[item.id]]) {
          acc[productsList[item.id]] = acc[productsList[item.id]] + item[dataType][subDataType];
        } else {
          acc[productsList[item.id]] = item[dataType][subDataType];
        }
      }
      return acc;
    }, {});
  } else {
    collectedData = ordersList.reduce((acc, item) => {
      if(productsList[item.id]) {
        if (acc[productsList[item.id]]) {
          acc[productsList[item.id]] = acc[productsList[item.id]] + item[dataType];
        } else {
          acc[productsList[item.id]] = item[dataType];
        }
      }
      return acc;
    }, {});
  }

  return {
    x: Object.keys(collectedData),
    y: Object.values(collectedData),
  };
};
const getProductsStatisticData = (products, orders, from, to, type, subType) => {
  const productsList = products && formattedProductsList(products);
  const ordersList = orders && formattedOrdersList(orders);
  const filteredOrdersList = orders && getFilteredOrdersData(products, ordersList, from, to, type, subType);

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
        hovertemplate: '%{label}<br>%{value:.2f} ₴<br>%{percent}<extra></extra>'
      },
    ],
  };
};

export default getProductsStatisticData;
