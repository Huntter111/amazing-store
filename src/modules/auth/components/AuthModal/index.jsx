import AppModal from "../../../common/components/AppModal";
import SignInForm from "../SignInForm";
import SignUpForm from "../SignUpForm";
import { AUTH_FORM_TYPE } from "../../constants";

const AuthModal = ({
  isOpenModal,
  authFormType,
  setIsOpenModal,
  setAuthFormType,
}) => {
  return (
    <AppModal isOpen={isOpenModal} onCancel={() => setIsOpenModal(false)}>
      {authFormType === AUTH_FORM_TYPE.SIGN_IN ? (
        <SignInForm
          closeModal={() => setIsOpenModal(false)}
          goToSignUp={() => setAuthFormType(AUTH_FORM_TYPE.SIGN_UP)}
        />
      ) : (
        <SignUpForm
          goToSignIn={() => setAuthFormType(AUTH_FORM_TYPE.SIGN_IN)}
        />
      )}
    </AppModal>
  );
};

export default AuthModal;
