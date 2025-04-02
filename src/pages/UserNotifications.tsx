
import DashboardLayout from "@/components/DashboardLayout";
import { useState } from "react";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Heart, 
  MessageCircle, 
  User, 
  CreditCard,
  Bell,
  Trash2,
  CheckSquare,
  Settings,
  MessageSquare,
  DollarSign,
  ShoppingCart
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: "message" | "offer" | "sale" | "system";
}

const UserNotifications = () => {
  const { toast } = useToast();
  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      messages: true,
      offers: true,
      purchases: true,
      accountUpdates: true,
      marketing: false,
    },
    push: {
      messages: true,
      offers: true,
      purchases: true,
      accountUpdates: false,
      marketing: false,
    },
  });
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New message from John Smith",
      message: "Hi, is the iPhone still available for purchase?",
      timestamp: new Date(2023, 5, 20, 14, 30),
      read: false,
      type: "message",
    },
    {
      id: "2",
      title: "New offer received",
      message: "Emily Johnson offered $120 for your coffee table.",
      timestamp: new Date(2023, 5, 19, 10, 15),
      read: false,
      type: "offer",
    },
    {
      id: "3",
      title: "Listing sold!",
      message: "Congratulations! Your mountain bike has been sold for $350.",
      timestamp: new Date(2023, 5, 18, 16, 45),
      read: true,
      type: "sale",
    },
    {
      id: "4",
      title: "Welcome to Flipssi",
      message: "Thank you for joining our community! Start selling your items today.",
      timestamp: new Date(2023, 5, 15, 9, 0),
      read: true,
      type: "system",
    },
  ]);
  
  const [activeTab, setActiveTab] = useState("all");
  const [filter, setFilter] = useState("all");

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

  const handleToggle = (category: string, type: "email" | "push") => {
    setNotificationSettings(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [category]: !prev[type][category],
      },
    }));
    
    toast({
      title: "Notification settings updated",
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} notifications for ${category} have been ${!notificationSettings[type][category as keyof typeof notificationSettings.email] ? "enabled" : "disabled"}.`,
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    toast({
      title: "Notification deleted",
      description: "The notification has been removed.",
    });
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    toast({
      title: "All notifications marked as read",
      description: "All your notifications have been marked as read.",
    });
  };

  const getFilteredNotifications = () => {
    let filtered = notifications;
    
    // Filter by tab
    if (activeTab !== "all") {
      filtered = filtered.filter(notification => 
        activeTab === "unread" ? !notification.read : notification.read
      );
    }
    
    // Filter by type
    if (filter !== "all") {
      filtered = filtered.filter(notification => notification.type === filter);
    }
    
    return filtered;
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case "offer":
        return <DollarSign className="h-5 w-5 text-green-500" />;
      case "sale":
        return <ShoppingCart className="h-5 w-5 text-purple-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <DashboardLayout menuGroups={menuGroups} role="user">
      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="settings">Notification Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="notifications">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl font-bold">My Notifications</h1>
            
            <div className="flex items-center gap-4">
              <Select
                value={filter}
                onValueChange={setFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="message">Messages</SelectItem>
                  <SelectItem value="offer">Offers</SelectItem>
                  <SelectItem value="sale">Sales</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                onClick={markAllAsRead}
                disabled={!notifications.some(n => !n.read)}
              >
                <CheckSquare className="mr-2 h-4 w-4" />
                Mark all as read
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="border-b">
              <div className="flex">
                <button
                  className={`px-4 py-3 text-sm font-medium ${
                    activeTab === "all" 
                      ? "border-b-2 border-flipssi-purple text-flipssi-purple" 
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("all")}
                >
                  All
                </button>
                <button
                  className={`px-4 py-3 text-sm font-medium ${
                    activeTab === "unread" 
                      ? "border-b-2 border-flipssi-purple text-flipssi-purple" 
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("unread")}
                >
                  Unread
                </button>
                <button
                  className={`px-4 py-3 text-sm font-medium ${
                    activeTab === "read" 
                      ? "border-b-2 border-flipssi-purple text-flipssi-purple" 
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("read")}
                >
                  Read
                </button>
              </div>
            </div>
            
            <div>
              {getFilteredNotifications().length === 0 ? (
                <div className="text-center py-10">
                  <Bell className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No notifications to display.</p>
                </div>
              ) : (
                <div className="divide-y">
                  {getFilteredNotifications().map((notification) => (
                    <div 
                      key={notification.id}
                      className={`p-4 flex items-start ${notification.read ? '' : 'bg-gray-50'}`}
                    >
                      <div className="mr-4 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <h3 className={`font-medium ${notification.read ? '' : 'font-semibold'}`}>
                            {notification.title}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {notification.timestamp.toLocaleDateString()} {notification.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      </div>
                      <div className="ml-4 flex gap-2">
                        {!notification.read && (
                          <Button 
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <CheckSquare className="h-4 w-4" />
                          </Button>
                        )}
                        <Button 
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 text-red-500 hover:text-red-700"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Notification Settings</h1>
            <p className="text-gray-500 mt-2">
              Choose how and when you want to be notified.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <Settings className="h-5 w-5 mr-2 text-gray-500" />
                  <h2 className="text-xl font-semibold">Email Notifications</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-messages" className="font-medium">Messages</Label>
                      <p className="text-sm text-gray-500">
                        Receive email notifications for new messages.
                      </p>
                    </div>
                    <Switch 
                      id="email-messages" 
                      checked={notificationSettings.email.messages}
                      onCheckedChange={() => handleToggle("messages", "email")}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-offers" className="font-medium">Offers</Label>
                      <p className="text-sm text-gray-500">
                        Receive email notifications for new offers on your listings.
                      </p>
                    </div>
                    <Switch 
                      id="email-offers" 
                      checked={notificationSettings.email.offers}
                      onCheckedChange={() => handleToggle("offers", "email")}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-purchases" className="font-medium">Purchases & Sales</Label>
                      <p className="text-sm text-gray-500">
                        Receive email notifications for successful transactions.
                      </p>
                    </div>
                    <Switch 
                      id="email-purchases" 
                      checked={notificationSettings.email.purchases}
                      onCheckedChange={() => handleToggle("purchases", "email")}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-account" className="font-medium">Account Updates</Label>
                      <p className="text-sm text-gray-500">
                        Receive email notifications for account security and updates.
                      </p>
                    </div>
                    <Switch 
                      id="email-account" 
                      checked={notificationSettings.email.accountUpdates}
                      onCheckedChange={() => handleToggle("accountUpdates", "email")}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-marketing" className="font-medium">Marketing</Label>
                      <p className="text-sm text-gray-500">
                        Receive promotional emails and special offers.
                      </p>
                    </div>
                    <Switch 
                      id="email-marketing" 
                      checked={notificationSettings.email.marketing}
                      onCheckedChange={() => handleToggle("marketing", "email")}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-4">
                  <Bell className="h-5 w-5 mr-2 text-gray-500" />
                  <h2 className="text-xl font-semibold">Push Notifications</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-messages" className="font-medium">Messages</Label>
                      <p className="text-sm text-gray-500">
                        Receive push notifications for new messages.
                      </p>
                    </div>
                    <Switch 
                      id="push-messages" 
                      checked={notificationSettings.push.messages}
                      onCheckedChange={() => handleToggle("messages", "push")}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-offers" className="font-medium">Offers</Label>
                      <p className="text-sm text-gray-500">
                        Receive push notifications for new offers on your listings.
                      </p>
                    </div>
                    <Switch 
                      id="push-offers" 
                      checked={notificationSettings.push.offers}
                      onCheckedChange={() => handleToggle("offers", "push")}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-purchases" className="font-medium">Purchases & Sales</Label>
                      <p className="text-sm text-gray-500">
                        Receive push notifications for successful transactions.
                      </p>
                    </div>
                    <Switch 
                      id="push-purchases" 
                      checked={notificationSettings.push.purchases}
                      onCheckedChange={() => handleToggle("purchases", "push")}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-account" className="font-medium">Account Updates</Label>
                      <p className="text-sm text-gray-500">
                        Receive push notifications for account security and updates.
                      </p>
                    </div>
                    <Switch 
                      id="push-account" 
                      checked={notificationSettings.push.accountUpdates}
                      onCheckedChange={() => handleToggle("accountUpdates", "push")}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-marketing" className="font-medium">Marketing</Label>
                      <p className="text-sm text-gray-500">
                        Receive promotional push notifications and special offers.
                      </p>
                    </div>
                    <Switch 
                      id="push-marketing" 
                      checked={notificationSettings.push.marketing}
                      onCheckedChange={() => handleToggle("marketing", "push")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default UserNotifications;
