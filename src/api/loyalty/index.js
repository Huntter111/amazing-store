import { useState } from 'react';
import { db, collection, getDocs, addDoc, doc } from '../';
import { deleteDoc } from '../index';

const useLoyaltyDB = () => {
  const [loyaltiesData, setLoyaltiesData] = useState(null);

  const loyaltiesRef = collection(db, 'loyalties');

  const getAllLoyaltiesData = async () => {
    const data = await getDocs(loyaltiesRef);
    const formatedData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setLoyaltiesData(formatedData);
  };

  const createLoyaltiesData = async (data) => {
    await addDoc(loyaltiesRef, data);
  };

  const deleteLoyaltyDataData = async (id) => {
    const loyaltyDataDoc = doc(db, 'loyalties', id);
    await deleteDoc(loyaltyDataDoc);
  };

  return {
    loyaltiesData,
    createLoyaltiesData,
    getAllLoyaltiesData,
    deleteLoyaltyDataData,
  };
};

export default useLoyaltyDB;
