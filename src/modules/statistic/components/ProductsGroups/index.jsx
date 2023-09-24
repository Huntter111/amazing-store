import React, {useEffect, useState, useMemo} from 'react';
import styles from './productsGroups.module.scss'
import {getProductsGroups} from "../../helpers/getProductsGroups";
import {Table} from "antd";
import AppButton from "../../../common/components/AppButton";
import {BUTTON_TYPE} from "../../../common/constants";
import {useProductsData} from "../../../products/context/ProductsContext";

const ProductsGroups = ({orders}) => {
  const [productsGroups, setProductsGroups] = useState();
  const [toggle, setToggle] = useState(false);
  const {products, getAllProductsDataInfo, updateProductDataInfo} = useProductsData();

  useEffect(() => {
    const delay = setTimeout(() => {
      getAllProductsDataInfo()
    }, 100);

    return () => {
      clearTimeout(delay)
    }
    // eslint-disable-next-line
  }, [toggle]);

  useEffect(() => {
    products && setProductsGroups(getProductsGroups(products, orders))
  }, [products, orders]);

  const columns = [
    {
      title: 'Код групи',
      dataIndex: 'code',
      key: 'code',
      width: '25%'
    },
    {
      title: 'Назва продукту',
      dataIndex: 'name',
      key: 'name',
      width: '25%'
    },
    {
      title: 'Загальна сума продажу (грн)',
      dataIndex: 'priceAmount',
      key: 'priceAmount',
      width: '25%'
    },
    {
      title: 'Відсоток суми продажу (%)',
      dataIndex: 'percentage',
      key: 'percentage',
      width: '25%'
    },
    {
      title: '',
      key: 'hitBtn',
      fixed: 'right',
      width: 100,
      render: (item) => {
        const foundProduct = products.find(_ => _.id === item.productID);
        return (
          <AppButton
            className={foundProduct?.hitEnabled ? styles.buttonActive : styles.button}
            type={BUTTON_TYPE.PRIMARY}
            name={'Хіт продажу'}
            onClick={() => {
              updateProductDataInfo(item.productID, {...foundProduct, hitEnabled: !foundProduct?.hitEnabled});
              setToggle(prev => !prev);
            }}
          />
        )
      },
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.tableWrapper}>
        <h3 className={styles.groupATitle}><b>Група А</b> (Високорейтингові продукти групи ABC)</h3>
        <Table dataSource={productsGroups?.groupA} columns={columns} pagination={false} />
      </div>
      <div className={styles.tableWrapper}>
        <h3 className={styles.groupBCTitle}><b>Група B</b> (Високорейтингові продукти групи ABC)</h3>
        <Table dataSource={productsGroups?.groupB} columns={columns} pagination={false} />
      </div>
      <div className={styles.tableWrapper}>
        <h3 className={styles.groupBCTitle}><b>Група C</b> (Високорейтингові продукти групи ABC)</h3>
        <Table dataSource={productsGroups?.groupC} columns={columns} pagination={false} />
      </div>
      <div className={styles.tableWrapper}>
        <h3 className={styles.groupXTitle}><b>Група X</b> (Низькорейтингові продукти)</h3>
        <Table dataSource={productsGroups?.groupX} columns={columns} pagination={false} />
      </div>
    </div>
  );
};

export default ProductsGroups;
