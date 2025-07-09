import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import BookDetails from './pages/BookDetails';

import Navbar from './components/navbar.jsx';
import Footer from './components/Footer.jsx';

// Admin components
import AdminLogin from './admin/pages/AdminLogin.jsx'
import Dashboard from './admin/pages/Dashboard.jsx';
import ManageBooks from './admin/pages/ManageBooks.jsx';
import BookList from './admin/pages/BookList.jsx';
import Orders from './admin/pages/Order.jsx';
import AdminLayout from './admin/components/AdminLayout.jsx'
const AppLayout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      
      <Routes>
  {/* User Routes */}
  <Route path="/" element={<Home />} />
  <Route path="/book/:id" element={<BookDetails />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />

  {/* Admin Routes */}
  <Route path="/admin/login" element={<AdminLogin />} />
  <Route path="/admin" element={<AdminLayout />}>
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="orders" element={<Orders />} />
    <Route path="manage-books" element={<ManageBooks />} />
    <Route path="books" element={<BookList />} />
  </Route>
</Routes>


      {!isAdminRoute && <Footer />}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;