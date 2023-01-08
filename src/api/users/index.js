import { useState } from "react";
import { db, collection, getDocs, addDoc } from "../";

const useUsersDB = () => {
  const [userData, setUserData] = useState(null);

  const usersRef = collection(db, "users");

  const createUserData = async (data) => {
    const userData = await getDocs(usersRef);
    const formatedData = userData.docs.map((doc) => ({
      ...doc.data(),
    }));

    const isExist = formatedData.find(
      (userInfo) => userInfo.email === data.email
    );

    !isExist && await addDoc(usersRef, data);
  };

  const getUserData = async (email) => {
    const data = await getDocs(usersRef);
    const formatedData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    const userByEmail = formatedData.find(
      (userInfo) => userInfo.email === email
    );
    setUserData(userByEmail);
  };

  return { userData, createUserData, getUserData };
};

export default useUsersDB;
