
import { Button } from "@/components/ui/button";
import ListingCard, { ListingProps } from "./ListingCard";

const mockListings: ListingProps[] = [
  {
    id: "1",
    title: "Sony PlayStation 5 Console",
    price: 449,
    image: "https://source.unsplash.com/eYpcLDXHVb0/600x600",
    location: "Brooklyn, NY",
    distance: "2.4 mi",
    isNew: true,
    category: "Electronics"
  },
  {
    id: "2",
    title: "Mid-Century Modern Sofa",
    price: 350,
    image: "https://source.unsplash.com/MP0bgaS_d1c/600x600",
    location: "Queens, NY",
    distance: "3.1 mi",
    category: "Furniture"
  },
  {
    id: "3",
    title: "Apple iPhone 14 Pro Max",
    price: 899,
    image: "https://source.unsplash.com/_KaMTEmJnxY/600x600",
    location: "Manhattan, NY",
    distance: "1.8 mi",
    isNew: true,
    category: "Electronics"
  },
  {
    id: "4",
    title: "Wooden Dining Table with 4 Chairs",
    price: 275,
    image: "https://source.unsplash.com/Hv3BC2LRX-E/600x600",
    location: "Bronx, NY",
    distance: "4.5 mi",
    category: "Furniture"
  },
  {
    id: "5",
    title: "2018 Honda Civic Sedan",
    price: 12500,
    image: "https://source.unsplash.com/obV_LM0KjxY/600x600",
    location: "Staten Island, NY",
    distance: "7.2 mi",
    category: "Vehicles"
  },
  {
    id: "6",
    title: "55\" Samsung 4K Smart TV",
    price: 380,
    image: "https://source.unsplash.com/v55ZzKV_aUU/600x600",
    location: "Brooklyn, NY",
    distance: "2.1 mi",
    category: "Electronics"
  },
  {
    id: "7",
    title: "Leather Recliner Chair",
    price: 195,
    image: "https://source.unsplash.com/HJckKnwCXxQ/600x600",
    location: "Queens, NY",
    distance: "3.5 mi",
    category: "Furniture"
  },
  {
    id: "8",
    title: "Canon EOS R6 Camera",
    price: 1299,
    image: "https://source.unsplash.com/7gF7hLiYW4A/600x600",
    location: "Manhattan, NY",
    distance: "2.0 mi",
    isNew: true,
    category: "Electronics"
  },
];

interface FeaturedListingsProps {
  title: string;
  showViewAll?: boolean;
}

const FeaturedListings = ({ title, showViewAll = true }: FeaturedListingsProps) => {
  return (
    <section className="py-12">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">{title}</h2>
          {showViewAll && (
            <Button variant="ghost" className="text-flipssi-purple hover:text-flipssi-dark-purple hover:bg-flipssi-soft-gray">
              View all
            </Button>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {mockListings.map((listing) => (
            <ListingCard key={listing.id} {...listing} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
