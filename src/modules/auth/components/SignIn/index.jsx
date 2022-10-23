const SignIn = ({ setAuthFormType }) => {
  return (
    <>
      <div>Sign in</div>
      <div onClick={setAuthFormType}>Go to SignUp</div>
    </>
  );
};

export default SignIn;
