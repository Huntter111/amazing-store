import React, {useEffect, useState} from 'react';
import styles from './productsGroups.module.scss'
import {getProductsGroups} from "../../helpers/getProductsGroups";
import {useGlobalContext} from "../../../common/context";
import {Table} from "antd";

const ProductsGroups = ({orders}) => {
  const [productsGroups, setProductsGroups] = useState();
  const { products } = useGlobalContext();

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
  ];

  useEffect(() => {
    setProductsGroups(getProductsGroups(products, orders))
  }, [products, orders]);



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
