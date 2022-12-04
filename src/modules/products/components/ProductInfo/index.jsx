import React, { useEffect } from "react";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import ReactMarkdown from "react-markdown";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./productInfo.global.scss";

import { ROUTES } from "../../../../routes";
import useProductsDB from "../../../../api/products";
import AppButton from "../../../common/components/AppButton";
import { BUTTON_TYPE } from "../../../common/constants";
import styles from "./productInfo.module.scss";

const ProductsInfo = () => {
  const { id } = useParams();
  const { product, getProduct } = useProductsDB();

  useEffect(() => {
    getProduct(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useMemo(() => {
    if (!product) return null;

    const { name, description, images, price } = product;
    console.log("products", product);

    return (
      <>
        <Breadcrumb className={styles.breadcrumbs} separator=">">
          <Breadcrumb.Item href={ROUTES.PRODUCTS_LIST}>
            Список продуктів
          </Breadcrumb.Item>
          <Breadcrumb.Item>{name}</Breadcrumb.Item>
        </Breadcrumb>
        <div className={styles.wrapper}>
          <Swiper
            className="swiper"
            modules={[Navigation, Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {images.map(({ file }) => (
              <SwiperSlide>
                <div className={styles.imageWrapper}>
                  <LazyLoadImage
                    alt="Product image"
                    src={file.url}
                    effect="blur"
                    width="100%"
                    height="100%"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={styles.info}>
            <>
              <h1 className={styles.title}>{name}</h1>
              <ReactMarkdown className={styles.description}>
                {description}
              </ReactMarkdown>
            </>
            <>
              {price.map(({ fields }, idx) => {
                const { priceRadius, priceAmount } = fields;
                return (
                  <div key={idx} className={styles.price}>
                    <p className={styles.priceName}>{priceRadius}</p>
                    <p className={styles.priceAmount}>{`${priceAmount} UAH`}</p>
                    <AppButton
                      className={styles.priceButton}
                      type={BUTTON_TYPE.PRIMARY}
                      name={<ShoppingCartOutlined />}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    />
                  </div>
                );
              })}
            </>
          </div>
        </div>
      </>
    );
  }, [product]);
};

export default ProductsInfo;
