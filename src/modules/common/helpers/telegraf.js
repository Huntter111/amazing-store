import moment from 'moment';
import Telegraf from "telegraf";

const app = new Telegraf(process.env.REACT_APP_TELEGRAM_BOT_ID);

export const telegramMesenger = (record) => {
  app.telegram.sendMessage(
    process.env.REACT_APP_TELEGRAM_CHAT_ID,
    `Нове замовлення: \n Клиент: ${record.person.lastName} ${
      record.person.firstName
    } \n Телефон: ${record.person.phoneNumber} \n Время: ${moment(
      record.date
    ).format("DD.MM.YYYY")} на ${moment(record.date)
      .subtract(3, "hours")
      .format("LT")} \n Процедура: ${
      record.type === "MANICURE" ? "Маникюр" : "Педикюр"
    }`
  );
};
