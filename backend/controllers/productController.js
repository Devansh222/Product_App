const Product = require("../models/Product");

// Get all products with optional search and category filters (GET)
const getProducts = async (req, res) => {
  const { search = "", category = "" } = req.query;
  const query = {};

  // Uses a case-insensitive regular expression i flag
  if (search) query.name = new RegExp(search, "i");

  if (category && category !== "All") query.category = category;

  try {
    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new product (POST)
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a product by ID (PUT)
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Export all functions
module.exports = { getProducts, createProduct, updateProduct, deleteProduct };
