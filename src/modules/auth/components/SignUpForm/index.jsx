/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Formik, Form } from "formik";
import { useCallback } from "react";
import * as Yup from "yup";
import { notification } from "antd";

import InputField from "../../../common/components/InputField";
import AppButton from "../../../common/components/AppButton";
import { BUTTON_TYPE } from "../../../common/constants";
import { useUserAuth } from "../../context/AuthContext";
import styles from "./signUp.module.scss";

const SignUpForm = ({ goToSignIn, closeModal }) => {
  const { signUp } = useUserAuth();
  const handleSubmit = useCallback((values, { setSubmitting }) => {
    const { email, password, confirmPpassword } = values;
    if (password === confirmPpassword) {
      signUp(email, password);
      setSubmitting(false);
      closeModal();
    } else {
      notification.error({
        message: "Паролі не співпадають",
        description: "Будь-ласка перевірте чи співпадають паролі в обох полях",
      });
    }
  }, []);

  return (
    <>
      <h1 className={styles.formHeader}>Реєстрація</h1>
      <Formik
        initialValues={{ email: "", password: "", confirmPpassword: "" }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required("Email є обов'язковим"),
          password: Yup.string()
            .required("Пароль є обов'язковим")
            .min(8, "Пароль має бути не меньше 8 символів.")
            .matches(/(?=.*[0-9])/, "Пароль має містити цифри."),
          confirmPpassword: Yup.string()
            .required("Пароль є обов'язковим")
            .min(8, "Пароль має бути не меньше 8 символів.")
            .matches(/(?=.*[0-9])/, "Пароль має містити цифри."),
        })}
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
              <InputField
                type="email"
                name="email"
                title="Email"
                placeholder="Введіть email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                errorMessage={touched.email && errors.email}
              />
              <InputField
                type="password"
                name="password"
                title="Пароль"
                placeholder="Введіть пароль"
                passwordEye={true}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                errorMessage={touched.password && errors.password}
              />
              <InputField
                type="password"
                name="confirmPpassword"
                title="Підтвердження паролю"
                placeholder="Підтвердіть пароль"
                passwordEye={true}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPpassword}
                errorMessage={
                  touched.confirmPpassword && errors.confirmPpassword
                }
              />
              <AppButton
                type={BUTTON_TYPE.PRIMARY}
                className={styles.formButton}
                name="Реєстрація"
                onClick={handleSubmit}
              />
            </Form>
          );
        }}
      </Formik>
      <a className={styles.changeFormButton} onClick={goToSignIn}>
        Перейти до входу
      </a>
    </>
  );
};

export default SignUpForm;
