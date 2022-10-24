import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Popconfirm } from "antd";

import AppButton from "../AppButton";
import AppLogo from "../AppLogo";
import styles from "./header.module.scss";
import { BUTTON_TYPE } from "../../constants";
import AuthModal from "../../../auth/components/AuthModal";
import { useUserAuth } from "../../../auth/context/AuthContext";
import { AUTH_FORM_TYPE } from "../../constants";

const AppHeader = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [authFormType, setAuthFormType] = useState(AUTH_FORM_TYPE.SIGN_IN);
  const { user, signOut } = useUserAuth();

  return (
    <header className={styles.header}>
      <AppLogo />
      {!user ? (
        <AppButton
          type={BUTTON_TYPE.PRIMARY}
          name={"Увійти"}
          onClick={() => setIsOpenModal(true)}
        />
      ) : (
        <div className={styles.headerControl}>
          <AppButton type={BUTTON_TYPE.DEFAULT} name={"Мої замовлення"} />
          <Popconfirm
            okText={"Вихід"}
            onConfirm={() => signOut()}
            showCancel={false}
            icon={false}
            className={styles.popconfirm}
          >
            <Avatar className={styles.avatar} icon={<UserOutlined />} />
          </Popconfirm>
        </div>
      )}
      <AuthModal
        isOpenModal={isOpenModal}
        authFormType={authFormType}
        setIsOpenModal={setIsOpenModal}
        setAuthFormType={setAuthFormType}
      />
    </header>
  );
};

export default AppHeader;
