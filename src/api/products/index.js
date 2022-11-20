import { useState } from "react";
import { db, collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from "../";

const useProductsDB = () => {
  const [products, setProducts] = useState(null);

  const productsRef = collection(db, "products");

  const createProduct = async (data) => {
    await addDoc(productsRef, data);
  };

  const updateProduct = async (id, data) => {
    const productDoc = doc(db, "products", id);
    await updateDoc(productDoc, data);
  }

  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
  }

  const getProducts = async () => {
    const data = await getDocs(productsRef);
    const formatedData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setProducts(formatedData);
  };

  return { products, createProduct, getProducts, updateProduct, deleteProduct };
};

export default useProductsDB;
