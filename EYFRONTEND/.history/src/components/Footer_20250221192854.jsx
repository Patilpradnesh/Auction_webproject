import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer .bg-dark>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-lg font-semibold">AuctionPro</h2>
        <p className="text-sm mt-2">The best place to bid and win!</p>

        <div className="mt-4 flex justify-center space-x-6 text-sm">
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
          <Link to="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
        </div>

        <div className="border-t border-gray-700 mt-4 pt-3 text-sm">
          &copy; {new Date().getFullYear()} AuctionPro. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
