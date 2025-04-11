import React from "react";
import { Outlet, Link } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaClipboardList,
  FaShoppingCart,
  FaUsers,
  FaPlus,
  FaCog,
  FaHeadset,
} from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="bg-gradient-to-b from-purple-100 via-purple-50 to-white min-h-screen">

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">Dashboard</h1>
        <p className="text-xl text-gray-600 mb-8 text-center">Welcome to your admin dashboard. Manage everything with ease.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Add a new Product */}
          <div className="bg-white shadow-2xl hover:shadow-2xl transition-shadow duration-300 ease-in-out p-8 rounded-2xl text-center">
            <FaPlus className="mx-auto text-3xl text-purple-600 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add a New Product</h2>
            <Link 
              to="/dashboard/add-product" 
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
            >
              Add Product
            </Link>
          </div>

          {/* Manage Items */}
          <div className="bg-white shadow-2xl hover:shadow-2xl transition-shadow duration-300 ease-in-out p-8 rounded-2xl text-center">
            <FaBox className="mx-auto text-3xl text-green-600 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manage Items</h2>
            <Link 
              to="/dashboard/manageItems" 
              className="inline-block bg-green-600 text-white px-8 py-4 rounded-full text-lg hover:bg-green-700 transition-colors duration-300 transform hover:scale-105"
            >
              Manage Items
            </Link>
          </div>

          {/* Manage Users */}
          <div className="bg-white shadow-2xl hover:shadow-2xl transition-shadow duration-300 ease-in-out p-8 rounded-2xl text-center">
            <FaUsers className="mx-auto text-3xl text-pink-600 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manage Users</h2>
            <Link 
              to="/dashboard/manage-users" 
              className="inline-block bg-pink-600 text-white px-8 py-4 rounded-full text-lg hover:bg-pink-700 transition-colors duration-300 transform hover:scale-105"
            >
              Manage Users
            </Link>
          </div>

          {/* Manage Orders */}
          <div className="bg-white shadow-2xl hover:shadow-2xl transition-shadow duration-300 ease-in-out p-8 rounded-2xl text-center">
            <FaShoppingCart className="mx-auto text-3xl text-purple-600 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manage Orders</h2>
            <Link 
              to="/dashboard/manage-orders" 
              className="inline-block bg-purple-600 text-white px-8 py-4 rounded-full text-lg hover:bg-purple-700 transition-colors duration-300 transform hover:scale-105"
            >
              Manage Orders
            </Link>
          </div>
        </div>

        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
