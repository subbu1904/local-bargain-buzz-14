
import { Link } from "react-router-dom";
import { categories } from "@/data/categoryData";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const Category = ({ 
  icon, 
  name, 
  link, 
  color, 
  onClick 
}: {
  icon: React.ReactNode;
  name: string;
  link: string;
  color: string;
  onClick?: () => void;
}) => {
  return (
    <div className="group" onClick={onClick}>
      <Link to={link}>
        <div className="flex flex-col items-center justify-center p-4">
          <div className={`w-16 h-16 ${color} rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
            {icon}
          </div>
          <span className="text-sm font-medium text-[#006a5a]">{name}</span>
        </div>
      </Link>
    </div>
  );
};

const CategorySection = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  
  const handleCategoryClick = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-8 text-center text-[#006a5a]">Browse Categories</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Collapsible key={category.id} open={expandedCategory === category.id}>
              <Category
                icon={<category.icon size={28} />}
                name={category.name}
                link={`/category/${category.slug}`}
                color={category.color}
                onClick={() => handleCategoryClick(category.id)}
              />
              <CollapsibleContent className="col-span-3 md:col-span-6 lg:col-span-5 bg-white rounded-md shadow-sm p-4 mt-2">
                <h3 className="font-semibold text-lg mb-3 text-[#006a5a]">{category.name} Subcategories</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                  {category.subcategories.map((subcategory) => (
                    <Link 
                      key={subcategory.id} 
                      to={`/category/${category.slug}/${subcategory.slug}`}
                      className="p-2 hover:bg-[#bffff5] rounded-md transition-colors text-[#006a5a]"
                    >
                      <span className="text-sm">{subcategory.name}</span>
                    </Link>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
