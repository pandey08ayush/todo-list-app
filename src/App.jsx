import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProductProvider } from './contexts/ProductContext';  // Import the ProductProvider
import HomeScreen from './components/HomeScreen';  // Import HomeScreen component
import ProductDetails from './components/ProductDetails';  // Import ProductDetails component

function App() {
  return (
    <ProductProvider> {/* Wrap the application with ProductProvider */}
      <Router> {/* Setting up Router for navigation */}
        <Routes> {/* Define the routes for the app */}
          <Route path="/" element={<HomeScreen />} />  {/* Home screen route */}
          <Route path="/product/:id" element={<ProductDetails />} />  {/* Product details route */}
        </Routes>
      </Router>
    </ProductProvider>
  );
}

export default App;
