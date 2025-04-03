
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ListingCard, { ListingProps } from "@/components/ListingCard";
import { userMenuGroups } from "@/data/userMenuData";

const UserDashboard = () => {
  const myListings: ListingProps[] = [
    {
      id: "1",
      title: "iPhone 13 Pro Max - Mint Condition",
      price: 899,
      image: "https://images.unsplash.com/photo-1617997455403-41f333d44d5b?q=80&w=600&auto=format&fit=crop",
      location: "San Francisco, CA",
      distance: "2 miles",
      category: "Electronics",
      isNew: true,
    },
    {
      id: "2",
      title: "Vintage Coffee Table - Solid Wood",
      price: 150,
      image: "https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?q=80&w=600&auto=format&fit=crop",
      location: "San Francisco, CA",
      distance: "2 miles",
      category: "Furniture",
    },
  ];

  return (
    <DashboardLayout menuGroups={userMenuGroups} role="user">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">My Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">7</div>
            <p className="text-xs text-muted-foreground mt-1">
              2 active, 5 sold
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Favorites</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">
              +3 new this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5</div>
            <p className="text-xs text-muted-foreground mt-1">
              3 unread messages
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Your Active Listings</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {myListings.map((listing) => (
            <ListingCard key={listing.id} {...listing} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
