import { LazyLoadImage } from "react-lazy-load-image-component";
import { DeleteOutlined } from "@ant-design/icons";
import { InputNumber } from "antd";
import { debounce } from "lodash";

import { PRODUCT_TYPES } from "../../../products/constants";
import { useCart } from "../../context/CartContext";
import styles from "./cartProduct.module.scss";

const CartProduct = (props) => {
  const { id, count, price, title, type, url } = props;
  const { setProductCount, removeFromCart } = useCart();

  const handleChange = debounce((value) => {
    setProductCount(id, value);
  }, 500);

  const handleClick = (id) => {
    removeFromCart(id);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.lazyImageWrapper}>
        <LazyLoadImage
          alt="Cart item img"
          effect="blur"
          src={url}
          width="100%"
          height="100%"
        />
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.price}>
        <p className={styles.priceName}>{price.priceRadius}</p>
        <p className={styles.priceAmount}>{`${price.priceAmount} UAH`}</p>
      </div>
      <div className={styles.type}>{PRODUCT_TYPES[type]}</div>
      <InputNumber
        min={1}
        max={100}
        defaultValue={count}
        onChange={handleChange}
      />
      <DeleteOutlined
        className={styles.deleteIcon}
        onClick={() => handleClick(id)}
      />
    </div>
  );
};

export default CartProduct;
