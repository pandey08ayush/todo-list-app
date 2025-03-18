import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../contexts/ProductContext'; // Import the context
import '../styles/HomeScreen.css';

const HomeScreen = () => {
  const { products, loading, error, addProduct } = useContext(ProductContext); // Use context to get products and state
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    category: '',
  });

  // Handle form input for new product
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Handle add product
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.title || !newProduct.price || !newProduct.description || !newProduct.image || !newProduct.category) {
      alert('Please fill out all fields.');
      return;
    }
    addProduct(newProduct); // Add product using context
    setNewProduct({
      title: '',
      price: '',
      description: '',
      image: '',
      category: '',
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="home-container">
      {/* Add Product Form */}
      <h2>Add a New Product</h2>
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          name="title"
          value={newProduct.title}
          onChange={handleInputChange}
          placeholder="Title"
        />
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
          placeholder="Price"
        />
        <input
          type="text"
          name="description"
          value={newProduct.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <input
          type="text"
          name="image"
          value={newProduct.image}
          onChange={handleInputChange}
          placeholder="Image URL"
        />
        <input
          type="text"
          name="category"
          value={newProduct.category}
          onChange={handleInputChange}
          placeholder="Category"
        />
        <button type="submit">Add Product</button>
      </form>

      {/* Product List */}
      <h1>Product List</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.title}
              style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }}
            />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <Link to={`/product/${product.id}`} className="product-details-link">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
