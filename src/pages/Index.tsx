
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import FeaturedListings from "@/components/FeaturedListings";
import PromoSection from "@/components/PromoSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
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
