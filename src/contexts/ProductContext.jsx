import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
const ProductContext = createContext();

// Create a provider component
const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('There was an error fetching products.');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Add a new product
  const addProduct = async (newProduct) => {
    try {
      const response = await axios.post('https://fakestoreapi.com/products', newProduct);
      setProducts([...products, response.data]);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <ProductContext.Provider value={{ products, loading, error, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
