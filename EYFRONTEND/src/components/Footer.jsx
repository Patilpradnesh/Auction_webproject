import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-4 py-4">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 text-center text-md-start mb-3 mb-md-0">
            <h2 className="h4 fw-bold mb-2">AuctionPro</h2>
            <p className="mb-0 text-light">The best place to bid and win!</p>
          </div>

          <div className="col-12 col-md-6">
            <div className="d-flex flex-column flex-sm-row justify-content-md-end align-items-center gap-3">
              <Link
                to="/about"
                className="text-light text-decoration-none hover-underline"
              >
                About
              </Link>
              <Link
                to="/Contact"
                className="text-light text-decoration-none hover-underline"
              >
                Contact
              </Link>
              <Link
                to="/privacy"
                className="text-light text-decoration-none hover-underline"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        <hr className="my-3 border-secondary" />

        <div className="row">
          <div className="col-12 text-center">
            <p className="mb-0 small text-muted">
              &copy; {new Date().getFullYear()} AuctionPro. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>

      <style>{`.hover-underline:hover {
                text-decoration: underline !important;
                }
            
                @media (max-width: 576px) {
                    .container {
                        padding-left: 15px;
                        padding-right: 15px;
                    }
            }`}</style>
    </footer>
  );
};

export default Footer;
