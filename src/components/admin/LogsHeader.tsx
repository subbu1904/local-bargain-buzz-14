
import { Button } from "@/components/ui/button";
import { RefreshCw, Download } from "lucide-react";

interface LogsHeaderProps {
  isLoading: boolean;
  onRefresh: () => void;
  onDownload: () => void;
}

const LogsHeader = ({ isLoading, onRefresh, onDownload }: LogsHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">System Logs</h1>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRefresh}
          disabled={isLoading}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onDownload}
        >
          <Download className="h-4 w-4 mr-2" />
          Download Logs
        </Button>
      </div>
    </div>
  );
};

export default LogsHeader;
