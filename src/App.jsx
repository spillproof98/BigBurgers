import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import ProductDetails from './pages/ProductDetails';
import AdminOrders from './pages/AdminOrders';
import AdminUsers from './pages/AdminUsers';
import EmployeeView from './pages/EmployeeView';
import NotFound from './pages/NotFound';
import Orders from './components/Orders';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/employee" element={<EmployeeView />} />
        <Route path="/orders" element={<Orders />} /> {/* ✅ Add this line */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
