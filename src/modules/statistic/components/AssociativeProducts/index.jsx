import React, {useEffect, useMemo, useState} from 'react';
import AssociativeProductsFilter from "../AssociativeProductsFilter";
import {ASSOCIATIONS_CONFIDENCE_TYPE, ASSOCIATIONS_SUPPORT_TYPE, STATISTIC_PRODUCT_TYPES} from "../../constants";
import {Card} from "antd";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {useGlobalContext} from "../../../common/context";
import {generateProductsAssociationsEnum, getAssociations} from "../../helpers/getAssociations";

import styles from './associativeProducts.module.scss'
const { Meta } = Card;

const AssociativeProducts = ({orders, filter, setFilter}) => {
  const [productsAssociationsEnum, setProductsAssociationsEnum] = useState();
  const [associations, setAssociations] = useState()
  const { products } = useGlobalContext();

  useEffect(() => {
    const formattedOrders = orders.map(_ => _.cartProducts);
    const transactions = formattedOrders.map(order => order.map(product => product.id));
    setAssociations(getAssociations(
      transactions,
      ASSOCIATIONS_SUPPORT_TYPE[filter.associationMinSupport.type],
      ASSOCIATIONS_CONFIDENCE_TYPE[filter.associationMinConfidence.type]));
  }, [orders, filter.associationMinConfidence.type, filter.associationMinSupport.type]);

  useEffect(() => {
    setProductsAssociationsEnum(generateProductsAssociationsEnum(associations, products));
  }, [associations, products]);

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
