import React, {useMemo} from 'react';
import styles from './associativeProducts.module.scss'
import AssociativeProductsFilter from "../AssociativeProductsFilter";
import {STATISTIC_PRODUCT_TYPES} from "../../constants";
import {Card} from "antd";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {useGlobalContext} from "../../../common/context";

const { Meta } = Card;

const AssociativeProducts = ({associations, productsAssociationsEnum, filter, setFilter}) => {
  const { products } = useGlobalContext();
  const filteredAssociationsByProduct = useMemo(() => {
    if(filter?.product?.type !== STATISTIC_PRODUCT_TYPES.ALL) {
      return associations?.filter(item => {
        return item.antecedent.includes(filter?.product?.type)
      })
    }

    return associations;
  }, [associations, filter?.product?.type])

  return (
    <div className={styles.wrapper}>
      <AssociativeProductsFilter productsAssociationsEnum={productsAssociationsEnum} filter={filter} setFilter={setFilter} />
      {filteredAssociationsByProduct?.map((association, idx) => {
        return (
          <div className={styles.associationsInfoWrapper} key={idx}>
            <div className={styles.antecedentWrapper}>
              {association.antecedent.map(item => {
                const foundProduct = products?.find(_ => _.id === item);
                return (
                  <Card
                    className={styles.card}
                    key={item}
                    hoverable
                    cover={
                      <LazyLoadImage
                        alt="Product card img"
                        effect="blur"
                        src={foundProduct?.images[0]?.file?.url}
                        width="100%"
                        height="100%"
                      />
                    }
                  >
                    <Meta
                      className={styles.cardTitle}
                      title={foundProduct?.name}
                    />
                  </Card>
                )
              })}
            </div>
            <div className={styles.symbolToIcon}>{">"}</div>
            <div className={styles.antecedentWrapper}>
              {
                association.consequent.map(item => {
                  const foundProduct = products?.find(_ => _.id === item);
                  return (
                    <Card
                      className={styles.card}
                      key={item}
                      hoverable
                      cover={
                        <LazyLoadImage
                          alt="Product card img"
                          effect="blur"
                          src={foundProduct?.images[0]?.file?.url}
                          width="100%"
                          height="100%"
                        />
                      }
                    >
                      <Meta
                        className={styles.cardTitle}
                        title={foundProduct?.name}
                      />
                    </Card>
                  )
                })
              }
            </div>
            <div className={styles.confidenceWrapper}>
              {`Ймовірність: ${Math.round(association?.confidence * 100)} %`}
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default AssociativeProducts;
