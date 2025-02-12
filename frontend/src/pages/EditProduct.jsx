import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProducts, updateProduct } from "../api/productAPI";

const EditProduct = () => {
  const { id } = useParams();       // Extracts the id from the URL.
  const navigate = useNavigate();
  const [product, setProduct] = useState({ name: "", price: "", category: "" });

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProducts({ id });                  // fetches all the product
      setProduct(data.products.find((p) => p._id === id));
    };
    fetchProduct();
  }, [id]);

  

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     const data = await getProducts(id);     
  //     setProduct(data);       
  //   };
  //   fetchProduct();
  // }, [id]);


  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProduct(id, product);
    navigate("/");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={product.name} onChange={handleChange} className="border p-2 w-full" placeholder="Product Name" />
        <input type="number" name="price" value={product.price} onChange={handleChange} className="border p-2 w-full" placeholder="Price" />
        <input type="text" name="category" value={product.category} onChange={handleChange} className="border p-2 w-full" placeholder="Category" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
