
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, Menu, MessageCircle, Plus, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
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
          {user ? (
            <>
              <div className="hidden md:flex items-center gap-2">
                <Button variant="outline" size="icon" className="rounded-full" asChild>
                  <Link to="/dashboard/notifications">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notifications</span>
                  </Link>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full" asChild>
                  <Link to="/dashboard/messages">
                    <MessageCircle className="h-5 w-5" />
                    <span className="sr-only">Messages</span>
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <User className="h-5 w-5" />
                      <span className="sr-only">Profile</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard/listings">My Listings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard/favorites">Favorites</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <Button className="bg-gradient-to-r from-flipssi-green to-green-500 text-white hover:from-green-500 hover:to-green-600 font-bold shadow-md" asChild>
                <Link to="/create-listing">
                  <Plus className="mr-2 h-4 w-4" />
                  Post For Free
                </Link>
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button className="bg-flipssi-purple text-white hover:bg-purple-700" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
              <Button className="bg-gradient-to-r from-flipssi-green to-green-500 text-white hover:from-green-500 hover:to-green-600 font-bold shadow-md relative" asChild>
                <Link to="/create-listing">
                  <Plus className="mr-2 h-4 w-4" />
                  Post For Free
                  <span className="absolute -top-2 -right-2 bg-flipssi-purple text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                    FREE
                  </span>
                </Link>
              </Button>
            </div>
          )}
          
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
