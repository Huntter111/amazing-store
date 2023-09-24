import { useState } from "react";
import { db, collection, getDocs, addDoc, updateDoc, doc } from "../";
import {deleteDoc, getDoc} from "../index";

const useAssociativesDB = () => {
  const [associativeData, setAssociativeData] = useState(null);
  const [associativesData, setAssociativesData] = useState(null);

  const associativesRef = collection(db, "associatives");

  const getAllAssociativesData = async () => {
    const data = await getDocs(associativesRef);
    const formatedData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setAssociativesData(formatedData);
  };
  const createAssociativesData = async (data) => {
    await addDoc(associativesRef, data);
  };

  const getAssociativeData = async (id) => {
    const associativeDoc = doc(db, 'associatives', id);
    const data = await getDoc(associativeDoc);
    const formatedData = data.data();

    setAssociativeData(formatedData);
  };

  const updateAssociativeData = async (id, data) => {
    const associativeDoc = doc(db, "associatives", id);
    await updateDoc(associativeDoc, data);
  }

  const deleteAssociativeData = async (id) => {
    const associativeDoc = doc(db, 'associatives', id);
    await deleteDoc(associativeDoc);
  };

  return { associativeData, associativesData, createAssociativesData, updateAssociativeData, getAllAssociativesData, getAssociativeData, deleteAssociativeData };
};

export default useAssociativesDB;
