
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Share2, 
  MessageCircle, 
  ChevronRight, 
  MapPin,
  Clock,
  Calendar,
  Tag,
  User,
  Phone
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

// Mock data for demonstration
const item = {
  id: "1",
  title: "Beautiful Modern Apartment in City Center",
  description: "This stunning modern apartment features 2 bedrooms, a spacious living area, and a fully equipped kitchen. Located in the heart of the city with easy access to public transportation, restaurants, and shopping.",
  price: 1250,
  priceUnit: "month",
  location: "Downtown, New York",
  category: "Real Estate",
  subcategory: "Apartments",
  images: [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg"
  ],
  features: [
    "2 Bedrooms",
    "1 Bathroom",
    "Fully furnished",
    "Air conditioning",
    "Heating",
    "Wi-Fi",
    "Cable TV",
    "Washing machine",
    "Dishwasher"
  ],
  sellerName: "John Doe",
  sellerRating: 4.7,
  sellerReviews: 24,
  contactPhone: "+1 (555) 123-4567",
  contactEmail: "john.doe@example.com",
  postedDate: "2023-04-01",
  expiryDate: "2023-06-01",
  views: 256,
  favorites: 42,
  latitude: 40.7128,
  longitude: -74.0060
};

const ItemDetail = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // In a real app, you'd fetch the item data based on the itemId
  console.log(`Displaying item with ID: ${itemId}`);
  
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
              <BreadcrumbLink href={`/category/${item.category.toLowerCase()}`}>
                {item.category}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/category/${item.category.toLowerCase()}/${item.subcategory.toLowerCase()}`}>
                {item.subcategory}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{item.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="item-detail-container">
          <div className="item-gallery">
            <div className="mb-4">
              <AspectRatio ratio={16/9}>
                <img 
                  src={item.images[activeImageIndex]} 
                  alt={item.title} 
                  className="h-full w-full object-cover rounded-lg"
                />
              </AspectRatio>
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {item.images.map((img, index) => (
                <div 
                  key={index}
                  className={`cursor-pointer rounded-md overflow-hidden border-2 ${
                    activeImageIndex === index ? 'border-primary' : 'border-transparent'
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <AspectRatio ratio={1/1}>
                    <img src={img} alt={`${item.title} - image ${index + 1}`} className="h-full w-full object-cover" />
                  </AspectRatio>
                </div>
              ))}
            </div>
          </div>
          
          <div className="item-info space-y-6">
            <div className="flex flex-col">
              <div className="flex justify-between items-start">
                <h1 className="text-2xl font-bold md:text-3xl">{item.title}</h1>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center text-muted-foreground mt-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{item.location}</span>
              </div>
              
              <div className="flex items-center mt-4">
                <span className="text-3xl font-bold text-primary">${item.price}</span>
                <span className="text-muted-foreground ml-1">/{item.priceUnit}</span>
              </div>
              
              <div className="flex items-center space-x-2 mt-4">
                <Badge>{item.category}</Badge>
                <Badge variant="outline">{item.subcategory}</Badge>
              </div>
            </div>
            
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                <TabsTrigger value="features" className="flex-1">Features</TabsTrigger>
                <TabsTrigger value="contact" className="flex-1">Contact</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4 pt-4">
                <div>
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
                
                <div className="flex flex-col space-y-2 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-muted-foreground">Posted on: </span>
                    <span className="ml-1">{new Date(item.postedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-muted-foreground">Available until: </span>
                    <span className="ml-1">{new Date(item.expiryDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-muted-foreground">Item ID: </span>
                    <span className="ml-1">{item.id}</span>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="features" className="pt-4">
                <h3 className="font-medium mb-2">Features</h3>
                <ul className="grid grid-cols-2 gap-y-2 text-sm">
                  {item.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <ChevronRight className="h-4 w-4 mr-1 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </TabsContent>
              
              <TabsContent value="contact" className="pt-4">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="mr-3">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">{item.sellerName}</p>
                      <div className="flex items-center text-sm">
                        <div className="text-yellow-500">★★★★★</div>
                        <span className="ml-1 text-muted-foreground">
                          {item.sellerRating} ({item.sellerReviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button className="w-full">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Message Seller
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Phone className="mr-2 h-4 w-4" />
                      {item.contactPhone}
                    </Button>
                  </div>
                  
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm text-center text-muted-foreground">
                        When contacting the seller, please mention that you found this listing on Flipssi.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Similar Listings Section */}
        <div className="mt-12 mb-8">
          <h2 className="text-2xl font-bold mb-6">Similar Listings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Placeholder cards for similar listings */}
            {[1, 2, 3, 4].map(i => (
              <Card key={i} className="listing-hover">
                <AspectRatio ratio={4/3}>
                  <img src="/placeholder.svg" alt="Similar listing" className="h-full w-full object-cover" />
                </AspectRatio>
                <CardContent className="p-4">
                  <h3 className="font-medium truncate">Similar Listing Title</h3>
                  <p className="text-primary font-bold mt-1">$1,200/month</p>
                  <div className="flex items-center text-sm text-muted-foreground mt-2">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span className="truncate">New York City</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ItemDetail;
