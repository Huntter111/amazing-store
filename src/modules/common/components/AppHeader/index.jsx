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
//TODO: when mobile will need
// import { useMedia } from "../../hooks/useMedia";
// import MobileMenu from "../MobileMenu";
import { HelperModal } from "../../../helper/HelperModal";
import { useModal } from "../AppModal";

const AppHeader = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [authFormType, setAuthFormType] = useState(AUTH_FORM_TYPE.SIGN_IN);
  const { user, signOut } = useUserAuth();
  //TODO: when mobile will need
  // const { isLarge, isMedium, isSmall, isXlarge, ref: headerRef } = useMedia();
  const navigate = useNavigate();
  const { cart } = useCart();

  const {
    isOpen: isOpenHelper,
    openModal: openHelper,
    closeModal: closeHelper,
  } = useModal();

  return useMemo(
    () => {
      const isShowCartProductCount = cart.length >= 1;

      return (
        //TODO: when mobile will need
        // <header className={styles.header} ref={headerRef}>
        <header className={styles.header}>
          <AppLogo />
          {/* <MobileMenu /> */}
          <div className={styles.headerControl}>
            <div className={styles.cartButtonWrapper}>
              <AppButton
                className={styles.btn}
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
                <AppButton
                  className={styles.btn}
                  type={BUTTON_TYPE.DEFAULT}
                  name={"Помічник"}
                  onClick={openHelper}
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

          <HelperModal
            isOpenModal={isOpenHelper}
            closeHelper={closeHelper}
          />
        </header>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      cart,
      user,
      isOpenModal,
      authFormType,
      isOpenHelper,
      openHelper,
      closeHelper,
    ]
  );
};

export default AppHeader;
