import { useState } from "react";
import { db, collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc } from "../";

const useProductsDB = () => {
  const [products, setProducts] = useState(null);
  const [product, setProduct] = useState(null);

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

  const getProduct = async (id) => {
    const productDoc = doc(db, "products", id);
    const data = await getDoc(productDoc);
    const formatedData = data.data();
    setProduct(formatedData);
  };

  return { product, products, createProduct, getProducts, getProduct, updateProduct, deleteProduct };
};

export default useProductsDB;
