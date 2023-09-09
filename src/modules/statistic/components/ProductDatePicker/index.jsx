import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const ProductDatePicker = ({ setDateRange }) => {
  const [range, setRange] = useState([null, null]);
  const [startDate, endDate] = range;

  const hendlerChange = (newData) => {
    const [startDate, endDate] = newData;
    const isStart = startDate ? moment(startDate) : null;
    const isEnd = endDate ? moment(endDate) : null;

    setDateRange({ from: isStart, to: isEnd });
    setRange(newData);
  };

  const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];
  const months = [
    'Січень',
    'Лютий',
    'Березень',
    'Квітень',
    'Травень',
    'Червень',
    'Липень',
    'Серпень',
    'Вересень',
    'Жовтень',
    'Листопад',
    'Грудень',
  ];

  const locale = {
    localize: {
      day: (n) => days[n],
      month: (n) => months[n],
    },
    formatLong: {
      date: () => 'mm/dd/yyyy',
    },
  };

  return (
    <DatePicker
      showIcon
      placeholderText="Виберiть дату"
      locale={locale}
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      showMonthDropdown
      onChange={(newData) => {
        hendlerChange(newData);
      }}
      isClearable={true}
      maxDate={moment().toDate()}
    />
  );
};

export default ProductDatePicker;
