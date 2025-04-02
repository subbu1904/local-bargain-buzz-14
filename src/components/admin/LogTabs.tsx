
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Log } from "@/data/logData";
import LogTable from "./LogTable";

interface LogTabsProps {
  allLogs: Log[];
  errorLogs: Log[];
  warningLogs: Log[];
  infoLogs: Log[];
}

const LogTabs = ({ allLogs, errorLogs, warningLogs, infoLogs }: LogTabsProps) => {
  return (
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
            <LogTable logs={allLogs} />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="errors">
        <Card>
          <CardHeader>
            <CardTitle>Error Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <LogTable logs={errorLogs} />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="warnings">
        <Card>
          <CardHeader>
            <CardTitle>Warning Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <LogTable logs={warningLogs} />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="info">
        <Card>
          <CardHeader>
            <CardTitle>Info Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <LogTable logs={infoLogs} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default LogTabs;
