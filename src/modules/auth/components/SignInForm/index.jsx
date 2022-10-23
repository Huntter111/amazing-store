/* eslint-disable jsx-a11y/anchor-is-valid */
import { Formik, Form } from "formik";
import { useCallback } from "react";
import * as Yup from "yup";
import InputField from "../../../common/components/InputField";
import AppButton from "../../../common/components/AppButton";
import { BUTTON_TYPE } from "../../../common/constants";
import styles from "./signIn.module.scss";

const SignInForm = ({ setAuthFormType }) => {
  const handleSubmit = useCallback((values, { setSubmitting }) => {
    setTimeout(() => {
      console.log("Logging in", values);
      setSubmitting(false);
    }, 500);
  }, []);

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
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                errorMessage={touched.password && errors.password}
              />
              <AppButton
                type={BUTTON_TYPE.PRIMARY}
                className={styles.formButton}
                name="Submit"
                onClick={handleSubmit}
              />
            </Form>
          );
        }}
      </Formik>
      <a className={styles.changeFormButton} onClick={setAuthFormType}>
        Go to SignUp
      </a>
    </>
  );
};

export default SignInForm;
