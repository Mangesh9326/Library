import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <ul className="space-y-4">
        <li>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-gray-700 transition ${
                isActive ? 'bg-gray-700' : ''
              }`
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-gray-700 transition ${
                isActive ? 'bg-gray-700' : ''
              }`
            }
          >
            Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/manage-books"
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-gray-700 transition ${
                isActive ? 'bg-gray-700' : ''
              }`
            }
          >
            Add Books
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/books"
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-gray-700 transition ${
                isActive ? 'bg-gray-700' : ''
              }`
            }
          >
            Manage Books
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;