import AppModal from "../../../common/components/AppModal";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
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
        <SignIn setAuthFormType={() => setAuthFormType(AUTH_FORM_TYPE.SIGN_UP)} />
      ) : (
        <SignUp setAuthFormType={() => setAuthFormType(AUTH_FORM_TYPE.SIGN_IN)} />
      )}
    </AppModal>
  );
};

export default AuthModal;
