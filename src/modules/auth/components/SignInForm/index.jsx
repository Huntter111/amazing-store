/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Formik, Form } from "formik";
import { useCallback } from "react";
import * as Yup from "yup";

import InputField from "../../../common/components/InputField";
import AppButton from "../../../common/components/AppButton";
import { BUTTON_TYPE } from "../../../common/constants";
import { useUserAuth } from "../../context/AuthContext";
import styles from "./signIn.module.scss";

const SignInForm = ({ goToSignUp, closeModal }) => {
  const { signIn } = useUserAuth();
  const handleSubmit = useCallback(async (values, { setSubmitting }) => {
    const { email, password } = values;
    signIn(email, password);
    setSubmitting(false);
    closeModal();
  }, []);

  return (
    <>
      <h1 className={styles.formHeader}>Вхід</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required("Email є обов'язковим"),
          password: Yup.string()
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
              <AppButton
                type={BUTTON_TYPE.PRIMARY}
                className={styles.formButton}
                name="Увійти"
                onClick={handleSubmit}
              />
            </Form>
          );
        }}
      </Formik>
      <a className={styles.changeFormButton} onClick={goToSignUp}>
        Перейти до реєстрації
      </a>
    </>
  );
};

export default SignInForm;
