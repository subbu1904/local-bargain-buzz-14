
import DashboardLayout from "@/components/DashboardLayout";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  Trash2,
  Star,
  ArrowLeft,
  Camera
} from "lucide-react";
import ListingCard, { ListingProps } from "@/components/ListingCard";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { userMenuGroups } from "@/data/userMenuData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/lib/supabase";

// Categories for the dropdown
const categories = [
  "Electronics",
  "Furniture",
  "Fashion",
  "Sports",
  "Books",
  "Toys",
  "Home & Garden",
  "Automotive",
  "Other"
];

const UserListings = () => {
  const { toast } = useToast();
  const [listingToDelete, setListingToDelete] = useState<string | null>(null);
  const [listingToEdit, setListingToEdit] = useState<ListingProps | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [editFormData, setEditFormData] = useState({
    title: '',
    price: 0,
    category: '',
    location: '',
    description: '',
    condition: 'new',
    rating: 0,
    image: '',
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
      rating: 4.5
    },
    {
      id: "2",
      title: "Vintage Coffee Table - Solid Wood",
      price: 150,
      image: "https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?q=80&w=600&auto=format&fit=crop",
      location: "San Francisco, CA",
      distance: "2 miles",
      category: "Furniture",
      rating: 4.0
    },
    {
      id: "3",
      title: "Mountain Bike - Trek 820",
      price: 350,
      image: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?q=80&w=600&auto=format&fit=crop",
      location: "Oakland, CA",
      distance: "5 miles",
      category: "Sports",
      rating: 3.5
    },
    {
      id: "4",
      title: "Designer Handbag - Barely Used",
      price: 220,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop",
      location: "Berkeley, CA",
      distance: "8 miles",
      category: "Fashion",
      rating: 5.0
    },
  ]);

  // Function to fetch listings from database
  const fetchListings = async () => {
    try {
      // In a real application, you would fetch listings from Supabase here
      // const { data, error } = await supabase
      //   .from('listings')
      //   .select('*')
      //   .eq('user_id', userId);
      // if (error) throw error;
      // if (data) setListings(data);
      
      // For demonstration, we'll use the mock data
      console.log("Fetched listings from database");
    } catch (error) {
      console.error("Error fetching listings:", error);
      toast({
        title: "Error",
        description: "Failed to fetch your listings",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

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
      location: listing.location || '',
      description: listing.description || '',
      condition: listing.isNew ? 'new' : 'used',
      rating: listing.rating || 0,
      image: listing.image || '',
    });
    setShowEditDialog(true);
  };

  const confirmDelete = async () => {
    if (listingToDelete) {
      setIsLoading(true);
      try {
        // In a real application, you would delete from Supabase here
        // const { error } = await supabase
        //   .from('listings')
        //   .delete()
        //   .eq('id', listingToDelete);
        // if (error) throw error;
        
        // Update local state
        setListings(listings.filter(listing => listing.id !== listingToDelete));
        toast({
          title: "Listing deleted",
          description: "Your listing has been successfully removed.",
        });
      } catch (error) {
        console.error("Error deleting listing:", error);
        toast({
          title: "Error",
          description: "Failed to delete listing",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        setShowDeleteDialog(false);
        setListingToDelete(null);
      }
    }
  };

  const handleEditFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: name === 'price' ? Number(value) : value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleRatingChange = (rating: number) => {
    setEditFormData({
      ...editFormData,
      rating,
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileSize = file.size / 1024 / 1024; // size in MB
    if (fileSize > 5) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      // In a real application, you would upload to Supabase Storage here
      // const { data, error } = await supabase.storage
      //   .from('listings')
      //   .upload(`${Date.now()}-${file.name}`, file);
      // if (error) throw error;

      // Simulate a successful upload after a delay
      setTimeout(() => {
        clearInterval(progressInterval);
        setUploadProgress(100);
        
        // Set the image URL in form data
        // In a real application, you would get the URL from Supabase
        const reader = new FileReader();
        reader.onloadend = () => {
          setEditFormData({
            ...editFormData,
            image: reader.result as string,
          });
          setIsLoading(false);
        };
        reader.readAsDataURL(file);
      }, 2000);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Upload failed",
        description: "Failed to upload image",
        variant: "destructive",
      });
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  const saveEditChanges = async () => {
    if (listingToEdit) {
      setIsLoading(true);
      try {
        const updatedListing: ListingProps = {
          ...listingToEdit,
          title: editFormData.title,
          price: editFormData.price,
          category: editFormData.category,
          location: editFormData.location,
          description: editFormData.description,
          isNew: editFormData.condition === 'new',
          rating: editFormData.rating,
          image: editFormData.image || listingToEdit.image,
        };

        // In a real application, you would update in Supabase here
        // const { error } = await supabase
        //   .from('listings')
        //   .update(updatedListing)
        //   .eq('id', listingToEdit.id);
        // if (error) throw error;

        // Update local state
        const updatedListings = listings.map(listing => 
          listing.id === listingToEdit.id 
            ? updatedListing 
            : listing
        );
        
        setListings(updatedListings);
        toast({
          title: "Listing updated",
          description: "Your listing has been successfully updated.",
        });
      } catch (error) {
        console.error("Error updating listing:", error);
        toast({
          title: "Error",
          description: "Failed to update listing",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        setShowEditDialog(false);
        setListingToEdit(null);
      }
    }
  };

  const filteredListings = listings.filter(listing => 
    listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    listing.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const RatingStars = ({ rating, onRatingChange }: { rating: number, onRatingChange?: (rating: number) => void }) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange?.(star)}
            className="focus:outline-none"
          >
            <Star
              className={`h-5 w-5 ${
                star <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <DashboardLayout menuGroups={userMenuGroups} role="user">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center">
          <Link to="/dashboard" className="mr-2">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">My Listings</h1>
        </div>
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
              <div className="mt-2 flex items-center justify-between px-1">
                <RatingStars rating={listing.rating || 0} />
                <div className="flex gap-2">
                  <Button 
                    size="icon" 
                    variant="outline" 
                    className="h-8 w-8 rounded-full"
                    onClick={() => handleEditListing(listing)}
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="outline" 
                    className="h-8 w-8 rounded-full text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteListing(listing.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
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
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Listing Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Listing</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title" className="mb-2 block">
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={editFormData.title}
                  onChange={handleEditFormChange}
                />
              </div>
              <div>
                <Label htmlFor="price" className="mb-2 block">
                  Price
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={editFormData.price}
                  onChange={handleEditFormChange}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category" className="mb-2 block">
                  Category
                </Label>
                <Select 
                  value={editFormData.category} 
                  onValueChange={(value) => handleSelectChange("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="location" className="mb-2 block">
                  Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={editFormData.location}
                  onChange={handleEditFormChange}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="mb-2 block">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                rows={4}
                value={editFormData.description || ""}
                onChange={handleEditFormChange}
              />
            </div>

            <div>
              <Label className="mb-2 block">Condition</Label>
              <RadioGroup 
                value={editFormData.condition}
                onValueChange={(value) => handleSelectChange("condition", value)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="new" id="condition-new" />
                  <Label htmlFor="condition-new">New</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="used" id="condition-used" />
                  <Label htmlFor="condition-used">Used</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="mb-2 block">Rating</Label>
              <RatingStars 
                rating={editFormData.rating} 
                onRatingChange={handleRatingChange} 
              />
            </div>

            <Separator />

            <div>
              <Label className="mb-2 block">Image</Label>
              <div className="flex flex-col space-y-3">
                {editFormData.image && (
                  <div className="relative w-full h-40 bg-gray-100 rounded overflow-hidden">
                    <img 
                      src={editFormData.image} 
                      alt={editFormData.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('image-upload')?.click()}
                    disabled={isLoading}
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    {editFormData.image ? "Change Image" : "Upload Image"}
                  </Button>
                  <Input
                    id="image-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isLoading}
                  />
                </div>
                
                {isLoading && uploadProgress > 0 && (
                  <div className="space-y-2">
                    <Progress value={uploadProgress} />
                    <p className="text-xs text-gray-500">{uploadProgress}% uploaded</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={saveEditChanges} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default UserListings;
