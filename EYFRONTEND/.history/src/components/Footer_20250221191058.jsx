
import 
function Footer() {
    return (
        <>
            <footer className="bg-gray-900 text-white py-6 mt-10">
                <div className="container mx-auto text-center">
                    <h2 className="text-lg font-semibold">AuctionPro</h2>
                    <p className="text-sm mt-2">The best place to bid and win!</p>

                    <div className="mt-4 flex justify-center space-x-6">
                        <Link to="/about" className="hover:text-gray-400">
                            About
                        </Link>
                        <Link to="/contact" className="hover:text-gray-400">
                            Contact
                        </Link>
                        <Link to="/privacy" className="hover:text-gray-400">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="hover:text-gray-400">
                            Terms of Service
                        </Link>
                    </div>

                    <div className="border-t border-gray-700 mt-4 pt-3 text-sm">
                        &copy; {new Date().getFullYear()} AuctionPro. All Rights Reserved.
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;