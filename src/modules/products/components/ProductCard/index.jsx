import { Card } from "antd";
import ReactMarkdown from "react-markdown";
import { ShoppingCartOutlined } from "@ant-design/icons";
import styles from "./productCard.module.scss";
import AppButton from "../../../common/components/AppButton";
import { BUTTON_TYPE } from "../../../common/constants";

const { Meta } = Card;

const ProductCard = ({ title, description, url, price }) => (
  <Card
    className={styles.card}
    hoverable
    cover={<img alt="pizza card img" src={url} />}
  >
    <Meta
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
              onClick={() => {}}
            />
            <p className={styles.priceName}>{priceRadius}</p>
            <p className={styles.priceAmount}>{`${priceAmount} UAH`}</p>
          </div>
        );
      })}
    </div>
  </Card>
);

export default ProductCard;
