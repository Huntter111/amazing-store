import { useState } from "react";
import { db, collection, getDocs, addDoc } from "../";

const useProductsDB = () => {
  const [products, setProducts] = useState(null);

  const productsRef = collection(db, "products");

  const createProduct = async (data) => {
    await addDoc(productsRef, data);
  };

  const getProducts = async () => {
    const data = await getDocs(productsRef);
    const formatedData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setProducts(formatedData);
  };

  return { products, createProduct, getProducts };
};

export default useProductsDB;
