import { LazyLoadImage } from "react-lazy-load-image-component";
import { Collapse } from "antd";

import { PRODUCT_TYPES } from "../../../products/constants";
import styles from "./orderItem.module.scss";

const { Panel } = Collapse;

const OrderItem = (props) => {
  const { orderNumber, orderDate, id, cartProducts, totalAmount } = props;

  return (
    <Collapse key={id} className={styles.collapse}>
      <Panel
        header={
          <div className={styles.panelHeader}>
            <span>
              <b>Замовлення №:</b>{" "}
            </span>
            <span>{orderNumber}.</span>{" "}
            <span>
              <b>Дата замовлення:</b>{" "}
            </span>
            <span>{orderDate}.</span>{" "}
            <span>
              <b>Кількість позицій:</b>{" "}
            </span>
            <span>{cartProducts.length}.</span>{" "}
            <span>
              <b>Рахунок:</b>{" "}
            </span>
            <span>{`${totalAmount} UAH.`}</span>{" "}
          </div>
        }
      >
        {cartProducts.map(({ count, id, title, type, url, price }) => (
          <div key={id} className={styles.cartProductInfo}>
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
            <div className={styles.type}>{PRODUCT_TYPES[type]}</div>
            <div className={styles.count}>{count}</div>
            <div className={styles.price}>
              <p className={styles.priceName}>{price.priceRadius}</p>
              <p className={styles.priceAmount}>{`${price.priceAmount} UAH`}</p>
            </div>
          </div>
        ))}
      </Panel>
    </Collapse>
  );
};

export default OrderItem;
