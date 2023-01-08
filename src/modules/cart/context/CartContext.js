import {
  useState,
  useCallback,
  useEffect,
  createContext,
  useContext,
} from "react";
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartData = JSON.parse(sessionStorage.getItem("cart"));
    cartData && setCart(cartData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToCart = useCallback((product) => {
    const cartStorageData = JSON.parse(sessionStorage.getItem("cart"));
    const cartData = !cartStorageData ? [] : cartStorageData;
    const { id, title, description, url, type, price } = product;
    const newCartProduct = {
      id,
      title,
      description,
      url,
      count: 1,
      type,
      initialPriceAmount: price.priceAmount,
      price,
    };

    const isProductAvailable = cartData?.find((_) => _.id === id);

    if (!isProductAvailable) {
      sessionStorage.setItem(
        "cart",
        JSON.stringify([...cartData, newCartProduct])
      );

      setCart([...cartData, newCartProduct]);

      notification.info({
        message: "Дякуємо за ваш вибір",
        description: "Продукт успішно додано до корзини",
        icon: <SmileOutlined style={{ color: "#108ee9" }} />,
      });
    } else {
      notification.info({
        message: "Продукт вже додано",
        description: "Цей продукт вже додано до корзини",
      });
    }
  }, []);

  const removeFromCart = useCallback(
    (id) => {
      const changedCartData = cart.filter((_) => _.id !== id);

      sessionStorage.setItem("cart", JSON.stringify(changedCartData));
      setCart(changedCartData);
    },
    [cart]
  );

  const setProductCount = useCallback(
    (id, count) => {
      const changedCartData = cart.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            count,
            price: {
              ...item.price,
              priceAmount: Number(item.initialPriceAmount) * count,
            },
          };
        }

        return item;
      });

      sessionStorage.setItem("cart", JSON.stringify(changedCartData));
      setCart(changedCartData);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cart]
  );

  const clearCart = useCallback(() => {
    sessionStorage.removeItem("cart");
    setCart([]);
  }, [])

  return (
    <CartContext.Provider
      value={{ cart, addToCart, setProductCount, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
