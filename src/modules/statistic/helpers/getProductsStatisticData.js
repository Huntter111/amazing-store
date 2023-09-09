
const formattedProductsList = (data) => {
  return data.reduce((acc, item) => {
    acc[item.id] = item.name;
    return acc;
  }, {});
};

const formattedOrdersList = (data) => {
  return data.reduce((acc, item) => {
    const {cartProducts, orderDate} = item;
    const cartProductsWithOrderData = cartProducts.map(_ => {
      return {..._, orderDate}
    })
    return [...acc, ...cartProductsWithOrderData]
  }, []);
};


const getProductsStatisticData = (products, orders) => {
  const productsList = products && formattedProductsList(products);
  const ordersList = orders && formattedOrdersList(orders);

  console.log('ordersList', ordersList)
}

export default getProductsStatisticData;