import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Card, CardContent } from "@/components/ui/card";
import { 
  FilterIcon, 
  GridIcon,
  ListIcon,
  ChevronDownIcon, 
  SlidersHorizontalIcon, 
  XIcon 
} from "lucide-react";
import ListingCard from "@/components/ListingCard";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

const mockListings = Array(16).fill(null).map((_, i) => ({
  id: `cat-${i + 1}`,
  title: `Item ${i + 1} in this Category`,
  price: Math.floor(Math.random() * 1000) + 50,
  image: `https://source.unsplash.com/random/600x600?sig=${i}`,
  location: "New York, NY",
  distance: `${(Math.random() * 10).toFixed(1)} mi`,
  isNew: i % 5 === 0,
  category: "Electronics",
  rating: i % 2 === 0 ? Number((Math.random() * 2 + 3).toFixed(1)) : undefined
}));

const CategoryDetail = () => {
  const { categorySlug, subcategorySlug } = useParams<{ categorySlug?: string, subcategorySlug?: string }>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  
  const categoryName = categorySlug ? categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1).replace(/-/g, ' ') : "Category";
  const subcategoryName = subcategorySlug ? subcategorySlug.charAt(0).toUpperCase() + subcategorySlug.slice(1).replace(/-/g, ' ') : undefined;
  
  const pageTitle = subcategoryName ? `${subcategoryName} - ${categoryName}` : categoryName;
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <div className="container-full py-4 px-4 md:px-6 lg:px-8">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/categories">Categories</BreadcrumbLink>
            </BreadcrumbItem>
            {categorySlug && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {!subcategorySlug ? (
                    <BreadcrumbPage>{categoryName}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={`/category/${categorySlug}`}>
                      {categoryName}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </>
            )}
            {subcategorySlug && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{subcategoryName}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold">{pageTitle}</h1>
          <p className="text-muted-foreground mt-2">
            Explore {mockListings.length} listings in {pageTitle}
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:hidden w-full mb-4">
            <Button 
              variant="outline" 
              className="w-full justify-between"
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              <div className="flex items-center">
                <FilterIcon className="h-4 w-4 mr-2" />
                Filters
              </div>
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </div>
          
          <div className={`${filtersOpen ? 'block' : 'hidden'} lg:block w-full lg:w-64 shrink-0`}>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Filters</h3>
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-500">
                    Clear All
                  </Button>
                </div>
                
                <Separator className="mb-4" />
                
                <div className="mb-4">
                  <Collapsible defaultOpen={true}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
                      <h4 className="font-medium">Price Range</h4>
                      <ChevronDownIcon className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div>
                          <Input 
                            placeholder="Min" 
                            value={priceRange.min}
                            onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                          />
                        </div>
                        <div>
                          <Input 
                            placeholder="Max" 
                            value={priceRange.max}
                            onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                          />
                        </div>
                      </div>
                      <Button className="w-full mt-2 bg-flipssi-purple">Apply</Button>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
                
                <Separator className="mb-4" />
                
                <div className="mb-4">
                  <Collapsible defaultOpen={true}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
                      <h4 className="font-medium">Condition</h4>
                      <ChevronDownIcon className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="new" />
                          <label htmlFor="new" className="text-sm">New</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="like-new" />
                          <label htmlFor="like-new" className="text-sm">Like New</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="good" />
                          <label htmlFor="good" className="text-sm">Good</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="fair" />
                          <label htmlFor="fair" className="text-sm">Fair</label>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
                
                <Separator className="mb-4" />
                
                <div className="mb-4">
                  <Collapsible defaultOpen={true}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
                      <h4 className="font-medium">Distance</h4>
                      <ChevronDownIcon className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <Select defaultValue="5">
                        <SelectTrigger>
                          <SelectValue placeholder="Select distance" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Within 1 mile</SelectItem>
                          <SelectItem value="5">Within 5 miles</SelectItem>
                          <SelectItem value="10">Within 10 miles</SelectItem>
                          <SelectItem value="25">Within 25 miles</SelectItem>
                          <SelectItem value="50">Within 50 miles</SelectItem>
                        </SelectContent>
                      </Select>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
                
                <Separator className="mb-4" />
                
                <Button className="w-full bg-flipssi-purple">Apply Filters</Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
              <div className="w-full sm:w-auto">
                <Select defaultValue="newest">
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="distance">Distance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">View:</span>
                <Button 
                  variant={viewMode === 'grid' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setViewMode('grid')}
                  className="h-8 w-8 p-0"
                >
                  <GridIcon className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === 'list' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setViewMode('list')}
                  className="h-8 w-8 p-0"
                >
                  <ListIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {priceRange.min && priceRange.max && (
                <div className="bg-muted rounded-full text-sm px-3 py-1 flex items-center">
                  <span>Price: ${priceRange.min} - ${priceRange.max}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-5 w-5 p-0 ml-1"
                    onClick={() => setPriceRange({ min: "", max: "" })}
                  >
                    <XIcon className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
            
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" 
                : "space-y-4"
            }>
              {mockListings.map((listing) => (
                <ListingCard key={listing.id} {...listing} />
              ))}
            </div>
            
            <div className="mt-8 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">4</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CategoryDetail;
