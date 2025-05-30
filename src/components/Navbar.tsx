
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
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-[#006a5a] to-[#80ffeb] bg-clip-text text-transparent">
              KapdaKaregar
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link to="/" className="transition-colors hover:text-[#006a5a]">{t('home')}</Link>
            <Link to="/browse" className="transition-colors hover:text-[#006a5a]">{t('browse')}</Link>
            <Link to="/categories" className="transition-colors hover:text-[#006a5a]">{t('categories')}</Link>
            <Link to="/about" className="transition-colors hover:text-[#006a5a]">{t('about')}</Link>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="block">
            <LanguageSelector />
          </div>
          
          {user ? (
            <>
              <div className="hidden md:flex items-center gap-2">
                <Button variant="outline" size="icon" className="rounded-full bg-[#bffff5] text-[#006a5a] border-[#80ffeb] hover:bg-[#80ffeb]" asChild>
                  <Link to="/dashboard/notifications">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">{t('notifications')}</span>
                  </Link>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full bg-[#bffff5] text-[#006a5a] border-[#80ffeb] hover:bg-[#80ffeb]" asChild>
                  <Link to="/dashboard/messages">
                    <MessageCircle className="h-5 w-5" />
                    <span className="sr-only">{t('messages')}</span>
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full bg-[#bffff5] text-[#006a5a] border-[#80ffeb] hover:bg-[#80ffeb]">
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
                      <span>{t('log_out')}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <Button className="bg-[#006a5a] hover:bg-[#80ffeb] hover:text-[#006a5a] text-white font-bold shadow-md" asChild>
                <Link to="/create-listing">
                  <Plus className="mr-2 h-4 w-4" />
                  {t('post_for_free')}
                </Link>
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" className="bg-[#bffff5] text-[#006a5a] border-[#80ffeb] hover:bg-[#80ffeb]" asChild>
                <Link to="/signin">{t('sign_in')}</Link>
              </Button>
              <Button className="bg-[#006a5a] text-white hover:bg-[#80ffeb] hover:text-[#006a5a] font-bold shadow-md relative" asChild>
                <Link to="/create-listing">
                  <Plus className="mr-2 h-4 w-4" />
                  {t('post_for_free')}
                  <span className="absolute -top-2 -right-2 bg-[#80ffeb] text-[#006a5a] text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                    FREE
                  </span>
                </Link>
              </Button>
            </div>
          )}
          
          <Button variant="outline" size="icon" className="md:hidden bg-[#bffff5] text-[#006a5a] border-[#80ffeb] hover:bg-[#80ffeb]">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
