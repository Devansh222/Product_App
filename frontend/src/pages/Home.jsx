import React from "react";
import ProductList from "../components/ProductList";

const Home = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Product Management</h1>
      <ProductList />
    </div>
  );
};

export default Home;
