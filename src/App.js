import React from 'react';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import ProductListing from './Pages/ProductListing.jsx';
import ProductDetail from './Pages/ProductDetail.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/products" element={<ProductListing />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
};

export default App;