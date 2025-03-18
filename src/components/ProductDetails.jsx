import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatedProduct, setUpdatedProduct] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    category: '',
  });

  // Fetch product details by ID
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Log the id to check if it's correct
        console.log('Fetching product with ID:', id);

        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        
        // Check if the response contains product data
        if (response.data) {
          setProduct(response.data);
          setUpdatedProduct(response.data); // Initialize form with product data
          setLoading(false);
        } else {
          console.error('Product not found');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  // Handle input change for updating product
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  // Update the product
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://fakestoreapi.com/products/${id}`, updatedProduct);
      setProduct(response.data);  // Update product in the state
      alert('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update the product');
    }
  };

  // Delete the product
  const handleDeleteProduct = async () => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      alert('Product deleted successfully!');
      navigate('/'); // Navigate back to home page after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete the product');
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        {/* Spinner can be styled as you want */}
      </div>
    );
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-details-container">
      <h1>{product.title}</h1>
      <img
        src={product.image}
        alt={product.title}
        style={{ width: '100%', maxWidth: '400px', height: 'auto', objectFit: 'contain' }}
      />
      <p>{product.description}</p>
      <p className="price">Price: ${product.price}</p>
      <p className="category">Category: {product.category}</p>

      <h2>Update Product</h2>
      <form onSubmit={handleUpdateProduct}>
        <input
          type="text"
          name="title"
          value={updatedProduct.title}
          onChange={handleInputChange}
          placeholder="Title"
        />
        <input
          type="number"
          name="price"
          value={updatedProduct.price}
          onChange={handleInputChange}
          placeholder="Price"
        />
        <input
          type="text"
          name="description"
          value={updatedProduct.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <input
          type="text"
          name="image"
          value={updatedProduct.image}
          onChange={handleInputChange}
          placeholder="Image URL"
        />
        <input
          type="text"
          name="category"
          value={updatedProduct.category}
          onChange={handleInputChange}
          placeholder="Category"
        />
        <button type="submit" className="update-btn">Update Product</button>
      </form>

      <button onClick={handleDeleteProduct} className="delete-btn">
        Delete Product
      </button>
    </div>
  );
};

export default ProductDetails;
