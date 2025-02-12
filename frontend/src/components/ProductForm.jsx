import React, { useState } from "react";
import { createProduct } from "../api/productAPI";

const ProductForm = ({ fetchProducts }) => {
  const [product, setProduct] = useState({ name: "", image: "", price: "", category: "" });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Submitting product:", product);
    try {
      const response = await createProduct(product);
      // console.log("Product added successfully!", response.data);

      // Refresh product list
      fetchProducts();
      setProduct({ name: "", image: "", price: "", category: "" }); // Reset form
    } 
    catch (error) {
      console.error("Error adding product:", error.response?.data || error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <input type="text" name="name" value={product.name} onChange={handleChange} className="border p-2 w-full" placeholder="Product Name" required />
      <input type="text" name="image" value={product.image} onChange={handleChange} className="border p-2 w-full" placeholder="Image URL" required />
      <input type="number" name="price" value={product.price} onChange={handleChange} className="border p-2 w-full" placeholder="Price" required />
      <input type="text" name="category" value={product.category} onChange={handleChange} className="border p-2 w-full" placeholder="Category" required />
      <button type="submit" className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded mt-2">Add Product</button>
    </form>
  );
};

export default ProductForm;
