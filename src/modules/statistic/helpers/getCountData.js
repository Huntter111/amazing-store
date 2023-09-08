import { SINGLE_PRODUCT, SET_PRODUCTS } from '../../helper/constants';

const getCountData = (usersData) => {
  console.log({ ...SINGLE_PRODUCT, ...SET_PRODUCTS });
  console.log(usersData);
};
export default getCountData;
