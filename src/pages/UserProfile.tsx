
import DashboardLayout from "@/components/DashboardLayout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Heart, 
  MessageCircle, 
  User, 
  CreditCard,
  Bell,
  Camera,
  Save
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const UserProfile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    bio: "I love finding treasures and giving items a second life. Passionate about sustainability and reducing waste through resale.",
    avatar: "https://i.pravatar.cc/150?img=5"
  });
  
  const [form, setForm] = useState({ ...profile });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile({ ...form });
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  };

  return (
    <DashboardLayout menuGroups={menuGroups} role="user">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Profile</h1>
        {!isEditing ? (
          <Button 
            onClick={() => setIsEditing(true)} 
            className="bg-flipssi-purple text-white hover:bg-purple-700"
          >
            Edit Profile
          </Button>
        ) : (
          <Button 
            onClick={() => setIsEditing(false)} 
            variant="outline"
          >
            Cancel
          </Button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 sm:p-8">
          {!isEditing ? (
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col items-center">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
              </div>
              
              <div className="flex-grow space-y-4">
                <div>
                  <h2 className="text-2xl font-bold">{profile.name}</h2>
                  <p className="text-gray-500">{profile.location}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p>{profile.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p>{profile.phone}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">About</p>
                  <p className="mt-1">{profile.bio}</p>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={form.avatar} />
                      <AvatarFallback>{form.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <Button 
                      size="icon"
                      variant="secondary"
                      className="absolute bottom-0 right-0 rounded-full"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex-grow space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">About</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={form.bio}
                      onChange={handleChange}
                      rows={4}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      className="bg-flipssi-green text-white hover:bg-green-500"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserProfile;
