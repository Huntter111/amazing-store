import React, { useMemo, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";

import AppButton from "../AppButton";
import AppLogo from "../AppLogo";
import styles from "./header.module.scss";
import { BUTTON_TYPE } from "../../constants";
import AuthModal from "../../../auth/components/AuthModal";
import { useUserAuth } from "../../../auth/context/AuthContext";
import { AUTH_FORM_TYPE } from "../../constants";
import { ROUTES } from "../../../../routes";
import { useCart } from "../../../cart/context/CartContext";
import { useMedia } from "../../hooks/useMedia";
import MobileMenu from "../MobileMenu";

const AppHeader = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [authFormType, setAuthFormType] = useState(AUTH_FORM_TYPE.SIGN_IN);
  const { user, signOut } = useUserAuth();
  const { isLarge, isMedium, isSmall, isXlarge, ref: headerRef } = useMedia();
  const navigate = useNavigate();
  const { cart } = useCart();

  return useMemo(
    () => {
      const isShowCartProductCount = cart.length >= 1;

      return (
        <header className={styles.header} ref={headerRef}>
          <AppLogo />
          <MobileMenu />
          <div className={styles.headerControl}>
            <div className={styles.cartButtonWrapper}>
              <AppButton
                className={styles.cartButton}
                type={BUTTON_TYPE.DEFAULT}
                name={"Кошик"}
                onClick={() => navigate(ROUTES.CART)}
              />
              {isShowCartProductCount && (
                <div className={styles.cartProductCount}>{cart.length}</div>
              )}
            </div>
            {!user ? (
              <AppButton
                type={BUTTON_TYPE.PRIMARY}
                name={"Увійти"}
                onClick={() => {
                  setAuthFormType(AUTH_FORM_TYPE.SIGN_IN);
                  setIsOpenModal(true);
                }}
              />
            ) : (
              <div>
                <AppButton
                  type={BUTTON_TYPE.DEFAULT}
                  name={"Мої замовлення"}
                  onClick={() => navigate(`${ROUTES.ORDERS_LIST}`)}
                />
                <Popconfirm
                  okText={"Вихід"}
                  onConfirm={() => {
                    signOut();
                    navigate(ROUTES.PRODUCTS_LIST);
                  }}
                  showCancel={false}
                  icon={false}
                  className={styles.popconfirm}
                >
                  <Avatar className={styles.avatar} icon={<UserOutlined />} />
                </Popconfirm>
              </div>
            )}
          </div>
          <AuthModal
            isOpenModal={isOpenModal}
            authFormType={authFormType}
            setIsOpenModal={setIsOpenModal}
            setAuthFormType={setAuthFormType}
          />
        </header>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cart, user, isOpenModal, authFormType]
  );
};

export default AppHeader;
