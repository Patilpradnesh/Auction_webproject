function Home() {
    return (
        <>
        import React from "react";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          {/* Company Info */}
          <div>
            <h2 className="text-xl font-bold">AuctionPro</h2>
            <p className="text-sm mt-2">Your trusted auction marketplace.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li><a href="/about" className="hover:underline">About Us</a></li>
              <li><a href="/contact" className="hover:underline">Contact</a></li>
              <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:underline">Terms of Service</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex justify-center md:justify-start gap-4 mt-2">
              <a href="#" className="hover:text-blue-500"><Facebook /></a>
              <a href="#" className="hover:text-sky-400"><Twitter /></a>
              <a href="#" className="hover:text-pink-500"><Instagram /></a>
              <a href="mailto:support@auctionpro.com" className="hover:text-red-500"><Mail /></a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm">
          &copy; {new Date().getFullYear()} AuctionPro. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

        </>
    );
}
export default Home;
