
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
  Download,
  RefreshCw,
  Search,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminLogs = () => {
  const [isLoading, setIsLoading] = useState(false);
  
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

  const errorLogs = [
    { 
      id: 1, 
      level: 'error', 
      message: 'Failed to connect to database', 
      timestamp: new Date(2023, 10, 15, 10, 30, 15), 
      source: 'DB Service',
      file: 'src/services/database.ts',
      line: 42
    },
    { 
      id: 2, 
      level: 'error', 
      message: 'Payment processing failed', 
      timestamp: new Date(2023, 10, 15, 9, 45, 22), 
      source: 'Payment Gateway',
      file: 'src/services/payments.ts',
      line: 128
    },
    { 
      id: 3, 
      level: 'error', 
      message: 'Failed to upload image: file too large', 
      timestamp: new Date(2023, 10, 15, 8, 30, 45), 
      source: 'Storage Service',
      file: 'src/services/storage.ts',
      line: 87
    },
  ];

  const infoLogs = [
    { 
      id: 1, 
      level: 'info', 
      message: 'New user registered: john.doe@example.com', 
      timestamp: new Date(2023, 10, 15, 12, 10, 5), 
      source: 'Auth Service',
      file: 'src/services/auth.ts',
      line: 255
    },
    { 
      id: 2, 
      level: 'info', 
      message: 'Listing #1234 created by user #567', 
      timestamp: new Date(2023, 10, 15, 11, 45, 30), 
      source: 'Listing Service',
      file: 'src/services/listings.ts',
      line: 189
    },
    { 
      id: 3, 
      level: 'info', 
      message: 'Payment processed for order #8901', 
      timestamp: new Date(2023, 10, 15, 11, 30, 18), 
      source: 'Payment Service',
      file: 'src/services/payments.ts',
      line: 312
    },
    { 
      id: 4, 
      level: 'info', 
      message: 'Email sent to user@example.com', 
      timestamp: new Date(2023, 10, 15, 11, 15, 42), 
      source: 'Email Service',
      file: 'src/services/email.ts',
      line: 156
    },
    { 
      id: 5, 
      level: 'info', 
      message: 'Daily backup completed successfully', 
      timestamp: new Date(2023, 10, 15, 3, 0, 7), 
      source: 'Backup Service',
      file: 'src/services/backup.ts',
      line: 78
    },
  ];

  const warningLogs = [
    { 
      id: 1, 
      level: 'warning', 
      message: 'High CPU usage detected: 85%', 
      timestamp: new Date(2023, 10, 15, 14, 20, 10), 
      source: 'Monitoring Service',
      file: 'src/services/monitoring.ts',
      line: 145
    },
    { 
      id: 2, 
      level: 'warning', 
      message: 'Rate limit approaching for API key: xxxxx', 
      timestamp: new Date(2023, 10, 15, 13, 55, 23), 
      source: 'API Gateway',
      file: 'src/services/api.ts',
      line: 267
    },
    { 
      id: 3, 
      level: 'warning', 
      message: 'Deprecated function used: oldFunction()', 
      timestamp: new Date(2023, 10, 15, 13, 40, 15), 
      source: 'Core Service',
      file: 'src/services/core.ts',
      line: 341
    },
  ];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleDownloadLogs = () => {
    // In a real app, this would trigger a download of the logs
    alert('Downloading logs...');
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'error':
        return <Badge className="bg-red-500">Error</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-500">Warning</Badge>;
      case 'info':
        return <Badge className="bg-blue-500">Info</Badge>;
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>;
    }
  };

  return (
    <DashboardLayout menuGroups={menuGroups} role="admin">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">System Logs</h1>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleDownloadLogs}
          >
            <Download className="h-4 w-4 mr-2" />
            Download Logs
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search logs..." 
              className="pl-8"
            />
          </div>
          <Button variant="ghost" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
        <Select defaultValue="today">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="yesterday">Yesterday</SelectItem>
            <SelectItem value="last7days">Last 7 Days</SelectItem>
            <SelectItem value="last30days">Last 30 Days</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Logs</TabsTrigger>
          <TabsTrigger value="errors" className="text-red-500">Errors</TabsTrigger>
          <TabsTrigger value="warnings" className="text-yellow-500">Warnings</TabsTrigger>
          <TabsTrigger value="info" className="text-blue-500">Info</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All System Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <LogTable logs={[...errorLogs, ...warningLogs, ...infoLogs]} formatDate={formatDate} getLevelBadge={getLevelBadge} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="errors">
          <Card>
            <CardHeader>
              <CardTitle>Error Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <LogTable logs={errorLogs} formatDate={formatDate} getLevelBadge={getLevelBadge} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="warnings">
          <Card>
            <CardHeader>
              <CardTitle>Warning Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <LogTable logs={warningLogs} formatDate={formatDate} getLevelBadge={getLevelBadge} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>Info Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <LogTable logs={infoLogs} formatDate={formatDate} getLevelBadge={getLevelBadge} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

interface Log {
  id: number;
  level: string;
  message: string;
  timestamp: Date;
  source: string;
  file: string;
  line: number;
}

interface LogTableProps {
  logs: Log[];
  formatDate: (date: Date) => string;
  getLevelBadge: (level: string) => JSX.Element;
}

const LogTable = ({ logs, formatDate, getLevelBadge }: LogTableProps) => {
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="border-b">
          <th className="px-4 py-2 text-left">Time</th>
          <th className="px-4 py-2 text-left">Level</th>
          <th className="px-4 py-2 text-left">Source</th>
          <th className="px-4 py-2 text-left">Message</th>
          <th className="px-4 py-2 text-left">File</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => (
          <tr key={log.id} className="border-b hover:bg-gray-50">
            <td className="px-4 py-2 whitespace-nowrap">{formatDate(log.timestamp)}</td>
            <td className="px-4 py-2">{getLevelBadge(log.level)}</td>
            <td className="px-4 py-2">{log.source}</td>
            <td className="px-4 py-2">{log.message}</td>
            <td className="px-4 py-2 text-xs text-gray-500">{log.file}:{log.line}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminLogs;
