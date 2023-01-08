export const sendOrderMessage = (order) => {
  const cartProductsMessage = order.cartProducts.reduce((acc, item, idx) => {
    const priceRadius = item?.price?.priceRadius
      ? item?.price?.priceRadius
      : "";

    return (
      acc +
      `<b>${idx + 1}. ${item.title} ${priceRadius}</b> %0A Кількість: ${
        item.count
      } %0A Ціна: ${item.price.priceAmount} UAH %0A`
    );
  }, "");

  const totalPrice = order.cartProducts.reduce((acc, item) => {
    return acc + item.price.priceAmount;
  }, 0);

  const text = `<b>Нове замовлення №: ${order.orderNumber}</b> %0A Дата замовлення: ${order.orderDate} %0A Клієнт: ${order.userInfo.lastName} ${order.userInfo.firstName} %0A Телефон: ${order.userInfo.phone} %0A Email: ${order.userInfo.email} %0A <b>--------->Адреса доставки:</b> %0A Місто: ${order.address.city} %0A Вулиця: ${order.address.street} %0A Дім: ${order.address.house} %0A Квартира: ${order.address.apartment} %0A <b>--------->Замовлення:</b> %0A ${cartProductsMessage} <b>Всього до сплати: ${totalPrice} UAH</b>`;

  const url = `https://api.telegram.org/bot${process.env.REACT_APP_TELEGRAM_BOT_ID}/sendMessage?chat_id=${process.env.REACT_APP_TELEGRAM_CHAT_ID}&text=${text}&parse_mode=html`;

  fetch(url);
};
