
import DashboardLayout from "@/components/DashboardLayout";
import { useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  Settings, 
  BarChart4, 
  AlertTriangle,
  FileText,
  Search,
  Filter,
  MoreHorizontal,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  FileEdit
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Listing {
  id: string;
  title: string;
  price: number;
  image: string;
  status: "active" | "pending" | "sold" | "rejected";
  featured: boolean;
  category: string;
  createdAt: Date;
  createdBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  views: number;
}

const AdminListings = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedListing, setSelectedListing] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  
  const [listings, setListings] = useState<Listing[]>([
    {
      id: "1",
      title: "iPhone 13 Pro Max - Mint Condition",
      price: 899,
      image: "https://images.unsplash.com/photo-1617997455403-41f333d44d5b?q=80&w=600&auto=format&fit=crop",
      status: "active",
      featured: true,
      category: "Electronics",
      createdAt: new Date(2023, 5, 15),
      createdBy: {
        id: "1",
        name: "John Smith",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      views: 245,
    },
    {
      id: "2",
      title: "Vintage Coffee Table - Solid Wood",
      price: 150,
      image: "https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?q=80&w=600&auto=format&fit=crop",
      status: "active",
      featured: false,
      category: "Furniture",
      createdAt: new Date(2023, 5, 14),
      createdBy: {
        id: "2",
        name: "Emily Johnson",
        avatar: "https://i.pravatar.cc/150?img=5",
      },
      views: 112,
    },
    {
      id: "3",
      title: "Mountain Bike - Trek 820",
      price: 350,
      image: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?q=80&w=600&auto=format&fit=crop",
      status: "sold",
      featured: false,
      category: "Sports",
      createdAt: new Date(2023, 5, 10),
      createdBy: {
        id: "1",
        name: "John Smith",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      views: 203,
    },
    {
      id: "4",
      title: "Designer Handbag - Barely Used",
      price: 220,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop",
      status: "pending",
      featured: false,
      category: "Fashion",
      createdAt: new Date(2023, 5, 19),
      createdBy: {
        id: "3",
        name: "Michael Brown",
        avatar: "https://i.pravatar.cc/150?img=8",
      },
      views: 67,
    },
    {
      id: "5",
      title: "Playstation 5 Digital Edition",
      price: 399,
      image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=600&auto=format&fit=crop",
      status: "pending",
      featured: false,
      category: "Electronics",
      createdAt: new Date(2023, 5, 20),
      createdBy: {
        id: "5",
        name: "David Miller",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
      views: 89,
    },
    {
      id: "6",
      title: "Antique Pocket Watch",
      price: 175,
      image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?q=80&w=600&auto=format&fit=crop",
      status: "rejected",
      featured: false,
      category: "Collectibles",
      createdAt: new Date(2023, 5, 17),
      createdBy: {
        id: "2",
        name: "Emily Johnson",
        avatar: "https://i.pravatar.cc/150?img=5",
      },
      views: 0,
    },
  ]);

  const menuGroups = [
    {
      title: "Main",
      items: [
        {
          title: "Dashboard",
          path: "/admin",
          icon: LayoutDashboard,
        },
        {
          title: "Users",
          path: "/admin/users",
          icon: Users,
        },
        {
          title: "Listings",
          path: "/admin/listings",
          icon: ShoppingBag,
        },
      ],
    },
    {
      title: "Analytics",
      items: [
        {
          title: "Reports",
          path: "/admin/reports",
          icon: BarChart4,
        },
        {
          title: "Activity",
          path: "/admin/activity",
          icon: AlertTriangle,
        },
      ],
    },
    {
      title: "System",
      items: [
        {
          title: "Settings",
          path: "/admin/settings",
          icon: Settings,
        },
        {
          title: "Logs",
          path: "/admin/logs",
          icon: FileText,
        },
      ],
    },
  ];

  const handleDeleteListing = () => {
    if (selectedListing) {
      const listing = listings.find(l => l.id === selectedListing);
      
      setListings(listings.filter(listing => listing.id !== selectedListing));
      
      toast({
        title: "Listing deleted",
        description: `"${listing?.title}" has been deleted.`,
      });
      
      setShowDeleteDialog(false);
      setSelectedListing(null);
    }
  };

  const handleApproveListing = () => {
    if (selectedListing) {
      setListings(listings.map(listing => 
        listing.id === selectedListing 
          ? { ...listing, status: "active" }
          : listing
      ));
      
      const listing = listings.find(l => l.id === selectedListing);
      
      toast({
        title: "Listing approved",
        description: `"${listing?.title}" has been approved and is now live.`,
      });
      
      setShowApproveDialog(false);
      setSelectedListing(null);
    }
  };

  const handleRejectListing = () => {
    if (selectedListing) {
      setListings(listings.map(listing => 
        listing.id === selectedListing 
          ? { ...listing, status: "rejected" }
          : listing
      ));
      
      const listing = listings.find(l => l.id === selectedListing);
      
      toast({
        title: "Listing rejected",
        description: `"${listing?.title}" has been rejected.`,
      });
      
      setShowRejectDialog(false);
      setSelectedListing(null);
    }
  };

  const toggleFeatureListing = (id: string) => {
    setListings(listings.map(listing => 
      listing.id === id 
        ? { ...listing, featured: !listing.featured }
        : listing
    ));
    
    const listing = listings.find(l => l.id === id);
    const isFeatured = !listing?.featured;
    
    toast({
      title: isFeatured ? "Listing featured" : "Listing unfeatured",
      description: `"${listing?.title}" has been ${isFeatured ? "added to" : "removed from"} featured listings.`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "pending":
        return <Badge variant="outline" className="border-amber-500 text-amber-500">Pending</Badge>;
      case "sold":
        return <Badge className="bg-flipssi-purple">Sold</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return null;
    }
  };

  const filteredListings = listings.filter(listing => {
    const matchesSearch = 
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || listing.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || listing.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = Array.from(new Set(listings.map(listing => listing.category)));

  return (
    <DashboardLayout menuGroups={menuGroups} role="admin">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Listing Management</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search listings..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <div className="w-40">
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger>
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <span>Status</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-40">
              <Select
                value={categoryFilter}
                onValueChange={setCategoryFilter}
              >
                <SelectTrigger>
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <span>Category</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Listing
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seller
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredListings.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-10 text-center text-gray-500">
                    No listings found.
                  </td>
                </tr>
              ) : (
                filteredListings.map((listing) => (
                  <tr key={listing.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded overflow-hidden">
                          <img
                            src={listing.image}
                            alt={listing.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 flex items-center">
                            {listing.title}
                            {listing.featured && (
                              <span className="ml-2 inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                                Featured
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">${listing.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(listing.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {listing.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={listing.createdBy.avatar} />
                            <AvatarFallback>{listing.createdBy.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="ml-2 text-sm text-gray-500">{listing.createdBy.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {listing.createdAt.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {listing.views}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => console.log('View', listing.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => console.log('Edit', listing.id)}>
                            <FileEdit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {listing.status === "pending" && (
                            <>
                              <DropdownMenuItem 
                                onClick={() => {
                                  setSelectedListing(listing.id);
                                  setShowApproveDialog(true);
                                }}
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                <span>Approve</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => {
                                  setSelectedListing(listing.id);
                                  setShowRejectDialog(true);
                                }}
                              >
                                <XCircle className="mr-2 h-4 w-4" />
                                <span>Reject</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                            </>
                          )}
                          <DropdownMenuItem 
                            onClick={() => toggleFeatureListing(listing.id)}
                          >
                            <span>{listing.featured ? "Remove from Featured" : "Add to Featured"}</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-500 focus:text-red-500"
                            onClick={() => {
                              setSelectedListing(listing.id);
                              setShowDeleteDialog(true);
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Delete Listing Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Listing</DialogTitle>
          </DialogHeader>
          <p className="py-4">
            Are you sure you want to delete this listing? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteListing}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Approve Listing Dialog */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Listing</DialogTitle>
          </DialogHeader>
          <p className="py-4">
            Are you sure you want to approve this listing? It will be visible to all users.
          </p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowApproveDialog(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-green-500 text-white hover:bg-green-600"
              onClick={handleApproveListing}
            >
              Approve
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Reject Listing Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Listing</DialogTitle>
          </DialogHeader>
          <p className="py-4">
            Are you sure you want to reject this listing? The seller will be notified.
          </p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleRejectListing}
            >
              Reject
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AdminListings;
