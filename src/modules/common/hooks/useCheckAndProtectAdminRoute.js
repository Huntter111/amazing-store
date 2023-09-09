import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useUserData} from "../../auth/context/UserDataContext";

export const useCheckAndProtectAdminRoute = () => {
  const navigate = useNavigate();
  const { usersData } = useUserData();

  useEffect(() => {
    if(usersData?.role !== 'admin') {
      navigate('/');
    }
    // eslint-disable-next-line
  }, [usersData]);
}