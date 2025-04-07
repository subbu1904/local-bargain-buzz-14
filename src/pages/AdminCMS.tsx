
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Layers, 
  Settings, 
  FileText, 
  MapPin 
} from "lucide-react";
import CategoryManager from "@/components/admin/CategoryManager";
import { Link } from "react-router-dom";

const AdminCMS = () => {
  const [activeTab, setActiveTab] = useState("categories");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link to="/admin">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">CMS Management</h1>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            <span>Categories</span>
          </TabsTrigger>
          <TabsTrigger value="locations" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Locations</span>
          </TabsTrigger>
          <TabsTrigger value="pages" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Pages</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>

        {/* Categories Tab */}
        <TabsContent value="categories" className="border rounded-lg">
          <CategoryManager />
        </TabsContent>

        {/* Locations Tab */}
        <TabsContent value="locations" className="border p-6 rounded-lg">
          <div className="text-center py-20">
            <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">Location Management</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              This feature will allow you to manage regions, cities, and 
              neighborhoods to organize listings by location.
            </p>
          </div>
        </TabsContent>

        {/* Pages Tab */}
        <TabsContent value="pages" className="border p-6 rounded-lg">
          <div className="text-center py-20">
            <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">Content Pages</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Create and manage static pages such as About Us, Terms of Service, 
              Privacy Policy, and more.
            </p>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="border p-6 rounded-lg">
          <div className="text-center py-20">
            <Settings className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">CMS Settings</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Configure your content management system settings, including SEO defaults,
              content approval workflows, and user permissions.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminCMS;
