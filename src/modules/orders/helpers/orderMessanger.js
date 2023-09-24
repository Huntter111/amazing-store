import { TELEGRAM_BOT_ID, TELEGRAM_CHAT_ID } from '../../../env';

export const sendOrderMessage = (order) => {
  const cartProductsMessage = order.cartProducts.reduce((acc, item, idx) => {
    const priceRadius = item?.price?.priceRadius ? item?.price?.priceRadius : '';

    return (
      acc +
      `<b>${idx + 1}. ${item.title} ${priceRadius}</b> %0A Кількість: ${item.count} %0A Ціна: ${
        item.price.priceAmount
      } UAH %0A`
    );
  }, '');

  const totalPrice = order.orderSummary?.priceTotalAmount?.totalPriceWithoutAdjustment;
  const totalPriceWithAdjustment = order.orderSummary?.priceTotalAmount?.totalPriceWithAdjustment;
  const adjustment = order.orderSummary?.adjustment?.adjustment * 100;

  const text = `<b>Нове замовлення №: ${order.orderNumber}</b> %0A Дата замовлення: ${order.orderDate} %0A Клієнт: ${order.userInfo.lastName} ${order.userInfo.firstName} %0A Телефон: ${order.userInfo.phone} %0A Email: ${order.userInfo.email} %0A <b>--------->Адреса доставки:</b> %0A Місто: ${order.address.city} %0A Вулиця: ${order.address.street} %0A Дім: ${order.address.house} %0A Квартира: ${order.address.apartment} %0A <b>--------->Замовлення:</b> %0A ${cartProductsMessage} <b>Всього до сплати: ${totalPrice} UAH</b> %0A <b>Всього до сплати з урахуванням знижки: ${totalPriceWithAdjustment} UAH</b> %0A <b>Знижка: ${adjustment} %</b>`;

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_ID}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${text}&parse_mode=html`;

  fetch(url);
};
