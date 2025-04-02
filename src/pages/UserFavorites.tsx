
import DashboardLayout from "@/components/DashboardLayout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Heart, 
  MessageCircle, 
  User, 
  CreditCard,
  Bell,
  Search,
  Trash2,
  MessageSquare
} from "lucide-react";
import ListingCard, { ListingProps } from "@/components/ListingCard";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const UserFavorites = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<ListingProps[]>([
    {
      id: "5",
      title: "Brand New PlayStation 5 Digital Edition",
      price: 399,
      image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=600&auto=format&fit=crop",
      location: "San Jose, CA",
      distance: "12 miles",
      category: "Electronics",
      isNew: true,
    },
    {
      id: "6",
      title: "Midcentury Modern Coffee Table",
      price: 225,
      image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=600&auto=format&fit=crop",
      location: "Menlo Park, CA",
      distance: "7 miles",
      category: "Furniture",
    },
    {
      id: "7",
      title: "Canon EOS R6 Mirrorless Camera",
      price: 1599,
      image: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?q=80&w=600&auto=format&fit=crop",
      location: "Palo Alto, CA",
      distance: "9 miles",
      category: "Electronics",
    },
    {
      id: "8",
      title: "Designer Sunglasses - Ray-Ban",
      price: 120,
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop",
      location: "San Francisco, CA",
      distance: "2 miles",
      category: "Fashion",
    },
  ]);

  const menuGroups = [
    {
      title: "Account",
      items: [
        {
          title: "Dashboard",
          path: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "My Listings",
          path: "/dashboard/listings",
          icon: ShoppingBag,
        },
        {
          title: "Favorites",
          path: "/dashboard/favorites",
          icon: Heart,
        },
        {
          title: "Messages",
          path: "/dashboard/messages",
          icon: MessageCircle,
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Profile",
          path: "/dashboard/profile",
          icon: User,
        },
        {
          title: "Payments",
          path: "/dashboard/payments",
          icon: CreditCard,
        },
        {
          title: "Notifications",
          path: "/dashboard/notifications",
          icon: Bell,
        },
      ],
    },
  ];

  const handleRemoveFavorite = (id: string) => {
    setFavorites(favorites.filter(favorite => favorite.id !== id));
    toast({
      title: "Removed from favorites",
      description: "Item has been removed from your favorites.",
    });
  };

  const filteredFavorites = favorites.filter(favorite => 
    favorite.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    favorite.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout menuGroups={menuGroups} role="user">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">My Favorites</h1>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search your favorites..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredFavorites.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">No favorites found.</p>
          <Button className="bg-flipssi-purple text-white hover:bg-purple-700" asChild>
            <Link to="/">Browse listings</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredFavorites.map((favorite) => (
            <div key={favorite.id} className="relative">
              <ListingCard {...favorite} />
              <div className="absolute top-2 right-2 flex gap-2">
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="bg-white h-8 w-8 rounded-full"
                >
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="bg-white h-8 w-8 rounded-full text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveFavorite(favorite.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default UserFavorites;
