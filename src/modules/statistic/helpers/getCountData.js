import { SINGLE_PRODUCT, SET_PRODUCTS, DRINK_PRODUCTS } from '../../helper/constants';
import {sum} from 'lodash';

const formattedHelperConstants = (constant) => {
  return Object.values(constant).reduce((acc, item) => {
    acc[item.value] = item.label;
    return acc
  }, {})
}

const countedProducts = (productsMap, data, productType) => {
  return data.reduce((acc, item) => {
    if (productsMap[item[productType]]) {
      if(acc[item[productType]]) {
      acc[item[productType]] = acc[item[productType]] + 1
    } else {
      acc[item[productType]] = 1
    }
  }
  return acc;
  }, {})
}

const generateXYObj = (productsMap, countedProducts) => {
  return {x: Object.keys(countedProducts).map(_ => productsMap[_]), y: Object.values(countedProducts)}
}
const getCountData = (usersData) => {
  const helperData = usersData.reduce((acc, item) => {
    if(item.helperData) return [...acc, item.helperData];
    return acc
  },[])

  const singleProductsMap = formattedHelperConstants(SINGLE_PRODUCT);
  const setProductsMap = formattedHelperConstants(SET_PRODUCTS);
  const drinkProductsMap = formattedHelperConstants(DRINK_PRODUCTS);

  const countedSingleProducts = countedProducts(singleProductsMap, helperData, 'product');
  const countedSetProducts = countedProducts(setProductsMap, helperData, 'product');
  const countedDrinksProducts = countedProducts(drinkProductsMap, helperData, 'drinkProduct');

  const [singleProductsCountData, setProductsCountData, drinksProductsCountData] = [
    generateXYObj(singleProductsMap, countedSingleProducts),
    generateXYObj(setProductsMap, countedSetProducts),
    generateXYObj(drinkProductsMap, countedDrinksProducts)
  ]

  const setsCountData =     {
    x:['Сети', 'Не сети'],
    y:[
      sum(singleProductsCountData.y),
      sum(setProductsCountData.y)
    ]
  }

  return [
    {graphType: "bar", title: "Продаж комбінованих або одиничних продуктів", data: setsCountData},
    {graphType: "pai", title: "Продаж комбінованих продуктів", data: singleProductsCountData},
    {graphType: "pai", title: "Продаж одиничних продуктів", data: setProductsCountData},
    {graphType: "pai", title: "Продаж напоїв", data: drinksProductsCountData}
  ]
};
export default getCountData;
