import {formattedOrdersList, formattedProductsList} from "./getProductsStatisticData";

const generateTotalPriceForEachProduct = (productsList, ordersList) => {
  return Object.keys(productsList).reduce((acc, productID) => {
    acc[productID] = ordersList.reduce((acc, order) => {
      const {id, price} = order;

      if(id === productID) {
        return acc + price?.priceAmount
      }

      return acc;
    }, 0)

    return acc;
  }, {})
}

const getSortedProductsWithTotalAmountOfOrdersPrice = (products) => {
  return Object.keys(products).sort((prev, next) => products[next] - products[prev]).reduce((acc, item) => {
    acc[item] = products[item];
    return acc;
  }, {})
}

const groupByABCSystem = (products, formattedProductsList) => {
  let groupDoneFlag = {
    groupA: false,
    groupB: false,
    groupC: false
  }
  const totalPricesCost = Object.keys(formattedProductsList).reduce((acc, item) => acc + formattedProductsList[item], 0);
  //ABC products cover 80% of total amount of orders prices
  const ABCGroupTotalPrice = totalPricesCost * 0.8;
  //Group A cover 50% of ABCGroupTotalPrice
  const groupATotalPrice = ABCGroupTotalPrice * 0.5;
  //Group B cover 30% of ABCGroupTotalPrice
  const groupBTotalPrice = ABCGroupTotalPrice * 0.3;

  return Object.keys(formattedProductsList).reduce((acc, productID, idx) => {
    const foundProductContent = products.find(_ => _.id === productID);
    if(!groupDoneFlag.groupA && (acc?.['groupA']?.reduce((acc, item) => acc + item?.priceAmount, 0) < groupATotalPrice)) {
      const newProductData = {
        productID,
        code: `A00${idx + 1}`,
        name: foundProductContent.name,
        priceAmount: formattedProductsList[productID],
        percentage: (formattedProductsList[productID] * 100 / totalPricesCost).toFixed(1)
      }

      acc['groupA'] = [...acc['groupA'], newProductData]
    } else if(!groupDoneFlag.groupB && (acc?.['groupB']?.reduce((acc, item) => acc + item?.priceAmount, 0) < groupBTotalPrice)) {
      groupDoneFlag.groupA = true;

      const newProductData = {
        productID,
        code: `B00${idx - acc?.['groupA'].length + 1}`,
        name: foundProductContent.name,
        priceAmount: formattedProductsList[productID],
        percentage: (formattedProductsList[productID] * 100 / totalPricesCost).toFixed(1)
      }

      acc['groupB'] = [...acc['groupB'], newProductData]
    } else if(!groupDoneFlag.groupC && (acc?.['groupC']?.reduce((acc, item) => acc + item?.priceAmount, 0) < ABCGroupTotalPrice - acc?.['groupA']?.reduce((acc, item) => acc + item?.priceAmount, 0) - acc?.['groupB']?.reduce((acc, item) => acc + item?.priceAmount, 0))) {
      groupDoneFlag.groupB = true;

      const newProductData = {
        productID,
        code: `C00${idx - acc?.['groupA'].length - acc?.['groupB'].length + 1}`,
        name: foundProductContent.name,
        priceAmount: formattedProductsList[productID],
        percentage: (formattedProductsList[productID] * 100 / totalPricesCost).toFixed(1)
      }

      acc['groupC'] = [...acc['groupC'], newProductData]
    } else {
      groupDoneFlag.groupC = true;

      const newProductData = {
        productID,
        code: `X00${idx - acc?.['groupA'].length - acc?.['groupB'].length - acc?.['groupC'].length + 1}`,
        name: foundProductContent.name,
        priceAmount: formattedProductsList[productID],
        percentage: (formattedProductsList[productID] * 100 / totalPricesCost).toFixed(1)
      }

      acc['groupX'] = [...acc['groupX'], newProductData]
    }

    return acc;
  }, {groupA: [], groupB: [], groupC: [], groupX: []})
}

export const getProductsGroups = (products, orders) => {
  const ordersList = orders && formattedOrdersList(orders);
  const productsList = products && formattedProductsList(products);
  const productsWithTotalAmountOfOrdersPrice = generateTotalPriceForEachProduct(productsList, ordersList)
  const sortedProductsWithTotalAmountOfOrdersPrice = getSortedProductsWithTotalAmountOfOrdersPrice(productsWithTotalAmountOfOrdersPrice)

  return groupByABCSystem(products, sortedProductsWithTotalAmountOfOrdersPrice);
}