import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-700 to-purple-500 text-white py-10">
      <div className="container mx-auto px-4">
        {/* โลโก้และเมนู */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src="/logo1.jpg" alt="Logo" className="w-12 h-12 object-contain" />
            <span className="text-3xl font-bold">Burit</span>
          </div>

          {/* เมนูลิงก์ */}
          <div className="space-x-6 text-lg">
            <a href="#" className="hover:text-purple-300 transition duration-300">Home</a>
          </div>
        </div>

        {/* ข้อความสิทธิ์ */}
        <div className="mt-8 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Burit. All rights reserved.
          </p>
          <div className="mt-2 text-sm">
            <a href="#" className="hover:text-purple-300">Privacy Policy</a> | <a href="#" className="hover:text-purple-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
