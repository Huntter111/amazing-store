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
      <h1 className={styles.formHeader}>{`Замовлення №${
        orderNumber ? orderNumber : ""
      }`}</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().required("Iм'я є обов'язковим"),
          lastName: Yup.string().required("Прізвище є обов'язковим"),
          email: Yup.string().email().required("Email є обов'язковим"),
          phone: Yup.string().required("Телефон є обов'язковим"),
          city: Yup.string().required("Місто є обов'язковим"),
          street: Yup.string().required("Вулиця є обов'язковою"),
          house: Yup.string().required("Дім є обов'язковим"),
          apartment: Yup.string().required("Квартира є обов'язковим"),
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
              <h2>Дані замовника</h2>
              <InputField
                type="firstName"
                name="firstName"
                title="Ім'я"
                placeholder="Ім'я"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                errorMessage={touched.firstName && errors.firstName}
              />
              <InputField
                type="lastName"
                name="lastName"
                title="Прізвище"
                placeholder="Прізвище"
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
                title="Телефон"
                placeholder="Телефон"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                errorMessage={touched.phone && errors.phone}
              />
              <h2>Адреса доставки</h2>
              <InputField
                type="city"
                name="city"
                title="Місто"
                placeholder="Місто"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.city}
                errorMessage={touched.city && errors.city}
              />
              <InputField
                type="street"
                name="street"
                title="Вулиця"
                placeholder="Вулиця"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.street}
                errorMessage={touched.street && errors.street}
              />
              <div className={styles.buildApart}>
                <InputField
                  type="house"
                  name="house"
                  title="Дім"
                  placeholder="Номер дому"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.house}
                  errorMessage={touched.house && errors.house}
                />
                <InputField
                  type="apartment"
                  name="apartment"
                  title="Квартира"
                  placeholder="Номер квартири"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.apartment}
                  errorMessage={touched.apartment && errors.apartment}
                />
              </div>
              <AppButton
                type={BUTTON_TYPE.PRIMARY}
                className={styles.formButton}
                name="Замовити"
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
