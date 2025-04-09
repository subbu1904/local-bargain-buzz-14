
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import VoiceSearch from "./VoiceSearch";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useLanguage();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // In a real app, this would navigate to search results
  };

  const handleVoiceSearchResult = (text: string) => {
    setSearchQuery(text);
    // Optionally auto-submit the search
    console.log("Voice search for:", text);
  };

  return (
    <div className="bg-[#006A4E] text-white py-20 md:py-28">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
              flipssi.com!
            </span>
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            {t('search_placeholder')}
          </p>
          
          <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
            <div className="flex items-center">
              <div className="relative flex-grow">
                <Input
                  type="text"
                  placeholder={t('search_placeholder')}
                  className="pl-10 h-12 text-black rounded-full border-none shadow-lg pr-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <VoiceSearch onResult={handleVoiceSearchResult} />
                </div>
              </div>
              <Button 
                type="submit" 
                className="ml-2 h-12 rounded-full bg-gradient-to-r from-flipssi-purple to-purple-500 hover:from-purple-600 hover:to-purple-700"
              >
                {t('search')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none">
              {t('electronics')}
            </Button>
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none">
              {t('furniture')}
            </Button>
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none">
              {t('vehicles')}
            </Button>
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none">
              {t('clothing')}
            </Button>
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none">
              {t('home')}
            </Button>
          </div>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="w-full sm:w-auto bg-flipssi-green text-white hover:bg-green-500 shadow-lg" asChild>
              <a href="#browse">
                {t('browse')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button className="w-full sm:w-auto bg-gradient-to-r from-flipssi-purple to-purple-500 text-white hover:from-purple-600 hover:to-purple-700 shadow-lg" asChild>
              <a href="#subscription">
                {t('post_for_free')}
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
