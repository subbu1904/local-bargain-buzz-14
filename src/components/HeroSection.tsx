
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // In a real app, this would navigate to search results
  };

  return (
    <div className="hero-gradient text-white py-20 md:py-28">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Buy & Sell Near You with <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">flipssi.com!</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Find amazing deals on electronics, furniture, cars and more in your local area.
          </p>
          
          <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
            <Input
              type="text"
              placeholder="What are you looking for?"
              className="pl-10 h-12 text-black rounded-full border-none shadow-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Button 
              type="submit" 
              className="absolute right-1 top-1 h-10 rounded-full bg-gradient-to-r from-flipssi-purple to-purple-500 hover:from-purple-600 hover:to-purple-700"
            >
              Search
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none">
              Electronics
            </Button>
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none">
              Furniture
            </Button>
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none">
              Cars
            </Button>
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none">
              Clothing
            </Button>
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none">
              Home
            </Button>
          </div>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="w-full sm:w-auto bg-flipssi-green text-white hover:bg-green-500 shadow-lg" asChild>
              <a href="#browse">
                Browse Listings
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button className="w-full sm:w-auto bg-gradient-to-r from-flipssi-purple to-purple-500 text-white hover:from-purple-600 hover:to-purple-700 shadow-lg" asChild>
              <a href="#subscription">
                See Pricing
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
