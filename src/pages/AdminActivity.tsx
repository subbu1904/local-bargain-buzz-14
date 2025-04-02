
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  Settings, 
  BarChart4, 
  AlertTriangle,
  FileText,
  Eye,
  Trash,
  Check,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const AdminActivity = () => {
  const [activities, setActivities] = useState([
    { 
      id: 1, 
      type: 'login',
      user: 'admin@flipssi.com', 
      action: 'Logged in', 
      timestamp: new Date(2023, 10, 15, 10, 30), 
      ip: '192.168.1.1',
      status: 'success'
    },
    { 
      id: 2, 
      type: 'user',
      user: 'john.doe@example.com', 
      action: 'Updated profile', 
      timestamp: new Date(2023, 10, 15, 9, 45), 
      ip: '192.168.1.2',
      status: 'success'
    },
    { 
      id: 3, 
      type: 'listing',
      user: 'jane.smith@example.com', 
      action: 'Created new listing', 
      timestamp: new Date(2023, 10, 15, 9, 15), 
      ip: '192.168.1.3',
      status: 'success'
    },
    { 
      id: 4, 
      type: 'login',
      user: 'mark.wilson@example.com', 
      action: 'Failed login attempt', 
      timestamp: new Date(2023, 10, 15, 8, 30), 
      ip: '192.168.1.4',
      status: 'failed'
    },
    { 
      id: 5, 
      type: 'user',
      user: 'admin@flipssi.com', 
      action: 'Deleted user account', 
      timestamp: new Date(2023, 10, 14, 16, 20), 
      ip: '192.168.1.1',
      status: 'success'
    },
    { 
      id: 6, 
      type: 'listing',
      user: 'sarah.jones@example.com', 
      action: 'Updated listing', 
      timestamp: new Date(2023, 10, 14, 15, 10), 
      ip: '192.168.1.5',
      status: 'success'
    },
    { 
      id: 7, 
      type: 'listing',
      user: 'mike.brown@example.com', 
      action: 'Deleted listing', 
      timestamp: new Date(2023, 10, 14, 14, 45), 
      ip: '192.168.1.6',
      status: 'success'
    },
    { 
      id: 8, 
      type: 'login',
      user: 'laura.miller@example.com', 
      action: 'Logged in', 
      timestamp: new Date(2023, 10, 14, 14, 30), 
      ip: '192.168.1.7',
      status: 'success'
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

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleDelete = (id: number) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  const getStatusBadge = (status: string) => {
    if (status === 'success') {
      return <Badge className="bg-green-500">Success</Badge>;
    } else if (status === 'failed') {
      return <Badge className="bg-red-500">Failed</Badge>;
    } else {
      return <Badge className="bg-yellow-500">Pending</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'login':
        return <Users className="h-4 w-4 text-blue-500" />;
      case 'user':
        return <Users className="h-4 w-4 text-purple-500" />;
      case 'listing':
        return <ShoppingBag className="h-4 w-4 text-green-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <DashboardLayout menuGroups={menuGroups} role="admin">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Activity Monitoring</h1>
        <div className="flex items-center gap-2">
          <Input 
            type="text" 
            placeholder="Search activities..." 
            className="max-w-sm" 
          />
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Activities</SelectItem>
              <SelectItem value="login">Login Activities</SelectItem>
              <SelectItem value="user">User Activities</SelectItem>
              <SelectItem value="listing">Listing Activities</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Activity Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">User</th>
                  <th className="px-4 py-2 text-left">Action</th>
                  <th className="px-4 py-2 text-left">Timestamp</th>
                  <th className="px-4 py-2 text-left">IP Address</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">
                      <div className="flex items-center">
                        {getTypeIcon(activity.type)}
                        <span className="ml-2 capitalize">{activity.type}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2">{activity.user}</td>
                    <td className="px-4 py-2">{activity.action}</td>
                    <td className="px-4 py-2">{formatDate(activity.timestamp)}</td>
                    <td className="px-4 py-2">{activity.ip}</td>
                    <td className="px-4 py-2">{getStatusBadge(activity.status)}</td>
                    <td className="px-4 py-2 text-right">
                      <div className="flex justify-end space-x-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(activity.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Flagged Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-yellow-50">
                <div className="flex items-center gap-4">
                  <AlertTriangle className="h-8 w-8 text-yellow-500" />
                  <div>
                    <h3 className="font-medium">Multiple Failed Login Attempts</h3>
                    <p className="text-sm text-muted-foreground">IP: 203.0.113.42 - 5 failed attempts in the last hour</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Investigate</Button>
                  <Button size="sm" variant="outline">Block IP</Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg bg-red-50">
                <div className="flex items-center gap-4">
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                  <div>
                    <h3 className="font-medium">Suspicious Admin Actions</h3>
                    <p className="text-sm text-muted-foreground">User: mark.wilson@example.com - Attempted to access restricted area</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">View Details</Button>
                  <Button size="sm" variant="outline">Lock Account</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminActivity;
