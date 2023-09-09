import DatePicker from '../ProductDatePicker';

const ProductStatisticFilter = ({ setDateRange }) => {
  return (
    <div>
      <DatePicker setDateRange={setDateRange} />
    </div>
  );
};

export default ProductStatisticFilter;
