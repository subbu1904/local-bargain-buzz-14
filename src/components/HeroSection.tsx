
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // In a real app, this would navigate to search results
  };

  return (
    <div className="hero-gradient text-white py-16 md:py-24">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Buy & Sell Near You with flipssi.com!
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
              className="absolute right-1 top-1 h-10 rounded-full bg-flipssi-purple hover:bg-flipssi-dark-purple"
            >
              Search
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
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
