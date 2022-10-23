const SignUpForm = ({ setAuthFormType }) => {
  return (
    <>
      <div>Sign up</div>
      <div onClick={setAuthFormType}>Go to SignIn</div>
    </>
  );
};

export default SignUpForm;
