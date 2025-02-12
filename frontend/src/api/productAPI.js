import axios from "axios";

// Ensure API URL is correct
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/products";

export const getProducts = async (params) => {
  try {
    const response = await axios.get(API_URL, { params });
    // console.log("API Response:", response.data);
    return response.data;
  } 
  catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const createProduct = async (product) => {
  return axios.post(API_URL, product, {
    headers: { "Content-Type": "application/json" }, // Ensure JSON format
  });
};

export const updateProduct = async (id, product) => {
  return axios.put(`${API_URL}/${id}`, product, {
    headers: { "Content-Type": "application/json" },
  });
};

export const deleteProduct = async (id) => axios.delete(`${API_URL}/${id}`);
