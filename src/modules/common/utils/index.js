export const formatProductsContentfulFirebase = (products) => {
  console.log('products', products)
  return products.map(
    ({ description, id, images, name, price, contentfulId }) => {
      if(!contentfulId) {
        return {
          description,
          contentfulId: id,
          images,
          name,
          price,
        };
      }
      return {
        id,
        description,
        contentfulId,
        images,
        name,
        price,
      };
    }
  );
};
