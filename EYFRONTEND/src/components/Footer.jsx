import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
return (
    <footer className="bg-dark text-white mt-4 ">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-lg font-semibold">AuctionPro</h2>
            <p className="text-sm mt-2">The best place to bid and win!</p>

            <div className="mt-2 flex justify-center space-x-6 text-sm">
                <Link to="/about" className="hover:underline mx-2">
                    About
                </Link>
                <Link to="/contact" className="hover:underline mx-2">
                    Contact
                </Link>
                <Link to="/privacy" className="hover:underline mx-2">
                    Privacy Policy
                </Link>
            </div>

            <div className="border-t mt-2 pt-2 text-sm">
                &copy; {new Date().getFullYear()} AuctionPro. All Rights Reserved.
            </div>
        </div>
    </footer>
);
};

export default Footer;
