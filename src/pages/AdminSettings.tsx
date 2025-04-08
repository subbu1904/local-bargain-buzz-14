
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  Settings, 
  BarChart4, 
  AlertTriangle,
  FileText,
  UserPlus,
  Key
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/lib/supabase";

const AdminSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [allowRegistration, setAllowRegistration] = useState(true);
  const [emailVerification, setEmailVerification] = useState(true);
  
  // User management states
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserRole, setNewUserRole] = useState("user");
  const [users, setUsers] = useState([
    { id: "1", email: "admin@flipssi.com", role: "admin", createdAt: "2025-01-15" },
    { id: "2", email: "user1@example.com", role: "user", createdAt: "2025-01-20" },
    { id: "3", email: "user2@example.com", role: "user", createdAt: "2025-02-05" }
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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Settings saved",
        description: "Your system settings have been updated successfully.",
      });
    }, 1000);
  };

  const handleMaintenanceModeToggle = (checked: boolean) => {
    if (checked) {
      // Show confirmation dialog in a real app
      const confirm = window.confirm("Enable maintenance mode? This will make the site unavailable to regular users.");
      if (confirm) {
        setMaintenanceMode(checked);
        toast({
          title: "Maintenance mode enabled",
          description: "The site is now in maintenance mode and unavailable to regular users.",
        });
      }
    } else {
      setMaintenanceMode(checked);
      toast({
        title: "Maintenance mode disabled",
        description: "The site is now accessible to all users.",
      });
    }
  };

  const handleClearCache = () => {
    // Show confirmation dialog in a real app
    const confirm = window.confirm("Are you sure you want to clear the system cache?");
    if (confirm) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: "Cache cleared",
          description: "System cache has been successfully cleared.",
        });
      }, 1500);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newUserEmail || !newUserPassword) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please provide both email and password.",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // In a real implementation, this would connect to Supabase
      // For demonstration purposes, we're just updating the local state
      const newUser = {
        id: (users.length + 1).toString(),
        email: newUserEmail,
        role: newUserRole,
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setUsers([...users, newUser]);
      
      toast({
        title: "User created",
        description: `${newUserEmail} has been added with ${newUserRole} role.`,
      });
      
      // Clear form
      setNewUserEmail("");
      setNewUserPassword("");
      setNewUserRole("user");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to create user",
        description: error.message || "An error occurred while creating the user.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeleteUser = (id: string) => {
    // Show confirmation dialog
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (confirm) {
      // Filter out the deleted user
      setUsers(users.filter(user => user.id !== id));
      
      toast({
        title: "User deleted",
        description: "The user has been removed successfully.",
      });
    }
  };

  return (
    <DashboardLayout menuGroups={menuGroups} role="admin">
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Create and manage user accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <form onSubmit={handleCreateUser} className="space-y-4 border-b pb-6">
                  <h3 className="text-lg font-medium">Create New User</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="user-email">Email</Label>
                      <Input 
                        id="user-email" 
                        type="email" 
                        value={newUserEmail}
                        onChange={(e) => setNewUserEmail(e.target.value)}
                        placeholder="user@example.com" 
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="user-password">Password</Label>
                      <Input 
                        id="user-password" 
                        type="password" 
                        value={newUserPassword}
                        onChange={(e) => setNewUserPassword(e.target.value)}
                        placeholder="••••••••" 
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="user-role">Role</Label>
                      <Select 
                        value={newUserRole} 
                        onValueChange={(value) => setNewUserRole(value)}
                      >
                        <SelectTrigger id="user-role">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="user">Regular User</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button type="submit" className="mt-2" disabled={isLoading}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    {isLoading ? "Creating..." : "Create User"}
                  </Button>
                </form>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">Existing Users</h3>
                  <ScrollArea className="h-[300px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Created</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Badge variant={user.role === "admin" ? "default" : "outline"}>
                                {user.role}
                              </Badge>
                            </TableCell>
                            <TableCell>{user.createdAt}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteUser(user.id)}
                                disabled={user.email === "admin@flipssi.com"} // Prevent deleting main admin
                              >
                                Delete
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Key className="h-4 w-4 mr-1" />
                                Reset Password
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                  
                  <div className="mt-4 text-sm text-muted-foreground">
                    <p className="flex items-center">
                      <Badge className="mr-2 bg-primary">admin</Badge>
                      Admin users have full access to the admin dashboard and can manage all aspects of the system
                    </p>
                    <p className="flex items-center mt-2">
                      <Badge className="mr-2 bg-gray-200 text-gray-800">user</Badge>
                      Regular users can post listings, manage their account, and interact with the marketplace
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Authentication Settings</CardTitle>
              <CardDescription>
                Configure authentication options for your users
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="allow-signup">Allow Sign Up</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable or disable new user registrations
                  </p>
                </div>
                <Switch
                  id="allow-signup"
                  checked={allowRegistration}
                  onCheckedChange={setAllowRegistration}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-verification">Email Verification</Label>
                  <p className="text-sm text-muted-foreground">
                    Require email verification for new accounts
                  </p>
                </div>
                <Switch
                  id="email-verification"
                  checked={emailVerification}
                  onCheckedChange={setEmailVerification}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="social-login">Social Login</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow users to sign in with social accounts
                  </p>
                </div>
                <Switch
                  id="social-login"
                  checked={true}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Site Settings</CardTitle>
              <CardDescription>
                Configure basic settings for your marketplace
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="site-name">Site Name</Label>
                    <Input id="site-name" defaultValue="Flipssi Marketplace" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="site-url">Site URL</Label>
                    <Input id="site-url" defaultValue="https://flipssi.com" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="site-description">Site Description</Label>
                  <Textarea 
                    id="site-description" 
                    defaultValue="Flipssi is a modern marketplace for buying and selling goods and services."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input id="contact-email" type="email" defaultValue="support@flipssi.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">Eastern Time (EST)</SelectItem>
                      <SelectItem value="cst">Central Time (CST)</SelectItem>
                      <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                      <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Registration Settings</CardTitle>
              <CardDescription>
                Control how users can register on your site
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="allow-registration">Allow Registration</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable or disable new user registrations
                  </p>
                </div>
                <Switch
                  id="allow-registration"
                  checked={allowRegistration}
                  onCheckedChange={setAllowRegistration}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-verification">Email Verification</Label>
                  <p className="text-sm text-muted-foreground">
                    Require email verification for new accounts
                  </p>
                </div>
                <Switch
                  id="email-verification"
                  checked={emailVerification}
                  onCheckedChange={setEmailVerification}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex gap-4">
                    <Input id="primary-color" type="color" defaultValue="#0070f3" className="w-16 h-10" />
                    <Input type="text" defaultValue="#0070f3" className="w-32" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="theme-mode">Theme Mode</Label>
                  <Select defaultValue="light">
                    <SelectTrigger id="theme-mode">
                      <SelectValue placeholder="Select theme mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button>Save Theme Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Input id="session-timeout" type="number" defaultValue="60" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password-policy">Password Policy</Label>
                <Select defaultValue="strong">
                  <SelectTrigger id="password-policy">
                    <SelectValue placeholder="Select password policy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic (min 8 characters)</SelectItem>
                    <SelectItem value="medium">Medium (min 8 chars, 1 number, 1 uppercase)</SelectItem>
                    <SelectItem value="strong">Strong (min 10 chars, 1 number, 1 uppercase, 1 special char)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="2fa-required">Require 2FA for Admins</Label>
                  <p className="text-sm text-muted-foreground">
                    Force two-factor authentication for all admin accounts
                  </p>
                </div>
                <Switch
                  id="2fa-required"
                  defaultChecked={true}
                />
              </div>
              
              <Button>Save Security Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp-host">SMTP Host</Label>
                  <Input id="smtp-host" defaultValue="smtp.example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">SMTP Port</Label>
                  <Input id="smtp-port" defaultValue="587" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-username">SMTP Username</Label>
                  <Input id="smtp-username" defaultValue="user@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-password">SMTP Password</Label>
                  <Input id="smtp-password" type="password" defaultValue="password" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="from-email">From Email</Label>
                <Input id="from-email" defaultValue="no-reply@flipssi.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="from-name">From Name</Label>
                <Input id="from-name" defaultValue="Flipssi Marketplace" />
              </div>
              
              <Button>Save Email Settings</Button>
              <Button variant="outline" className="ml-2">Send Test Email</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="google-maps-api">Google Maps API Key</Label>
                <Input id="google-maps-api" defaultValue="AIzaSyB41DRUbKWJH_••••••••••••••••" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="stripe-api">Stripe API Key</Label>
                <Input id="stripe-api" defaultValue="sk_test_••••••••••••••••••••••••••" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mailchimp-api">Mailchimp API Key</Label>
                <Input id="mailchimp-api" defaultValue="••••••••••••••••••••••••••-us6" />
              </div>
              
              <Button>Save API Keys</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Put the site in maintenance mode
                  </p>
                </div>
                <Switch
                  id="maintenance-mode"
                  checked={maintenanceMode}
                  onCheckedChange={handleMaintenanceModeToggle}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="debug-mode">Debug Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable detailed error reporting
                  </p>
                </div>
                <Switch
                  id="debug-mode"
                  checked={debugMode}
                  onCheckedChange={setDebugMode}
                />
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-2">System Maintenance</h3>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    onClick={handleClearCache} 
                    disabled={isLoading}
                  >
                    Clear Cache
                  </Button>
                  <Button 
                    variant="outline" 
                    className="ml-2"
                  >
                    Optimize Database
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="ml-2"
                  >
                    Reset System
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default AdminSettings;
