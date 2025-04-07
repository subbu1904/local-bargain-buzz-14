
import { Tv, Sofa, Car, Shirt, Home, Gamepad, Smartphone, Baby, Bike } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: LucideIcon;
  color: string;
  subcategories: Subcategory[];
}

export const categories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    slug: "electronics",
    icon: Tv,
    color: "bg-blue-100 text-blue-600",
    subcategories: [
      { id: "electronics-computers", name: "Computers & Laptops", slug: "computers-laptops" },
      { id: "electronics-phones", name: "Phones & Tablets", slug: "phones-tablets" },
      { id: "electronics-audio", name: "Audio & Headphones", slug: "audio-headphones" },
      { id: "electronics-cameras", name: "Cameras", slug: "cameras" },
      { id: "electronics-tvs", name: "TVs & Monitors", slug: "tvs-monitors" },
    ]
  },
  {
    id: "furniture",
    name: "Furniture",
    slug: "furniture",
    icon: Sofa,
    color: "bg-amber-100 text-amber-600",
    subcategories: [
      { id: "furniture-living", name: "Living Room", slug: "living-room" },
      { id: "furniture-dining", name: "Dining Room", slug: "dining-room" },
      { id: "furniture-bedroom", name: "Bedroom", slug: "bedroom" },
      { id: "furniture-office", name: "Office", slug: "office" },
      { id: "furniture-outdoor", name: "Outdoor", slug: "outdoor" },
    ]
  },
  {
    id: "vehicles",
    name: "Vehicles",
    slug: "vehicles",
    icon: Car,
    color: "bg-red-100 text-red-600",
    subcategories: [
      { id: "vehicles-cars", name: "Cars", slug: "cars" },
      { id: "vehicles-motorcycles", name: "Motorcycles", slug: "motorcycles" },
      { id: "vehicles-trucks", name: "Trucks & Vans", slug: "trucks-vans" },
      { id: "vehicles-parts", name: "Parts & Accessories", slug: "parts-accessories" },
      { id: "vehicles-other", name: "Other Vehicles", slug: "other-vehicles" },
    ]
  },
  {
    id: "clothing",
    name: "Clothing",
    slug: "clothing",
    icon: Shirt,
    color: "bg-purple-100 text-purple-600",
    subcategories: [
      { id: "clothing-mens", name: "Men's Clothing", slug: "mens-clothing" },
      { id: "clothing-womens", name: "Women's Clothing", slug: "womens-clothing" },
      { id: "clothing-kids", name: "Kids' Clothing", slug: "kids-clothing" },
      { id: "clothing-shoes", name: "Shoes & Footwear", slug: "shoes-footwear" },
      { id: "clothing-accessories", name: "Accessories", slug: "accessories" },
    ]
  },
  {
    id: "real-estate",
    name: "Real Estate",
    slug: "real-estate",
    icon: Home,
    color: "bg-green-100 text-green-600",
    subcategories: [
      { id: "realestate-houses", name: "Houses", slug: "houses" },
      { id: "realestate-apartments", name: "Apartments", slug: "apartments" },
      { id: "realestate-land", name: "Land", slug: "land" },
      { id: "realestate-commercial", name: "Commercial", slug: "commercial" },
      { id: "realestate-rental", name: "Rental Properties", slug: "rental" },
    ]
  },
  {
    id: "gaming",
    name: "Gaming",
    slug: "gaming",
    icon: Gamepad,
    color: "bg-indigo-100 text-indigo-600",
    subcategories: [
      { id: "gaming-consoles", name: "Consoles", slug: "consoles" },
      { id: "gaming-games", name: "Video Games", slug: "video-games" },
      { id: "gaming-accessories", name: "Gaming Accessories", slug: "accessories" },
      { id: "gaming-pc", name: "PC Gaming", slug: "pc-gaming" },
      { id: "gaming-vr", name: "Virtual Reality", slug: "virtual-reality" },
    ]
  },
  {
    id: "phones",
    name: "Phones",
    slug: "phones",
    icon: Smartphone,
    color: "bg-sky-100 text-sky-600",
    subcategories: [
      { id: "phones-iphone", name: "iPhone", slug: "iphone" },
      { id: "phones-android", name: "Android", slug: "android" },
      { id: "phones-accessories", name: "Phone Accessories", slug: "accessories" },
      { id: "phones-wearables", name: "Wearables", slug: "wearables" },
      { id: "phones-tablets", name: "Tablets", slug: "tablets" },
    ]
  },
  {
    id: "baby-kids",
    name: "Baby & Kids",
    slug: "baby-kids",
    icon: Baby,
    color: "bg-pink-100 text-pink-600",
    subcategories: [
      { id: "baby-toys", name: "Toys", slug: "toys" },
      { id: "baby-clothing", name: "Baby Clothing", slug: "clothing" },
      { id: "baby-furniture", name: "Baby Furniture", slug: "furniture" },
      { id: "baby-gear", name: "Baby Gear", slug: "gear" },
      { id: "baby-health", name: "Baby Health", slug: "health" },
    ]
  },
  {
    id: "sports",
    name: "Sports",
    slug: "sports",
    icon: Bike,
    color: "bg-orange-100 text-orange-600",
    subcategories: [
      { id: "sports-fitness", name: "Fitness Equipment", slug: "fitness" },
      { id: "sports-outdoor", name: "Outdoor Activities", slug: "outdoor" },
      { id: "sports-bicycles", name: "Bicycles", slug: "bicycles" },
      { id: "sports-team", name: "Team Sports", slug: "team-sports" },
      { id: "sports-water", name: "Water Sports", slug: "water-sports" },
    ]
  },
];
