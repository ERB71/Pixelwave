import React from 'react';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import Login from './Pages/LoginPage.jsx';
import HomePage from './Pages/HomePage.jsx';
import ShirtsListing from './Pages/ShirtsPage.jsx';
import BootsListing from './Pages/BootsPage.jsx';
import ProductDetail from './Pages/SpecificProductInfo.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/home' element={<HomePage />} />
        <Route path="/shirts" element={<ShirtsListing />} />
        <Route path="/boots" element={<BootsListing />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
};

export default App;