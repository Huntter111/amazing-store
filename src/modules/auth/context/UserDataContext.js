import { createContext, useContext} from "react";
import { notification } from "antd";

import useUsersDB from "../../../api/users";

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const { userData, createUserData, getUserData, updateUserData } = useUsersDB();

  const getUserDataInfo = async (email) => {
    try {
      await getUserData(email);
    } catch (error) {
      notification.error({
        message: "Не вдалося отримати даних користувача",
        description:
          "На жаль не вдалося отримати даних користувача, спробуйте пізніше",
      });
    }
  };

  const createUserDataInfo = async (data) => {
    try {
      await createUserData(data);
    } catch (error) {
      notification.error({
        message: "Не вдалося додати даних користувача",
        description:
          "На жаль не вдалося додати даних користувача, спробуйте пізніше",
      });
    }
  };

  const updateUserDataInfo = async (id, data) => {
    try {
      await updateUserData(id, data);
    } catch (error) {
      notification.error({
        message: "Не вдалося додати даних користувача",
        description:
          "На жаль не вдалося додати даних користувача, спробуйте пізніше",
      });
    }
  };

  return (
    <UserDataContext.Provider value={{ userData, getUserDataInfo, createUserDataInfo, updateUserDataInfo }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  return useContext(UserDataContext);
};
