function Footer() {
    return (
        <></>
        <footer className="bg-gray-900 text-white py-6 mt-10">
        <div className="container mx-auto text-center">
          <h2 className="text-lg font-semibold">AuctionPro</h2>
          <p className="text-sm mt-2">The best place to bid and win!</p>

          <div className="mt-4 flex justify-center space-x-6">
            <a href="/about" className="hover:text-gray-400">
              About
            </a>
            <a href="/contact" className="hover:text-gray-400">
              Contact
            </a>
            <a href="/privacy" className="hover:text-gray-400">
              Privacy Policy
            </a>
          </div>

          <div className="border-t border-gray-700 mt-4 pt-3 text-sm">
            &copy; {new Date().getFullYear()} AuctionPro. All Rights Reserved.
          </div>
        </div>
      </footer>
    );
}

export default Footer;
