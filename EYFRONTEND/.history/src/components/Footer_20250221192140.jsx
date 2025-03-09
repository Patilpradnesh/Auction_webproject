import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container text-center">
        {/* Brand Name & Description */}
        <h5 className="fw-bold">AuctionPro</h5>
        <p className="small">The best place to bid and win!</p>

        {/* Navigation Links */}
        <ul className="list-inline">
          <li className="list-inline-item"><a href="/about" className="text-white text-decoration-none">About</a></li>
          <li className="list-inline-item mx-3"><a href="/contact" className="text-white text-decoration-none">Contact</a></li>
          <li className="list-inline-item"><a href="/privacy" className="text-white text-decoration-none">Privacy Policy</a></li>
        </ul>

        {/* Copyright */}
        <p className="small mt-3">&copy; {new Date().getFullYear()} AuctionPro. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
