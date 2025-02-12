import React, { useEffect, useState } from "react";
import { Table, Button, Space, Input, Select } from "antd";          // Ant Design
import { getProducts, deleteProduct } from "../api/productAPI";
import { useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";

const { Search } = Input;
const { Option } = Select;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [search, category]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (category) params.category = category;
  
      // console.log("fetching products with params:", params);

      const data = await getProducts(params);
      
      // console.log("API Response:", data);
  
      if (Array.isArray(data)) {
        setProducts(data);
      } 
      else {
        console.error("Invalid product data format:", data);
        setProducts([]);
      }
    } 
    catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
    setLoading(false);
  };
  

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Category", dataIndex: "category", key: "category" },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image} alt="Product" width="50" height="50" onError={(e) => (e.target.style.display = "none")} />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => navigate(`/edit/${record._id}`)}>Edit</Button>
          <Button type="danger" onClick={() => handleDelete(record._id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Product List</h2>
      <ProductForm fetchProducts={fetchProducts} />
      <div className="flex gap-4 mb-4 mt-4">
        <Search placeholder="Search by name" onSearch={setSearch} enterButton />
        <Select placeholder="Filter by Category" onChange={setCategory} allowClear>
          <Option value="Electronics">Electronics</Option>
          <Option value="Clothing">Clothing</Option>
        </Select>
      </div>
      <Table dataSource={products} columns={columns} loading={loading} rowKey="_id" />
    </div>
  );
};

export default ProductList;
