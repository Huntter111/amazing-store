import { useEffect, useState } from "react";
import { Breadcrumb } from "antd";

import { useCart } from "../../context/CartContext";
import { ROUTES } from "../../../../routes";
import CartProduct from "../CartProduct";
import AppButton from "../../../common/components/AppButton";
import { BUTTON_TYPE } from "../../../common/constants";
import OrderModal from "../../../orders/components/OrderModal";

import styles from "./cartProductsList.module.scss";

const CartProductsList = () => {
  const { cart, clearCart } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    const totalPrice = cart.reduce((acc, item) => {
      const { price } = item;
      return acc + price.priceAmount;
    }, 0);

    setTotalPrice(totalPrice);
  }, [cart]);

  return (
    <>
      <Breadcrumb className={styles.breadcrumbs} separator=">">
        <Breadcrumb.Item href={ROUTES.PRODUCTS_LIST}>
          Список продуктів
        </Breadcrumb.Item>
        <Breadcrumb.Item>Кошик</Breadcrumb.Item>
      </Breadcrumb>
      <div className={styles.cartListWrapper}>
        {cart.map(({ id, count, description, price, title, type, url }) => {
          return (
            <CartProduct
              key={id}
              {...{ id, count, description, price, title, type, url }}
            />
          );
        })}
      </div>
      <div className={styles.summary}>
        <AppButton
          disabled={!cart.length}
          className={styles.priceButton}
          type={BUTTON_TYPE.PRIMARY}
          name="Зробити замовлення"
          onClick={() => {
            setIsOpenModal(true);
          }}
        />
        <div className={styles.positionCount}>
          <span>Всього позицій:</span>{" "}
          <span>
            <b>{cart.length}</b>
          </span>
        </div>
        <div className={styles.totalPrice}>
          <span>До сплати:</span>{" "}
          <span>
            <b>{totalPrice}</b>
          </span>{" "}
          <span>UAH</span>
        </div>
      </div>
      <OrderModal
        clearCart={clearCart}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
    </>
  );
};

export default CartProductsList;
