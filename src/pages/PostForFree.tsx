
import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckIcon, ChevronRightIcon, InfoIcon } from "lucide-react";

const PostForFree = () => {
  const [selectedTab, setSelectedTab] = useState("details");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container-full py-4 px-4 md:px-6 lg:px-8">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Post Your Listing</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Post Your Listing For Free</h1>
          
          <div className="bg-gradient-to-r from-flipssi-purple/10 to-flipssi-green/10 p-4 rounded-lg mb-8">
            <div className="flex items-center">
              <InfoIcon className="text-flipssi-purple h-5 w-5 mr-2" />
              <p className="text-sm">Your listing will be live for 30 days. No payment required!</p>
            </div>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-flipssi-purple text-white flex items-center justify-center font-bold">
                  1
                </div>
                <span className="ml-2 font-medium">Choose Category</span>
              </div>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold">
                  2
                </div>
                <span className="ml-2 text-gray-600">Item Details</span>
              </div>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold">
                  3
                </div>
                <span className="ml-2 text-gray-600">Review & Post</span>
              </div>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Select a Category</CardTitle>
              <CardDescription>Choose the category that best describes your item</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-4 hover:border-flipssi-purple cursor-pointer transition-colors">
                  <div className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-flipssi-purple mr-2" />
                    <h3 className="font-medium">Electronics</h3>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    Phones, Computers, TVs, Gaming
                  </div>
                  <Button variant="ghost" size="sm" className="mt-2">
                    Select
                    <ChevronRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                
                <div className="border rounded-md p-4 hover:border-flipssi-purple cursor-pointer transition-colors">
                  <div className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-flipssi-purple mr-2" />
                    <h3 className="font-medium">Vehicles</h3>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    Cars, Motorcycles, Boats, Parts
                  </div>
                  <Button variant="ghost" size="sm" className="mt-2">
                    Select
                    <ChevronRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                
                <div className="border rounded-md p-4 hover:border-flipssi-purple cursor-pointer transition-colors">
                  <div className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-flipssi-purple mr-2" />
                    <h3 className="font-medium">Home & Garden</h3>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    Furniture, Appliances, Decor
                  </div>
                  <Button variant="ghost" size="sm" className="mt-2">
                    Select
                    <ChevronRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                
                <div className="border rounded-md p-4 hover:border-flipssi-purple cursor-pointer transition-colors">
                  <div className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-flipssi-purple mr-2" />
                    <h3 className="font-medium">Fashion</h3>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    Clothing, Shoes, Accessories, Jewelry
                  </div>
                  <Button variant="ghost" size="sm" className="mt-2">
                    Select
                    <ChevronRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                
                <div className="border rounded-md p-4 hover:border-flipssi-purple cursor-pointer transition-colors">
                  <div className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-flipssi-purple mr-2" />
                    <h3 className="font-medium">Services</h3>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    Professional, Personal, Home Services
                  </div>
                  <Button variant="ghost" size="sm" className="mt-2">
                    Select
                    <ChevronRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                
                <div className="border rounded-md p-4 hover:border-flipssi-purple cursor-pointer transition-colors">
                  <div className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-flipssi-purple mr-2" />
                    <h3 className="font-medium">Real Estate</h3>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    Houses, Apartments, Land, Commercial
                  </div>
                  <Button variant="ghost" size="sm" className="mt-2">
                    Select
                    <ChevronRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="mt-6">
                <Label>Or search for a category:</Label>
                <div className="flex mt-2">
                  <Input placeholder="Search categories..." className="mr-2" />
                  <Button>Search</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" disabled>Previous</Button>
              <Button className="bg-flipssi-purple">Next: Add Details</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PostForFree;
