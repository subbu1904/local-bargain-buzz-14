
import { Link } from "react-router-dom";
import { 
  Tv, 
  Sofa, 
  Car, 
  Shirt, 
  Home, 
  Gamepad, 
  Smartphone, 
  Baby, 
  Bike
} from "lucide-react";

interface CategoryProps {
  icon: React.ReactNode;
  name: string;
  link: string;
  color: string;
}

const Category = ({ icon, name, link, color }: CategoryProps) => {
  return (
    <Link to={link} className="group">
      <div className="flex flex-col items-center justify-center p-4">
        <div className={`w-16 h-16 ${color} rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <span className="text-sm font-medium">{name}</span>
      </div>
    </Link>
  );
};

const CategorySection = () => {
  const categories = [
    { icon: <Tv size={28} />, name: "Electronics", link: "/category/electronics", color: "bg-blue-100 text-blue-600" },
    { icon: <Sofa size={28} />, name: "Furniture", link: "/category/furniture", color: "bg-amber-100 text-amber-600" },
    { icon: <Car size={28} />, name: "Vehicles", link: "/category/vehicles", color: "bg-red-100 text-red-600" },
    { icon: <Shirt size={28} />, name: "Clothing", link: "/category/clothing", color: "bg-purple-100 text-purple-600" },
    { icon: <Home size={28} />, name: "Real Estate", link: "/category/real-estate", color: "bg-green-100 text-green-600" },
    { icon: <Gamepad size={28} />, name: "Gaming", link: "/category/gaming", color: "bg-indigo-100 text-indigo-600" },
    { icon: <Smartphone size={28} />, name: "Phones", link: "/category/phones", color: "bg-sky-100 text-sky-600" },
    { icon: <Baby size={28} />, name: "Baby & Kids", link: "/category/baby-kids", color: "bg-pink-100 text-pink-600" },
    { icon: <Bike size={28} />, name: "Sports", link: "/category/sports", color: "bg-orange-100 text-orange-600" },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-8 text-center">Browse Categories</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-2">
          {categories.map((category, index) => (
            <Category
              key={index}
              icon={category.icon}
              name={category.name}
              link={category.link}
              color={category.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
