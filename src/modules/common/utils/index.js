export const formatProductsContentfulFirebase = (products) => {
  return products.map(
    ({ description, id, images, name, price, type, contentfulId }) => {
      if(!contentfulId) {
        return {
          description,
          contentfulId: id,
          type,
          images,
          name,
          price,
        };
      }
      return {
        id,
        description,
        contentfulId,
        type,
        images,
        name,
        price,
      };
    }
  );
};
