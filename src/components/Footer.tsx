
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">flipssi.com</h3>
            <p className="text-sm text-gray-600 mb-4">
              Buy and sell locally with ease. Find amazing deals near you!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-flipssi-purple">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-flipssi-purple">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-flipssi-purple">
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/category/electronics" className="text-gray-600 hover:text-flipssi-purple">Electronics</Link></li>
              <li><Link to="/category/furniture" className="text-gray-600 hover:text-flipssi-purple">Furniture</Link></li>
              <li><Link to="/category/vehicles" className="text-gray-600 hover:text-flipssi-purple">Vehicles</Link></li>
              <li><Link to="/category/clothing" className="text-gray-600 hover:text-flipssi-purple">Clothing</Link></li>
              <li><Link to="/categories" className="text-gray-600 hover:text-flipssi-purple">All Categories</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Help & Info</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-600 hover:text-flipssi-purple">About Us</Link></li>
              <li><Link to="/how-it-works" className="text-gray-600 hover:text-flipssi-purple">How It Works</Link></li>
              <li><Link to="/safety" className="text-gray-600 hover:text-flipssi-purple">Safety Tips</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-flipssi-purple">FAQ</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-flipssi-purple">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/terms" className="text-gray-600 hover:text-flipssi-purple">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-flipssi-purple">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="text-gray-600 hover:text-flipssi-purple">Cookie Policy</Link></li>
              <li><Link to="/copyright" className="text-gray-600 hover:text-flipssi-purple">Copyright</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} flipssi.com. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-sm text-gray-500 hover:text-flipssi-purple">Terms</Link>
            <Link to="/privacy" className="text-sm text-gray-500 hover:text-flipssi-purple">Privacy</Link>
            <Link to="/cookies" className="text-sm text-gray-500 hover:text-flipssi-purple">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
