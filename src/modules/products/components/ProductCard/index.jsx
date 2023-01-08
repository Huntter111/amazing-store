import { Card } from "antd";
import ReactMarkdown from "react-markdown";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { useCart } from "../../../cart/context/CartContext";
import { ROUTES } from "../../../../routes";
import styles from "./productCard.module.scss";
import AppButton from "../../../common/components/AppButton";
import { BUTTON_TYPE } from "../../../common/constants";

const { Meta } = Card;

const ProductCard = ({ id, title, description, type, url, price }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <Card
      className={styles.card}
      hoverable
      cover={
        <LazyLoadImage
          alt="Product card img"
          effect="blur"
          src={url}
          width="100%"
          height="100%"
        />
      }
      onClick={() => navigate(`${ROUTES.PRODUCT}/${id}`)}
    >
      <Meta
        className={styles.description}
        title={title}
        description={<ReactMarkdown>{description}</ReactMarkdown>}
      />
      <div className={styles.pricesWrapper}>
        {price.map(({ fields }, idx) => {
          const { priceRadius, priceAmount } = fields;
          return (
            <div key={idx} className={styles.price}>
              <AppButton
                className={styles.priceButton}
                type={BUTTON_TYPE.PRIMARY}
                name={<ShoppingCartOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart({
                    id: id + priceRadius,
                    title,
                    description,
                    price: { priceRadius, priceAmount },
                    url,
                    type,
                  });
                }}
              />
              {priceRadius && <p className={styles.priceName}>{priceRadius}</p>}
              <p className={styles.priceAmount}>{`${priceAmount} UAH`}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default ProductCard;
