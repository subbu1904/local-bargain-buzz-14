
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Plus, 
  X, 
  Save,
  Tv, 
  Sofa, 
  Car, 
  Shirt, 
  Home, 
  Gamepad, 
  Smartphone, 
  Baby, 
  Bike, 
  Book,
  Music,
  Utensils,
  Briefcase,
  Palette 
} from "lucide-react";
import { categories, Category } from "@/data/categoryData";
import { toast } from "sonner";
import { LucideIcon } from "lucide-react";

interface ColorOption {
  label: string;
  value: string;
  preview: string;
}

interface IconOption {
  label: string;
  icon: LucideIcon;
  value: string;
}

const colorOptions: ColorOption[] = [
  { label: "Blue", value: "bg-blue-100 text-blue-600", preview: "bg-blue-100" },
  { label: "Red", value: "bg-red-100 text-red-600", preview: "bg-red-100" },
  { label: "Green", value: "bg-green-100 text-green-600", preview: "bg-green-100" },
  { label: "Yellow", value: "bg-yellow-100 text-yellow-600", preview: "bg-yellow-100" },
  { label: "Purple", value: "bg-purple-100 text-purple-600", preview: "bg-purple-100" },
  { label: "Pink", value: "bg-pink-100 text-pink-600", preview: "bg-pink-100" },
  { label: "Orange", value: "bg-orange-100 text-orange-600", preview: "bg-orange-100" },
  { label: "Indigo", value: "bg-indigo-100 text-indigo-600", preview: "bg-indigo-100" },
  { label: "Amber", value: "bg-amber-100 text-amber-600", preview: "bg-amber-100" },
  { label: "Emerald", value: "bg-emerald-100 text-emerald-600", preview: "bg-emerald-100" },
  { label: "Sky", value: "bg-sky-100 text-sky-600", preview: "bg-sky-100" },
];

const iconOptions: IconOption[] = [
  { label: "TV", icon: Tv, value: "Tv" },
  { label: "Sofa", icon: Sofa, value: "Sofa" },
  { label: "Car", icon: Car, value: "Car" },
  { label: "Shirt", icon: Shirt, value: "Shirt" },
  { label: "Home", icon: Home, value: "Home" },
  { label: "Gamepad", icon: Gamepad, value: "Gamepad" },
  { label: "Smartphone", icon: Smartphone, value: "Smartphone" },
  { label: "Baby", icon: Baby, value: "Baby" },
  { label: "Bike", icon: Bike, value: "Bike" },
  { label: "Book", icon: Book, value: "Book" },
  { label: "Music", icon: Music, value: "Music" },
  { label: "Utensils", icon: Utensils, value: "Utensils" },
  { label: "Briefcase", icon: Briefcase, value: "Briefcase" },
  { label: "Palette", icon: Palette, value: "Palette" },
];

interface CategoryFormProps {
  onSave: (category: Omit<Category, 'icon'> & { iconName: string }) => void;
  existingCategory?: Category;
}

const CategoryForm = ({ onSave, existingCategory }: CategoryFormProps) => {
  const [name, setName] = useState(existingCategory?.name || "");
  const [slug, setSlug] = useState(existingCategory?.slug || "");
  const [selectedColor, setSelectedColor] = useState(existingCategory?.color || "bg-blue-100 text-blue-600");
  const [selectedIcon, setSelectedIcon] = useState("");
  const [subcategories, setSubcategories] = useState(
    existingCategory?.subcategories || [{ id: "", name: "", slug: "" }]
  );

  const handleNameChange = (value: string) => {
    setName(value);
    if (!existingCategory) {
      setSlug(value.toLowerCase().replace(/\s+/g, '-'));
    }
  };

  const handleSubcategoryChange = (index: number, field: string, value: string) => {
    const updatedSubcategories = [...subcategories];
    
    if (field === 'name') {
      updatedSubcategories[index].name = value;
      
      // Auto-generate slug and ID if it's a new entry
      if (!updatedSubcategories[index].id) {
        const subcategorySlug = value.toLowerCase().replace(/\s+/g, '-');
        updatedSubcategories[index].slug = subcategorySlug;
        updatedSubcategories[index].id = `${slug}-${subcategorySlug}`;
      }
    } else {
      // @ts-ignore - We know that field exists on subcategory
      updatedSubcategories[index][field] = value;
    }
    
    setSubcategories(updatedSubcategories);
  };

  const addSubcategory = () => {
    setSubcategories([...subcategories, { id: "", name: "", slug: "" }]);
  };

  const removeSubcategory = (index: number) => {
    if (subcategories.length > 1) {
      const updatedSubcategories = subcategories.filter((_, i) => i !== index);
      setSubcategories(updatedSubcategories);
    }
  };

  const handleSubmit = () => {
    // Validate form
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    if (!slug.trim()) {
      toast.error("Category slug is required");
      return;
    }

    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }

    if (!selectedIcon && !existingCategory) {
      toast.error("Please select an icon");
      return;
    }

    // Validate subcategories
    const validSubcategories = subcategories.filter(s => s.name.trim() !== "");
    if (validSubcategories.length === 0) {
      toast.error("At least one subcategory is required");
      return;
    }

    // Make sure all subcategories have IDs and slugs
    const finalSubcategories = validSubcategories.map(sc => {
      if (!sc.id) {
        const subSlug = sc.name.toLowerCase().replace(/\s+/g, '-');
        return {
          id: `${slug}-${subSlug}`,
          name: sc.name,
          slug: subSlug
        };
      }
      return sc;
    });

    // Create new category object
    const newCategory = {
      id: existingCategory?.id || slug,
      name,
      slug,
      iconName: selectedIcon || (existingCategory ? existingCategory.icon.name : ""),
      color: selectedColor,
      subcategories: finalSubcategories
    };

    onSave(newCategory);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">
          {existingCategory ? "Edit Category" : "Add New Category"}
        </h3>
        
        {/* Basic Information */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Category Name</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Electronics"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug</Label>
            <Input 
              id="slug" 
              value={slug} 
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. electronics"
            />
          </div>
        </div>
        
        {/* Icon and Color */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Icon</Label>
            <Select onValueChange={setSelectedIcon}>
              <SelectTrigger>
                <SelectValue placeholder={existingCategory ? existingCategory.icon.name : "Select an icon"} />
              </SelectTrigger>
              <SelectContent className="h-[300px]">
                {iconOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="flex items-center">
                    <div className="flex items-center gap-2">
                      <option.icon className="h-4 w-4" />
                      <span>{option.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Color</Label>
            <Select defaultValue={selectedColor} onValueChange={setSelectedColor}>
              <SelectTrigger>
                <SelectValue placeholder="Select a color" />
              </SelectTrigger>
              <SelectContent>
                {colorOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full ${option.preview}`}></div>
                      <span>{option.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Subcategories */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Subcategories</Label>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={addSubcategory}
            >
              <Plus className="h-4 w-4 mr-1" /> Add Subcategory
            </Button>
          </div>
          
          {subcategories.map((subcategory, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input 
                value={subcategory.name} 
                onChange={(e) => handleSubcategoryChange(index, 'name', e.target.value)}
                placeholder="Subcategory name"
                className="flex-grow"
              />
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                onClick={() => removeSubcategory(index)}
                disabled={subcategories.length <= 1}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <Button type="button" onClick={handleSubmit}>
            <Save className="h-4 w-4 mr-2" />
            Save Category
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
