/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Formik, Form } from "formik";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../../../routes";
import { useUserAuth } from "../../../auth/context/AuthContext";
import { useOrders } from "../../context/OrdersContext";
import { useUserData } from "../../../auth/context/UserDataContext";
import { useCart } from "../../../cart/context/CartContext";
import InputField from "../../../common/components/InputField";
import InputPhoneField from "../../../common/components/InputPhoneField";
import AppButton from "../../../common/components/AppButton";
import { BUTTON_TYPE } from "../../../common/constants";
import {sendOrderMessage} from '../../helpers/orderMessanger';

import styles from "./orderForm.module.scss";

const OrderForm = ({ closeModal, clearCart }) => {
  const { cart } = useCart();
  const { user } = useUserAuth();
  const navigate = useNavigate();
  const { userData, createUserDataInfo, getUserDataInfo } = useUserData();
  const { createOrderData } = useOrders();
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    setOrderNumber(Number(moment().format("x")));
    user && getUserDataInfo(user.email);
  }, [user]);

  const handleSubmit = useCallback(
    (values, { resetForm }) => {
      const {
        firstName,
        lastName,
        email,
        phone,
        city,
        street,
        house,
        apartment,
      } = values;

      const orderData = {
        orderNumber,
        orderDate: moment().format("l"),
        userInfo: {
          firstName,
          lastName,
          email,
          phone,
        },
        address: {
          city,
          street,
          house,
          apartment,
        },
        cartProducts: cart,
      };

      if (!userData) {
        createUserDataInfo({ ...orderData.userInfo, ...orderData.address });
      }

      createOrderData(orderData);
      closeModal();
      clearCart();
      resetForm();
      sendOrderMessage(orderData);
      navigate(ROUTES.PRODUCTS_LIST);
    },
    [orderNumber, userData]
  );

  const initialValues = useMemo(() => {
    if (userData) return userData;

    return {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      street: "",
      house: "",
      apartment: "",
    };
  }, [userData]);

  return (
    <>
      <h1 className={styles.formHeader}>{`???????????????????? ???${
        orderNumber ? orderNumber : ""
      }`}</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().required("I??'?? ?? ????????'??????????????"),
          lastName: Yup.string().required("???????????????? ?? ????????'??????????????"),
          email: Yup.string().email().required("Email ?? ????????'??????????????"),
          phone: Yup.string().required("?????????????? ?? ????????'??????????????"),
          city: Yup.string().required("?????????? ?? ????????'??????????????"),
          street: Yup.string().required("???????????? ?? ????????'??????????????"),
          house: Yup.string().required("?????? ?? ????????'??????????????"),
          apartment: Yup.string().required("???????????????? ?? ????????'??????????????"),
        })}
        enableReinitialize
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
          } = props;
          return (
            <Form>
              <h2>???????? ??????????????????</h2>
              <InputField
                type="firstName"
                name="firstName"
                title="????'??"
                placeholder="????'??"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                errorMessage={touched.firstName && errors.firstName}
              />
              <InputField
                type="lastName"
                name="lastName"
                title="????????????????"
                placeholder="????????????????"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
                errorMessage={touched.lastName && errors.lastName}
              />
              <InputField
                type="email"
                name="email"
                title="Email"
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                errorMessage={touched.email && errors.email}
              />
              <InputPhoneField
                type="phone"
                name="phone"
                title="??????????????"
                placeholder="??????????????"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                errorMessage={touched.phone && errors.phone}
              />
              <h2>???????????? ????????????????</h2>
              <InputField
                type="city"
                name="city"
                title="??????????"
                placeholder="??????????"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.city}
                errorMessage={touched.city && errors.city}
              />
              <InputField
                type="street"
                name="street"
                title="????????????"
                placeholder="????????????"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.street}
                errorMessage={touched.street && errors.street}
              />
              <div className={styles.buildApart}>
                <InputField
                  type="house"
                  name="house"
                  title="??????"
                  placeholder="?????????? ????????"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.house}
                  errorMessage={touched.house && errors.house}
                />
                <InputField
                  type="apartment"
                  name="apartment"
                  title="????????????????"
                  placeholder="?????????? ????????????????"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.apartment}
                  errorMessage={touched.apartment && errors.apartment}
                />
              </div>
              <AppButton
                type={BUTTON_TYPE.PRIMARY}
                className={styles.formButton}
                name="????????????????"
                onClick={handleSubmit}
              />
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default OrderForm;
