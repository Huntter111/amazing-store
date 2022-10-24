import { createContext, useContext, useEffect, useState } from "react";
import {
  checkUser,
  logoutUser,
  createUser,
  loginUser,
} from "../../../api/auth";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkUser((user) => setUser(user));
  }, []);

  const signUp = async (email, password) => {
    try {
      const data = await createUser(email, password);
      setUser(data);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const signIn = async (email, password) => {
    try {
      const data = await loginUser(email, password);
      setUser(data);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const signOut = () => {
    try {
      logoutUser();
      setUser(null);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const resetError = () => {
    setError(null);
  };

  return (
    <UserContext.Provider
      value={{ user, error, signOut, signUp, signIn, resetError }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(UserContext);
};
