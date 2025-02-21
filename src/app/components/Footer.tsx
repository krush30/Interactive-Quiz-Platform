import React from "react";

const Footer = () => {
  return (
    <footer className="bg-green-400 text-white py-4 sm:py-6">
      <div className="container mx-auto px-2 sm:px-4 flex flex-col items-center text-center gap-4 md:flex-row md:justify-between md:text-left">
        <div>
          <h2 className="text-base sm:text-lg font-bold">
            Interactive Quiz Platform
          </h2>
          <p className="text-xs sm:text-sm mt-1">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
        <div className="flex flex-col gap-2 mt-2 sm:mt-4 md:flex-row md:gap-4 md:mt-0">
          <a
            href="#"
            className="text-xs sm:text-sm hover:text-gray-200 transition py-2"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-xs sm:text-sm hover:text-gray-200 transition py-2"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-xs sm:text-sm hover:text-gray-200 transition py-2"
          >
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
