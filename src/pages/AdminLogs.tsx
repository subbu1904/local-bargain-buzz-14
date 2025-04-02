
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { adminMenuGroups } from "@/data/adminMenuData";
import { errorLogs, infoLogs, warningLogs } from "@/data/logData";
import LogsHeader from "@/components/admin/LogsHeader";
import LogsSearch from "@/components/admin/LogsSearch";
import LogTabs from "@/components/admin/LogTabs";
import { useToast } from "@/hooks/use-toast";

const AdminLogs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeRange, setTimeRange] = useState("today");
  const { toast } = useToast();
  
  const allLogs = [...errorLogs, ...warningLogs, ...infoLogs];

  const handleRefresh = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Logs refreshed",
        description: "The system logs have been updated.",
      });
    }, 1000);
  };

  const handleDownloadLogs = () => {
    // In a real app, this would trigger a download of the logs
    toast({
      title: "Downloading logs",
      description: "Your log file is being prepared for download.",
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // In a real app, this would filter the logs based on the search query
  };

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
    // In a real app, this would fetch logs for the selected time range
  };

  return (
    <DashboardLayout menuGroups={adminMenuGroups} role="admin">
      <LogsHeader 
        isLoading={isLoading} 
        onRefresh={handleRefresh} 
        onDownload={handleDownloadLogs} 
      />
      
      <LogsSearch 
        onSearch={handleSearch} 
        onTimeRangeChange={handleTimeRangeChange} 
      />
      
      <LogTabs 
        allLogs={allLogs}
        errorLogs={errorLogs}
        warningLogs={warningLogs}
        infoLogs={infoLogs}
      />
    </DashboardLayout>
  );
};

export default AdminLogs;
