
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
      { id: "tailor-kurti", name: "Kurti", slug: "kurti" },
      { id: "tailor-shirt", name: "Shirt", slug: "shirt" },
      { id: "tailor-pant", name: "Pant", slug: "pant" },
      { id: "tailor-ladies", name: "Ladies", slug: "ladies" },
      { id: "tailor-embroid", name: "Embroid", slug: "embroid" },
      { id: "tailor-all", name: "All", slug: "all" },
      { id: "tailor-others", name: "Others", slug: "others" },
    ]
  },
  {
    id: "unit-owner",
    name: "Unit Owner",
    slug: "unit-owner",
    icon: Home,
    color: "bg-[#80ffeb] text-[#006a5a]",
    subcategories: [
      { id: "unit-kurti", name: "Kurti", slug: "kurti" },
      { id: "unit-shirt", name: "Shirt", slug: "shirt" },
      { id: "unit-pant", name: "Pant", slug: "pant" },
      { id: "unit-ladies", name: "Ladies", slug: "ladies" },
      { id: "unit-embroid", name: "Embroid", slug: "embroid" },
      { id: "unit-all", name: "All", slug: "all" },
      { id: "unit-others", name: "Others", slug: "others" },
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
      { id: "master-kurti", name: "Kurti", slug: "kurti" },
      { id: "master-shirt", name: "Shirt", slug: "shirt" },
      { id: "master-pant", name: "Pant", slug: "pant" },
      { id: "master-ladies", name: "Ladies", slug: "ladies" },
      { id: "master-embroid", name: "Embroid", slug: "embroid" },
      { id: "master-all", name: "All", slug: "all" },
      { id: "master-others", name: "Others", slug: "others" },
    ]
  },
  {
    id: "job-work",
    name: "Job Work",
    slug: "job-work",
    icon: Car,
    color: "bg-[#bffff5] text-[#006a5a]",
    subcategories: [
      { id: "job-kurti", name: "Kurti", slug: "kurti" },
      { id: "job-shirt", name: "Shirt", slug: "shirt" },
      { id: "job-pant", name: "Pant", slug: "pant" },
      { id: "job-ladies", name: "Ladies", slug: "ladies" },
      { id: "job-embroid", name: "Embroid", slug: "embroid" },
      { id: "job-all", name: "All", slug: "all" },
      { id: "job-others", name: "Others", slug: "others" },
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
      { id: "press-ladies", name: "Ladies", slug: "ladies" },
      { id: "press-gents", name: "Gents", slug: "gents" },
      { id: "press-all", name: "All", slug: "all" },
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
      { id: "dyeing-fabric", name: "Fabric", slug: "fabric" },
      { id: "dyeing-yarn", name: "Yarn", slug: "yarn" },
      { id: "dyeing-garments", name: "Garments", slug: "garments" },
      { id: "dyeing-all", name: "All", slug: "all" },
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
