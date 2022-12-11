import { createContext, useContext, useEffect, useState } from "react";
import { notification } from "antd";

import {
  checkUser,
  logoutUser,
  createUser,
  loginUser,
} from "../../../api/auth";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUser((user) => setUser(user));
  }, []);

  const signUp = async (email, password) => {
    try {
      const data = await createUser(email, password);
      setUser(data);
    } catch (error) {
      if(error.code === 'auth/email-already-in-use') {
        notification.error({
          message: "Не вдалося зареєструватися",
          description: "Користувач з таким Email вже існує",
        });
      } else {
        notification.error({
          message: "Не вдалося зареєструватися",
          description: "На жаль не вдалося зареєструватися, спробуйте пізніше",
        });
      }
    }
  };

  const signIn = async (email, password) => {
    try {
      const data = await loginUser(email, password);
      setUser(data);
    } catch (error) {
      notification.error({
        message: "Паролі не співпадають",
        description: "Будь-ласка перевірте чи співпадають паролі в обох полях",
      });
    }
  };

  const signOut = () => {
    try {
      logoutUser();
      setUser(null);
    } catch (error) {
      notification.error({
        message: "Не вдалося вийти з облікового запису",
        description:
          "На жаль не вдалося вийти з облікового запису, спробуйте пізніше",
      });
    }
  };

  return (
    <UserContext.Provider value={{ user, signOut, signUp, signIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(UserContext);
};
