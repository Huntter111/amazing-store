import React, {useEffect, useMemo, useState} from 'react';
import AssociativeProductsFilter from "../AssociativeProductsFilter";
import {
  ASSOCIATIONS_CONFIDENCE_TITLE,
  ASSOCIATIONS_CONFIDENCE_TYPE,
  ASSOCIATIONS_SUPPORT_TITLE,
  ASSOCIATIONS_SUPPORT_TYPE,
  STATISTIC_PRODUCT_TYPES
} from "../../constants";
import {Card} from "antd";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {useGlobalContext} from "../../../common/context";
import {generateProductsAssociationsEnum, getAssociations} from "../../helpers/getAssociations";
import {useAssociativeData} from "../../context/AssociativesContext";

import styles from './associativeProducts.module.scss'
import {DeleteOutlined} from "@ant-design/icons";
const { Meta } = Card;

const AssociativeProducts = ({orders, filter, setFilter}) => {
  const [productsAssociationsEnum, setProductsAssociationsEnum] = useState();
  const [associations, setAssociations] = useState()
  const { products } = useGlobalContext();
  const {associativesData, createAssociativesDataInfo, getAllAssociativesDataInfo, deleteAssociativeDataInfo} = useAssociativeData();

  useEffect(() => {
    const formattedOrders = orders.map(_ => _.cartProducts);
    const transactions = formattedOrders.map(order => order.map(product => product.id));
    setAssociations(getAssociations(
      transactions,
      products,
      ASSOCIATIONS_SUPPORT_TYPE[filter.associationSupport.type],
      ASSOCIATIONS_CONFIDENCE_TYPE[filter.associationConfidence.type]));
  }, [orders, filter.associationConfidence.type, filter.associationSupport.type, products]);

  useEffect(() => {
    setProductsAssociationsEnum(generateProductsAssociationsEnum(associations, products));
  }, [associations, products]);

  useEffect(() => {
    getAllAssociativesDataInfo()
    // eslint-disable-next-line
  }, []);

  const filteredAssociationsByProduct = useMemo(() => {
    if(filter?.product?.type !== STATISTIC_PRODUCT_TYPES.ALL) {
      return associations?.filter(item => {
        return item.antecedent.includes(filter?.product?.type)
      })
    }

    return associations;
  }, [associations, filter?.product?.type])

  const handleClick = (id) => {
    deleteAssociativeDataInfo(id);
    getAllAssociativesDataInfo()
  };

  return (
    <div className={styles.wrapper}>
      <AssociativeProductsFilter
        productsAssociationsEnum={productsAssociationsEnum}
        filter={filter}
        isAssociationSettingsExist={!!associativesData?.length}
        setFilter={setFilter}
        setAssociativeSettings={() => {
          if(!associativesData?.length) {
            createAssociativesDataInfo({
              settings: {
                support: filter.associationSupport,
                confidence: filter.associationConfidence
              },
              results: associations
            })

            getAllAssociativesDataInfo()
          }
        }}
      />
      {associativesData?.map(item => (
        <div className={styles.settingsInfoWrapper} key={item.id}>
          <div className={styles.settingsInfo}>
            <div>{`Обсяг: ${ASSOCIATIONS_SUPPORT_TITLE[item.settings.support.type]} =>`}</div>
            <div className={styles.settingItem}>{ASSOCIATIONS_CONFIDENCE_TITLE[item.settings.confidence.type]}</div>
          </div>
          <DeleteOutlined
            className={styles.deleteIcon}
            onClick={() => handleClick(item.id)}
          />
        </div>
      ))}
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
