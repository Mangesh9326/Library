import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // ✅ Clear any session data if using (e.g., localStorage, sessionStorage)
    // localStorage.removeItem('adminToken'); // Uncomment if using token

    // ✅ Redirect to login
    navigate('/admin/login');
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-semibold">Admin Panel</h1>
      <button
        onClick={handleLogout}
        className="bg-white text-gray-900 px-4 py-2 rounded hover:bg-gray-200 transition"
      >
        Logout
      </button>
    </nav>
  );
};

export default AdminNavbar;
