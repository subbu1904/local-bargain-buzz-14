
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import FeaturedListings from "@/components/FeaturedListings";
import PromoSection from "@/components/PromoSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
          </div>
        </div>
        <CategorySection />
        <FeaturedListings title="Featured Listings" />
        <PromoSection />
        <FeaturedListings title="Recently Added" />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
