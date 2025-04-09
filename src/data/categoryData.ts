
import { Tv, Sofa, Car, Shirt, Home, Gamepad, Smartphone, Baby, Bike, Book } from "lucide-react";
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
    id: "tailor",
    name: "Tailor",
    slug: "tailor",
    icon: Shirt,
    color: "bg-[#bffff5] text-[#006a5a]",
    subcategories: [
      { id: "tailor-mens", name: "Men's Clothing", slug: "mens-clothing" },
      { id: "tailor-womens", name: "Women's Clothing", slug: "womens-clothing" },
      { id: "tailor-kids", name: "Kids' Clothing", slug: "kids-clothing" },
      { id: "tailor-uniform", name: "Uniforms", slug: "uniforms" },
      { id: "tailor-custom", name: "Custom Orders", slug: "custom-orders" },
    ]
  },
  {
    id: "unit-owner",
    name: "Unit Owner",
    slug: "unit-owner",
    icon: Home,
    color: "bg-[#80ffeb] text-[#006a5a]",
    subcategories: [
      { id: "unit-production", name: "Production Units", slug: "production-units" },
      { id: "unit-factory", name: "Factory Units", slug: "factory-units" },
      { id: "unit-workshop", name: "Workshops", slug: "workshops" },
      { id: "unit-rental", name: "Rental Units", slug: "rental-units" },
      { id: "unit-commercial", name: "Commercial Units", slug: "commercial-units" },
    ]
  },
  {
    id: "boutique",
    name: "Boutique",
    slug: "boutique",
    icon: Smartphone,
    color: "bg-[#bffff5] text-[#006a5a]",
    subcategories: [
      { id: "boutique-designer", name: "Designer Clothing", slug: "designer-clothing" },
      { id: "boutique-accessories", name: "Accessories", slug: "accessories" },
      { id: "boutique-bridal", name: "Bridal Wear", slug: "bridal-wear" },
      { id: "boutique-ethnic", name: "Ethnic Wear", slug: "ethnic-wear" },
      { id: "boutique-custom", name: "Custom Design", slug: "custom-design" },
    ]
  },
  {
    id: "master",
    name: "Master",
    slug: "master",
    icon: Tv,
    color: "bg-[#80ffeb] text-[#006a5a]",
    subcategories: [
      { id: "master-cutting", name: "Cutting", slug: "cutting" },
      { id: "master-pattern", name: "Pattern Making", slug: "pattern-making" },
      { id: "master-design", name: "Design", slug: "design" },
      { id: "master-stitching", name: "Stitching", slug: "stitching" },
      { id: "master-embroidery", name: "Embroidery", slug: "embroidery" },
    ]
  },
  {
    id: "job-work",
    name: "Job Work",
    slug: "job-work",
    icon: Car,
    color: "bg-[#bffff5] text-[#006a5a]",
    subcategories: [
      { id: "job-stitching", name: "Stitching", slug: "stitching" },
      { id: "job-embroidery", name: "Embroidery", slug: "embroidery" },
      { id: "job-printing", name: "Printing", slug: "printing" },
      { id: "job-finishing", name: "Finishing", slug: "finishing" },
      { id: "job-packaging", name: "Packaging", slug: "packaging" },
    ]
  },
  {
    id: "service-repair",
    name: "Service & Repair",
    slug: "service-repair",
    icon: Gamepad,
    color: "bg-[#80ffeb] text-[#006a5a]",
    subcategories: [
      { id: "service-machines", name: "Machine Repair", slug: "machine-repair" },
      { id: "service-alterations", name: "Alterations", slug: "alterations" },
      { id: "service-restoration", name: "Garment Restoration", slug: "garment-restoration" },
      { id: "service-equipment", name: "Equipment Maintenance", slug: "equipment-maintenance" },
      { id: "service-consulting", name: "Technical Consulting", slug: "technical-consulting" },
    ]
  },
  {
    id: "press",
    name: "Press",
    slug: "press",
    icon: Sofa,
    color: "bg-[#bffff5] text-[#006a5a]",
    subcategories: [
      { id: "press-ironing", name: "Ironing Services", slug: "ironing-services" },
      { id: "press-steaming", name: "Steaming", slug: "steaming" },
      { id: "press-finishing", name: "Finishing", slug: "finishing" },
      { id: "press-commercial", name: "Commercial Pressing", slug: "commercial-pressing" },
      { id: "press-dry-cleaning", name: "Dry Cleaning", slug: "dry-cleaning" },
    ]
  },
  {
    id: "button-work",
    name: "Button Work",
    slug: "button-work",
    icon: Baby,
    color: "bg-[#80ffeb] text-[#006a5a]",
    subcategories: [
      { id: "button-sewing", name: "Button Sewing", slug: "button-sewing" },
      { id: "button-manufacturing", name: "Button Manufacturing", slug: "button-manufacturing" },
      { id: "button-custom", name: "Custom Buttons", slug: "custom-buttons" },
      { id: "button-fasteners", name: "Fasteners & Hooks", slug: "fasteners-hooks" },
      { id: "button-accessories", name: "Button Accessories", slug: "button-accessories" },
    ]
  },
  {
    id: "dyeing",
    name: "Dyeing",
    slug: "dyeing",
    icon: Bike,
    color: "bg-[#bffff5] text-[#006a5a]",
    subcategories: [
      { id: "dyeing-fabric", name: "Fabric Dyeing", slug: "fabric-dyeing" },
      { id: "dyeing-garment", name: "Garment Dyeing", slug: "garment-dyeing" },
      { id: "dyeing-natural", name: "Natural Dyes", slug: "natural-dyes" },
      { id: "dyeing-chemical", name: "Chemical Dyes", slug: "chemical-dyes" },
      { id: "dyeing-printing", name: "Print Dyeing", slug: "print-dyeing" },
    ]
  },
  {
    id: "others",
    name: "Others",
    slug: "others",
    icon: Book,
    color: "bg-[#80ffeb] text-[#006a5a]",
    subcategories: [
      { id: "others-accessories", name: "Accessories", slug: "accessories" },
      { id: "others-supplies", name: "Supplies & Materials", slug: "supplies-materials" },
      { id: "others-education", name: "Training & Education", slug: "training-education" },
      { id: "others-equipment", name: "Equipment", slug: "equipment" },
      { id: "others-misc", name: "Miscellaneous", slug: "miscellaneous" },
    ]
  },
];
