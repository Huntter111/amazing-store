/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Formik, Form } from "formik";
import { useCallback, useEffect } from "react";
import * as Yup from "yup";

import InputField from "../../../common/components/InputField";
import AppButton from "../../../common/components/AppButton";
import { BUTTON_TYPE } from "../../../common/constants";
import { useUserAuth } from "../../context/AuthContext";
import styles from "./signIn.module.scss";
import { notification } from "antd";

const SignInForm = ({ goToSignUp, closeModal }) => {
  const { signIn, error, resetError } = useUserAuth();
  const handleSubmit = useCallback(async (values, { setSubmitting }) => {
    const { email, password } = values;
    signIn(email, password);
    setSubmitting(false);
    closeModal();
  }, []);

  useEffect(() => {
    if (error) {
      notification.error({
        message: error,
        description: "Невірний логін або пароль",
      });
    }

    return () => {
      resetError();
    };
  }, [error]);

  return (
    <>
      <h1 className={styles.formHeader}>Sign In</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required("Email is Required"),
          password: Yup.string()
            .required("Password is Required")
            .min(8, "Password is too short - should be 8 chars minimum.")
            .matches(/(?=.*[0-9])/, "Password must contain a number."),
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
                placeholder="Enter your email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                errorMessage={touched.email && errors.email}
              />
              <InputField
                type="password"
                name="password"
                title="Password"
                placeholder="Enter your password"
                passwordEye={true}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                errorMessage={touched.password && errors.password}
              />
              <AppButton
                type={BUTTON_TYPE.PRIMARY}
                className={styles.formButton}
                name="Sign In"
                onClick={handleSubmit}
              />
            </Form>
          );
        }}
      </Formik>
      <a className={styles.changeFormButton} onClick={goToSignUp}>
        Go to Sign Up
      </a>
    </>
  );
};

export default SignInForm;
