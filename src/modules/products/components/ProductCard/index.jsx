import { Card } from "antd";
import ReactMarkdown from "react-markdown";
import styles from "./productCard.module.scss";

const { Meta } = Card;

const ProductCard = ({ title, description, url, price }) => (
  <Card
    className={styles.card}
    hoverable
    cover={<img alt="pizza card img" src={url} />}
  >
    <Meta title={title} description={<ReactMarkdown>{description}</ReactMarkdown>} />
    <div className={styles.price}>{`${price} UAH`}</div>
  </Card>
);

export default ProductCard;
