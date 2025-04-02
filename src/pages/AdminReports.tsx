
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  Settings, 
  BarChart4, 
  AlertTriangle,
  FileText
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AdminReports = () => {
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

  const userRegistrationData = [
    { name: "Jan", count: 45 },
    { name: "Feb", count: 62 },
    { name: "Mar", count: 78 },
    { name: "Apr", count: 56 },
    { name: "May", count: 89 },
    { name: "Jun", count: 120 },
    { name: "Jul", count: 110 },
    { name: "Aug", count: 145 },
    { name: "Sep", count: 132 },
    { name: "Oct", count: 167 },
    { name: "Nov", count: 182 },
    { name: "Dec", count: 210 },
  ];

  const listingCategoryData = [
    { name: "Electronics", count: 325 },
    { name: "Clothing", count: 457 },
    { name: "Home", count: 246 },
    { name: "Sports", count: 189 },
    { name: "Toys", count: 135 },
    { name: "Automotive", count: 97 },
  ];

  const revenueData = [
    { name: "Jan", revenue: 8500 },
    { name: "Feb", revenue: 9200 },
    { name: "Mar", revenue: 10500 },
    { name: "Apr", revenue: 9800 },
    { name: "May", revenue: 11500 },
    { name: "Jun", revenue: 13200 },
    { name: "Jul", revenue: 12500 },
    { name: "Aug", revenue: 14500 },
    { name: "Sep", revenue: 13800 },
    { name: "Oct", revenue: 15700 },
    { name: "Nov", revenue: 16200 },
    { name: "Dec", revenue: 18500 },
  ];

  return (
    <DashboardLayout menuGroups={menuGroups} role="admin">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Analytics Reports</h1>
        <div className="flex items-center gap-2">
          <Select defaultValue="last12Months">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last30Days">Last 30 Days</SelectItem>
              <SelectItem value="last3Months">Last 3 Months</SelectItem>
              <SelectItem value="last6Months">Last 6 Months</SelectItem>
              <SelectItem value="last12Months">Last 12 Months</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="listings">Listings</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,345</div>
                <p className="text-xs text-muted-foreground">
                  +15% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Listings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8,721</div>
                <p className="text-xs text-muted-foreground">
                  +3% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$143,245</div>
                <p className="text-xs text-muted-foreground">
                  +8% from last month
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userRegistrationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" name="New Users" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="listings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Listings by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={listingCategoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#82ca9d" name="Listings" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#8884d8" 
                      name="Revenue ($)" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default AdminReports;
