
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Log } from "@/data/logData";
import { formatDate } from "@/utils/dateUtils";

interface LogTableProps {
  logs: Log[];
}

export const getLevelBadge = (level: string) => {
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

const LogTable = ({ logs }: LogTableProps) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>File</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell className="whitespace-nowrap">{formatDate(log.timestamp)}</TableCell>
              <TableCell>{getLevelBadge(log.level)}</TableCell>
              <TableCell>{log.source}</TableCell>
              <TableCell>{log.message}</TableCell>
              <TableCell className="text-xs text-gray-500">{log.file}:{log.line}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LogTable;
