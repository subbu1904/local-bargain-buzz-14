
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import FeaturedListings from "@/components/FeaturedListings";
import PromoSection from "@/components/PromoSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SubscriptionPackages from "@/components/SubscriptionPackages";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <div className="container mx-auto py-8 px-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/dashboard">
              <Button className="w-full sm:w-auto bg-flipssi-green text-white hover:bg-green-500">
                User Dashboard
              </Button>
            </Link>
            <Link to="/admin">
              <Button className="w-full sm:w-auto bg-flipssi-purple text-white hover:bg-purple-700">
                Admin Dashboard
              </Button>
            </Link>
            <Link to="/create-listing" className="relative">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-flipssi-purple to-purple-500 text-white hover:from-purple-600 hover:to-purple-700 font-bold shadow-lg transform transition-transform hover:scale-105">
                Post For Free
              </Button>
              <span className="absolute -top-2 -right-2 bg-flipssi-green text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                FREE
              </span>
            </Link>
          </div>
        </div>
        <CategorySection />
        <FeaturedListings title="Featured Listings" />
        <PromoSection />
        <SubscriptionPackages />
        <FeaturedListings title="Recently Added" />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
