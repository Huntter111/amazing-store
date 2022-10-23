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
      console.log(values);
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
      <h1 className={styles.formHeader}>Sign Up</h1>
      <Formik
        initialValues={{ email: "", password: "", confirmPpassword: "" }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required("Email is Required"),
          password: Yup.string()
            .required("Password is Required")
            .min(8, "Password is too short - should be 8 chars minimum.")
            .matches(/(?=.*[0-9])/, "Password must contain a number."),
          confirmPpassword: Yup.string()
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
              <InputField
                type="password"
                name="confirmPpassword"
                title="Confirm Password"
                placeholder="Confirm your password"
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
                name="Sign Up"
                onClick={handleSubmit}
              />
            </Form>
          );
        }}
      </Formik>
      <a className={styles.changeFormButton} onClick={goToSignIn}>
        Go to Sign In
      </a>
    </>
  );
};

export default SignUpForm;
