
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { adminMenuGroups } from "@/data/adminMenuData";

const AdminDashboard = () => {
  return (
    <DashboardLayout menuGroups={adminMenuGroups} role="admin">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2,345</div>
            <p className="text-xs text-muted-foreground mt-1">
              +15% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Active Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8,721</div>
            <p className="text-xs text-muted-foreground mt-1">
              +3% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">143</div>
            <p className="text-xs text-muted-foreground mt-1">
              -8% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4 border-b pb-4 last:border-0">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <Users className="h-5 w-5 text-gray-700" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">New user registered</p>
                    <p className="text-sm text-muted-foreground">John Smith created a new account</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    10 minutes ago
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
