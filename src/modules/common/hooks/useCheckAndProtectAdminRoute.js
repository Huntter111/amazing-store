import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useUserAuth} from "../../auth/context/AuthContext";

export const useCheckAndProtectAdminRoute = () => {
  const navigate = useNavigate();
  const { user } = useUserAuth();

  useEffect(() => {
    if(user?.email !== 'admin@gmail.com') {
      navigate('/');
    }
    // eslint-disable-next-line
  }, [user]);
}