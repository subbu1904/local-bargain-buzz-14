
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, Menu, MessageCircle, Plus, User } from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-flipssi-purple to-purple-500 bg-clip-text text-transparent">
              flipssi.com
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link to="/" className="transition-colors hover:text-gray-900">Home</Link>
            <Link to="/browse" className="transition-colors hover:text-gray-900">Browse</Link>
            <Link to="/categories" className="transition-colors hover:text-gray-900">Categories</Link>
            <Link to="/about" className="transition-colors hover:text-gray-900">About</Link>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <MessageCircle className="h-5 w-5" />
              <span className="sr-only">Messages</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
          </div>
          
          <Button className="bg-flipssi-green text-white hover:bg-green-500">
            <Plus className="mr-2 h-4 w-4" />
            Sell
          </Button>
          
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
