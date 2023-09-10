import DatePicker from '../ProductDatePicker';

const ProductStatisticFilter = ({ setDateRange, highlightDates }) => {
  return (
    <div>
      <DatePicker setDateRange={setDateRange} highlightDates={highlightDates} />
    </div>
  );
};

export default ProductStatisticFilter;
