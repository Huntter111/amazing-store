import { createContext, useContext} from "react";
import { notification } from "antd";
import useProductsDB from "../../../api/products";

const ProductsContext = createContext();

export const ProductsDataProvider = ({ children }) => {
  const { product, products, getProduct, getProducts, createProduct, deleteProduct, updateProduct } = useProductsDB();

  const getProductDataInfo = async (id) => {
    try {
      await getProduct(id);
    } catch (error) {
      notification.error({
        message: "Не вдалося отримати даних продукту",
        description:
          "На жаль не вдалося отримати даних продукту, спробуйте пізніше",
      });
    }
  };

  const getAllProductsDataInfo = async () => {
    try {
      await getProducts();
    } catch (error) {
      notification.error({
        message: "Не вдалося отримати даних продуктів",
        description:
          "На жаль не вдалося отримати даних продуктів, спробуйте пізніше",
      });
    }
  };

  const createProductDataInfo = async (data) => {
    try {
      await createProduct(data);

      notification.success({
        message: "Продукт додано",
        description:
          "Продукт додано успішно",
      });
    } catch (error) {
      notification.error({
        message: "Не вдалося додати даних продукту",
        description:
          "На жаль не вдалося додати даних продукту, спробуйте пізніше",
      });
    }
  };

  const updateProductDataInfo = async (id, data) => {
    try {
      await updateProduct(id, data);
    } catch (error) {
      notification.error({
        message: "Не вдалося оновити даних продукту",
        description:
          "На жаль не вдалося оновити даних продукту, спробуйте пізніше",
      });
    }
  };

  const deleteProductDataInfo = async (id) => {
    try {
      await deleteProduct(id);
      notification.success({
        message: "Продукт видалено",
        description:
          "Продукт видалено та деактивовано",
      });
    } catch (error) {
      notification.error({
        message: "Не вдалося видалити продукт.",
        description:
          "На жаль не вдалося видалити та деактивувати продукт",
      });
    }
  };

  return (
    <ProductsContext.Provider value={{
      product,
      products,
      getProductDataInfo,
      getAllProductsDataInfo,
      createProductDataInfo,
      updateProductDataInfo,
      deleteProductDataInfo
    }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsData = () => {
  return useContext(ProductsContext);
};
