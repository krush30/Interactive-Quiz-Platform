import React from "react";

const Footer = () => {
  return (
    <footer className="bg-green-400 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold">Interactive Quiz Platform</h2>
          <p className="text-sm">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-gray-200 transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gray-200 transition">
            Terms of Service
          </a>
          <a href="#" className="hover:text-gray-200 transition">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
