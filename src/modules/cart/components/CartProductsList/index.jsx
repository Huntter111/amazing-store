import React, { useEffect, useMemo, useState } from 'react';
import { Breadcrumb } from 'antd';

import { useCart } from '../../context/CartContext';
import { ROUTES } from '../../../../routes';
import CartProduct from '../CartProduct';
import AppButton from '../../../common/components/AppButton';
import { BUTTON_TYPE } from '../../../common/constants';
import OrderModal from '../../../orders/components/OrderModal';

import styles from './cartProductsList.module.scss';
import { useAssociativeData } from '../../../statistic/context/AssociativesContext';
import { useGlobalContext } from '../../../common/context';
import ProductCard from '../../../products/components/ProductCard';
import { useUserData } from '../../../auth/context/UserDataContext';

const CartProductsList = () => {
  const { cart, clearCart } = useCart();
  const { products } = useGlobalContext();
  const [salePrice, setSalePrice] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { associativesData, getAllAssociativesDataInfo } = useAssociativeData();
  const { userData } = useUserData();
  const [totalPrice, setTotalPrice] = useState(null);

  useEffect(() => {
    getAllAssociativesDataInfo();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const totalPrice = cart.reduce((acc, item) => {
      const { price } = item;
      return acc + price.priceAmount;
    }, 0);
    if (userData && userData.loyalty && totalPrice) {
      setSalePrice((totalPrice * userData?.loyalty?.adjustment).toFixed(2));
      setTotalPrice((totalPrice - totalPrice * userData?.loyalty?.adjustment).toFixed(2));
    } else {
      setTotalPrice(totalPrice);
    }
  }, [cart, userData]);

  const associatives = useMemo(() => {
    if (!associativesData?.length && !products) return [];

    const associativesList = associativesData?.[0]?.results;
    const cartProductsIDs = cart?.map((_) => _.id);

    const filteredAssociations = associativesList?.filter(({ antecedent, consequent }) => {
      if (!antecedent || !consequent) return false;

      const isAntecedentExist = antecedent?.every((id) => cartProductsIDs.includes(id));

      if (isAntecedentExist) {
        return !consequent?.some((id) => cartProductsIDs.includes(id));
      }

      return false;
    });

    return filteredAssociations?.reduce((acc, association) => {
      const { consequent } = association;

      const formattedConsequent = consequent?.map((item) => {
        return products.find((_) => _.id === item);
      });

      if (formattedConsequent?.length) {
        formattedConsequent.forEach((_) => {
          acc.push(_);
        });
      }

      return acc;
    }, []);
  }, [associativesData, cart, products]);

  return (
    <>
      <Breadcrumb className={styles.breadcrumbs} separator=">">
        <Breadcrumb.Item href={ROUTES.PRODUCTS_LIST}>Список продуктів</Breadcrumb.Item>
        <Breadcrumb.Item>Кошик</Breadcrumb.Item>
      </Breadcrumb>
      <div className={styles.cartInfoWrapper}>
        <div className={styles.cartListWrapper}>
          {cart.map(({ id, count, description, price, title, type, url }) => {
            return <CartProduct key={id} {...{ id, count, description, price, title, type, url }} />;
          })}
        </div>
        {!!associatives?.length && (
          <div className={styles.associativeSection}>
            <h3 className={styles.associationTitle}>До Вашого набору продуктів також додають</h3>
            <div className={styles.associationsWrapper}>
              {[...new Set(associatives)].map(({ id, name, price, images, type }) => {
                return (
                  <ProductCard
                    id={id}
                    key={id}
                    style={styles.associativeProductCard}
                    title={name}
                    type={type[0].fields.name}
                    price={price}
                    url={images[0].file.url}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className={styles.summary}>
        <AppButton
          disabled={!cart.length}
          className={styles.priceButton}
          type={BUTTON_TYPE.PRIMARY}
          name="Зробити замовлення"
          onClick={() => {
            setIsOpenModal(true);
          }}
        />
        <div className={styles.positionCount}>
          <span>Всього позицій:</span>{' '}
          <span>
            <b>{cart.length}</b>
          </span>
        </div>
        <div className={styles.totalPrice}>
          <span>До сплати:</span>{' '}
          <span>
            <b>{`${totalPrice}`}</b>
          </span>{' '}
          <span>UAH</span>
          {userData?.loyalty && totalPrice ? (
            <span>{`  ( Знижка - ${userData?.loyalty.adjustment * 100}%  заощаджено ${salePrice} UAH ) `}</span>
          ) : (
            ''
          )}
        </div>
      </div>
      <OrderModal clearCart={clearCart} isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
    </>
  );
};

export default CartProductsList;
