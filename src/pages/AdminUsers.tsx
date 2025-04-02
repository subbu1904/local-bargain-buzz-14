
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
  UserPlus,
  Filter,
  MoreHorizontal,
  Ban,
  ShieldCheck,
  UserX,
  User
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

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: "active" | "suspended" | "pending";
  role: "user" | "admin";
  createdAt: Date;
  listings: number;
  lastActive: Date;
}

const AdminUsers = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [showSuspendDialog, setShowSuspendDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showPromoteDialog, setShowPromoteDialog] = useState(false);
  
  const [users, setUsers] = useState<UserData[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      avatar: "https://i.pravatar.cc/150?img=1",
      status: "active",
      role: "user",
      createdAt: new Date(2023, 2, 15),
      listings: 8,
      lastActive: new Date(2023, 5, 20),
    },
    {
      id: "2",
      name: "Emily Johnson",
      email: "emily@example.com",
      avatar: "https://i.pravatar.cc/150?img=5",
      status: "active",
      role: "user",
      createdAt: new Date(2023, 4, 10),
      listings: 4,
      lastActive: new Date(2023, 5, 19),
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael@example.com",
      avatar: "https://i.pravatar.cc/150?img=8",
      status: "suspended",
      role: "user",
      createdAt: new Date(2023, 1, 22),
      listings: 12,
      lastActive: new Date(2023, 5, 1),
    },
    {
      id: "4",
      name: "Sarah Williams",
      email: "sarah@example.com",
      avatar: "https://i.pravatar.cc/150?img=9",
      status: "active",
      role: "admin",
      createdAt: new Date(2022, 11, 5),
      listings: 0,
      lastActive: new Date(2023, 5, 21),
    },
    {
      id: "5",
      name: "David Miller",
      email: "david@example.com",
      avatar: "https://i.pravatar.cc/150?img=3",
      status: "pending",
      role: "user",
      createdAt: new Date(2023, 5, 18),
      listings: 0,
      lastActive: new Date(2023, 5, 18),
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

  const handleSuspendUser = () => {
    if (selectedUser) {
      setUsers(users.map(user => 
        user.id === selectedUser 
          ? { ...user, status: user.status === "suspended" ? "active" : "suspended" }
          : user
      ));
      
      const user = users.find(u => u.id === selectedUser);
      const newStatus = user?.status === "suspended" ? "active" : "suspended";
      
      toast({
        title: `User ${newStatus === "suspended" ? "suspended" : "reactivated"}`,
        description: `${user?.name} has been ${newStatus === "suspended" ? "suspended" : "reactivated"}.`,
      });
      
      setShowSuspendDialog(false);
      setSelectedUser(null);
    }
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      const user = users.find(u => u.id === selectedUser);
      
      setUsers(users.filter(user => user.id !== selectedUser));
      
      toast({
        title: "User deleted",
        description: `${user?.name} has been deleted from the system.`,
      });
      
      setShowDeleteDialog(false);
      setSelectedUser(null);
    }
  };

  const handlePromoteUser = () => {
    if (selectedUser) {
      const user = users.find(u => u.id === selectedUser);
      const newRole = user?.role === "user" ? "admin" : "user";
      
      setUsers(users.map(user => 
        user.id === selectedUser 
          ? { ...user, role: newRole as "user" | "admin" }
          : user
      ));
      
      toast({
        title: `User ${newRole === "admin" ? "promoted" : "demoted"}`,
        description: `${user?.name} has been ${newRole === "admin" ? "promoted to admin" : "demoted to user"}.`,
      });
      
      setShowPromoteDialog(false);
      setSelectedUser(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>;
      case "pending":
        return <Badge variant="outline" className="border-amber-500 text-amber-500">Pending</Badge>;
      default:
        return null;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-flipssi-purple">Admin</Badge>;
      case "user":
        return <Badge variant="outline">User</Badge>;
      default:
        return null;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  return (
    <DashboardLayout menuGroups={menuGroups} role="admin">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">User Management</h1>
        
        <Button className="bg-flipssi-purple text-white hover:bg-purple-700">
          <UserPlus className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search users..."
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
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-40">
              <Select
                value={roleFilter}
                onValueChange={setRoleFilter}
              >
                <SelectTrigger>
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <span>Role</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
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
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Listings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <Avatar>
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.createdAt.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.listings}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastActive.toLocaleDateString()}
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
                          <DropdownMenuItem onClick={() => console.log('View', user.id)}>
                            <User className="mr-2 h-4 w-4" />
                            <span>View Profile</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => {
                              setSelectedUser(user.id);
                              setShowSuspendDialog(true);
                            }}
                          >
                            <Ban className="mr-2 h-4 w-4" />
                            <span>{user.status === "suspended" ? "Reactivate" : "Suspend"}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => {
                              setSelectedUser(user.id);
                              setShowPromoteDialog(true);
                            }}
                          >
                            <ShieldCheck className="mr-2 h-4 w-4" />
                            <span>{user.role === "admin" ? "Remove Admin" : "Make Admin"}</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-500 focus:text-red-500"
                            onClick={() => {
                              setSelectedUser(user.id);
                              setShowDeleteDialog(true);
                            }}
                          >
                            <UserX className="mr-2 h-4 w-4" />
                            <span>Delete User</span>
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
      
      {/* Suspend User Dialog */}
      <Dialog open={showSuspendDialog} onOpenChange={setShowSuspendDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {users.find(u => u.id === selectedUser)?.status === "suspended"
                ? "Reactivate User"
                : "Suspend User"
              }
            </DialogTitle>
          </DialogHeader>
          <p className="py-4">
            {users.find(u => u.id === selectedUser)?.status === "suspended"
              ? "Are you sure you want to reactivate this user? They will regain access to their account."
              : "Are you sure you want to suspend this user? They will lose access to their account."
            }
          </p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowSuspendDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant={users.find(u => u.id === selectedUser)?.status === "suspended" ? "default" : "destructive"}
              onClick={handleSuspendUser}
            >
              {users.find(u => u.id === selectedUser)?.status === "suspended"
                ? "Reactivate"
                : "Suspend"
              }
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Delete User Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
          </DialogHeader>
          <p className="py-4">
            Are you sure you want to delete this user? This action cannot be undone and will remove all their data from the system.
          </p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteUser}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Promote User Dialog */}
      <Dialog open={showPromoteDialog} onOpenChange={setShowPromoteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {users.find(u => u.id === selectedUser)?.role === "admin"
                ? "Remove Admin Role"
                : "Make User Admin"
              }
            </DialogTitle>
          </DialogHeader>
          <p className="py-4">
            {users.find(u => u.id === selectedUser)?.role === "admin"
              ? "Are you sure you want to remove admin privileges from this user?"
              : "Are you sure you want to give this user admin privileges? They will have access to the admin dashboard and all management functions."
            }
          </p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowPromoteDialog(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-flipssi-purple text-white hover:bg-purple-700"
              onClick={handlePromoteUser}
            >
              {users.find(u => u.id === selectedUser)?.role === "admin"
                ? "Remove Admin"
                : "Make Admin"
              }
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AdminUsers;
