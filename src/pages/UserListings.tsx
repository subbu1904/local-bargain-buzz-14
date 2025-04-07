
import DashboardLayout from "@/components/DashboardLayout";
import { useState, useEffect } from "react";
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
  Plus,
  Edit3,
  Trash2
} from "lucide-react";
import ListingCard, { ListingProps } from "@/components/ListingCard";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { userMenuGroups } from "@/data/userMenuData";

const UserListings = () => {
  const { toast } = useToast();
  const [listingToDelete, setListingToDelete] = useState<string | null>(null);
  const [listingToEdit, setListingToEdit] = useState<ListingProps | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editFormData, setEditFormData] = useState({
    title: '',
    price: 0,
    category: '',
    location: '',
  });
  
  const [listings, setListings] = useState<ListingProps[]>([
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
    {
      id: "3",
      title: "Mountain Bike - Trek 820",
      price: 350,
      image: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?q=80&w=600&auto=format&fit=crop",
      location: "Oakland, CA",
      distance: "5 miles",
      category: "Sports",
    },
    {
      id: "4",
      title: "Designer Handbag - Barely Used",
      price: 220,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop",
      location: "Berkeley, CA",
      distance: "8 miles",
      category: "Fashion",
    },
  ]);

  const handleDeleteListing = (id: string) => {
    setListingToDelete(id);
    setShowDeleteDialog(true);
  };

  const handleEditListing = (listing: ListingProps) => {
    setListingToEdit(listing);
    setEditFormData({
      title: listing.title,
      price: listing.price,
      category: listing.category,
      location: listing.location,
    });
    setShowEditDialog(true);
  };

  const confirmDelete = () => {
    if (listingToDelete) {
      setListings(listings.filter(listing => listing.id !== listingToDelete));
      toast({
        title: "Listing deleted",
        description: "Your listing has been successfully removed.",
      });
      setShowDeleteDialog(false);
      setListingToDelete(null);
    }
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: name === 'price' ? Number(value) : value,
    });
  };

  const saveEditChanges = () => {
    if (listingToEdit) {
      const updatedListings = listings.map(listing => 
        listing.id === listingToEdit.id 
        ? { ...listing, ...editFormData } 
        : listing
      );
      setListings(updatedListings);
      toast({
        title: "Listing updated",
        description: "Your listing has been successfully updated.",
      });
      setShowEditDialog(false);
      setListingToEdit(null);
    }
  };

  const filteredListings = listings.filter(listing => 
    listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    listing.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout menuGroups={userMenuGroups} role="user">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">My Listings</h1>
        <Button className="bg-flipssi-green text-white hover:bg-green-500" asChild>
          <Link to="/create-listing">
            <Plus className="mr-2 h-4 w-4" />
            Create New Listing
          </Link>
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search your listings..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredListings.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">No listings found.</p>
          <Button className="bg-flipssi-purple text-white hover:bg-purple-700" asChild>
            <Link to="/create-listing">Create your first listing</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredListings.map((listing) => (
            <div key={listing.id} className="relative">
              <ListingCard {...listing} />
              <div className="absolute top-2 right-2 flex gap-2">
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="bg-white h-8 w-8 rounded-full"
                  onClick={() => handleEditListing(listing)}
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="bg-white h-8 w-8 rounded-full text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteListing(listing.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Listing Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Listing</DialogTitle>
          </DialogHeader>
          <p className="py-4">Are you sure you want to delete this listing? This action cannot be undone.</p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Listing Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Listing</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                value={editFormData.title}
                onChange={handleEditFormChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={editFormData.price}
                onChange={handleEditFormChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Input
                id="category"
                name="category"
                value={editFormData.category}
                onChange={handleEditFormChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                value={editFormData.location}
                onChange={handleEditFormChange}
                className="col-span-3"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={saveEditChanges}>
              Save changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default UserListings;
