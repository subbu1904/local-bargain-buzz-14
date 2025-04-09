
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import VoiceSearch from "./VoiceSearch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, Category, Subcategory } from "@/data/categoryData";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const { t } = useLanguage();

  // Update subcategories when category changes
  useEffect(() => {
    if (selectedCategory) {
      const category = categories.find(cat => cat.id === selectedCategory);
      if (category) {
        setSubcategories(category.subcategories);
        setSelectedSubcategory(""); // Reset subcategory when category changes
      }
    } else {
      setSubcategories([]);
      setSelectedSubcategory("");
    }
  }, [selectedCategory]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", {
      query: searchQuery,
      category: selectedCategory,
      subcategory: selectedSubcategory
    });
    // In a real app, this would navigate to search results
  };

  const handleVoiceSearchResult = (text: string) => {
    setSearchQuery(text);
    // Optionally auto-submit the search
    console.log("Voice search for:", text);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleSubcategoryChange = (value: string) => {
    setSelectedSubcategory(value);
  };

  return (
    <div className="bg-[#006a5a] text-white py-20 md:py-28">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#bffff5]">
              KapdaKaregar
            </span>
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            {t('search_placeholder')}
          </p>
          
          <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex">
                <div className="flex-grow flex flex-wrap md:flex-nowrap">
                  <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                    <SelectTrigger className="w-full md:w-[120px] rounded-t-lg md:rounded-t-none md:rounded-l-lg bg-white border-none text-black">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="all_categories">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select 
                    value={selectedSubcategory} 
                    onValueChange={handleSubcategoryChange}
                    disabled={!selectedCategory || subcategories.length === 0}
                  >
                    <SelectTrigger className="w-full md:w-[120px] border-t-0 md:border-t md:border-l-0 md:border-r-0 border-gray-200 bg-white text-black">
                      <SelectValue placeholder="Subcategory" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="all_subcategories">All Subcategories</SelectItem>
                      {subcategories.map((subcategory) => (
                        <SelectItem key={subcategory.id} value={subcategory.id}>
                          {subcategory.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="relative flex-grow w-full">
                    <Input
                      type="text"
                      placeholder={t('search_placeholder')}
                      className="pl-10 h-12 text-black rounded-b-lg md:rounded-b-none md:rounded-r-lg border-t-0 md:border-t md:border-l-0 shadow-lg"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <VoiceSearch onResult={handleVoiceSearchResult} />
                    </div>
                  </div>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="h-12 rounded-full bg-[#006a5a] hover:bg-[#80ffeb] hover:text-[#006a5a]"
              >
                {t('search')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Button variant="secondary" className="bg-[#bffff5] hover:bg-[#80ffeb] text-[#006a5a] border-none">
              {t('tailor')}
            </Button>
            <Button variant="secondary" className="bg-[#bffff5] hover:bg-[#80ffeb] text-[#006a5a] border-none">
              {t('unit-owner')}
            </Button>
            <Button variant="secondary" className="bg-[#bffff5] hover:bg-[#80ffeb] text-[#006a5a] border-none">
              {t('master')}
            </Button>
            <Button variant="secondary" className="bg-[#bffff5] hover:bg-[#80ffeb] text-[#006a5a] border-none">
              {t('boutique')}
            </Button>
            <Button variant="secondary" className="bg-[#bffff5] hover:bg-[#80ffeb] text-[#006a5a] border-none">
              {t('press')}
            </Button>
          </div>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="w-full sm:w-auto bg-[#80ffeb] text-[#006a5a] hover:bg-[#bffff5] shadow-lg" asChild>
              <a href="#browse">
                {t('browse')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button className="w-full sm:w-auto bg-[#bffff5] text-[#006a5a] hover:bg-[#80ffeb] shadow-lg" asChild>
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
