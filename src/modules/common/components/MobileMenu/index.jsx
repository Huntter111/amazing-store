import React, { useState } from "react";
import { Drawer } from "antd";

import AppLogo from "../AppLogo";
import AppButton from "../AppButton";
import { BUTTON_TYPE } from "../../constants";
import './mobileMenu.global.scss';

const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  const showMenu = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="mobileMenu">
      <AppButton name={'Open'} type={BUTTON_TYPE.PRIMARY} onClick={showMenu} />
      <Drawer
        title={<AppLogo />}
        placement="top"
        onClose={onClose}
        open={open}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  );
};

export default MobileMenu;
