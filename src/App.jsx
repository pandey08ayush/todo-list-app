import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { ProductProvider } from './contexts/ProductContext';  
import HomeScreen from './components/HomeScreen';  
import ProductDetails from './components/ProductDetails';  

function App() {
  return (
    <React.StrictMode>
      <ProductProvider> 
        <Router> 
          <Routes> 
            <Route path="/" element={<HomeScreen />} />  
            <Route path="/product/:id" element={<ProductDetails />} />  
          </Routes>
        </Router>
      </ProductProvider>
    </React.StrictMode>
  );
}

export default App;
