
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
  MapPin,
  Image,
  Globe,
  Tags,
  Mail,
  Plus
} from "lucide-react";
import CategoryManagerEnhanced from "@/components/admin/CategoryManagerEnhanced";
import { Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const AdminCMSEnhanced = () => {
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
        <Button>Save Changes</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 md:grid-cols-8">
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
          <TabsTrigger value="media" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            <span>Media</span>
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>SEO</span>
          </TabsTrigger>
          <TabsTrigger value="tags" className="flex items-center gap-2">
            <Tags className="h-4 w-4" />
            <span>Tags</span>
          </TabsTrigger>
          <TabsTrigger value="emails" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>Email Templates</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>

        {/* Categories Tab */}
        <TabsContent value="categories" className="border rounded-lg">
          <CategoryManagerEnhanced />
        </TabsContent>

        {/* Locations Tab */}
        <TabsContent value="locations" className="border p-6 rounded-lg">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Locations</h2>
              <p className="text-muted-foreground">Manage regions, cities, and neighborhoods</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Countries</CardTitle>
                  <CardDescription>Manage available countries for listings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm">5 countries active</p>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" /> Add Country
                    </Button>
                  </div>
                  <Separator className="my-2" />
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center justify-between py-1">
                      <span>United States</span>
                      <span className="text-xs text-green-600">Active</span>
                    </li>
                    <li className="flex items-center justify-between py-1">
                      <span>Canada</span>
                      <span className="text-xs text-green-600">Active</span>
                    </li>
                    <li className="flex items-center justify-between py-1">
                      <span>United Kingdom</span>
                      <span className="text-xs text-green-600">Active</span>
                    </li>
                    <li className="flex items-center justify-between py-1">
                      <span>Australia</span>
                      <span className="text-xs text-green-600">Active</span>
                    </li>
                    <li className="flex items-center justify-between py-1">
                      <span>Germany</span>
                      <span className="text-xs text-green-600">Active</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Regions</CardTitle>
                  <CardDescription>States, provinces, or regions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm">50+ regions configured</p>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" /> Add Region
                    </Button>
                  </div>
                  <Separator className="my-2" />
                  <p className="text-sm text-muted-foreground">Select a country to view or manage its regions</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Cities</CardTitle>
                  <CardDescription>Cities and local areas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm">100+ cities configured</p>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" /> Add City
                    </Button>
                  </div>
                  <Separator className="my-2" />
                  <p className="text-sm text-muted-foreground">Select a region to view or manage its cities</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Pages Tab */}
        <TabsContent value="pages" className="border p-6 rounded-lg">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Content Pages</h2>
                <p className="text-muted-foreground">Manage static pages and content</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Add Page
              </Button>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr className="text-left">
                    <th className="p-3 font-medium">Page Title</th>
                    <th className="p-3 font-medium">URL</th>
                    <th className="p-3 font-medium">Last Updated</th>
                    <th className="p-3 font-medium">Status</th>
                    <th className="p-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-3">About Us</td>
                    <td className="p-3 text-sm text-muted-foreground">/about</td>
                    <td className="p-3 text-sm">April 2, 2025</td>
                    <td className="p-3"><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Published</span></td>
                    <td className="p-3 text-right"><Button variant="ghost" size="sm">Edit</Button></td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3">Terms of Service</td>
                    <td className="p-3 text-sm text-muted-foreground">/terms</td>
                    <td className="p-3 text-sm">March 25, 2025</td>
                    <td className="p-3"><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Published</span></td>
                    <td className="p-3 text-right"><Button variant="ghost" size="sm">Edit</Button></td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3">Privacy Policy</td>
                    <td className="p-3 text-sm text-muted-foreground">/privacy</td>
                    <td className="p-3 text-sm">March 25, 2025</td>
                    <td className="p-3"><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Published</span></td>
                    <td className="p-3 text-right"><Button variant="ghost" size="sm">Edit</Button></td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3">Contact Us</td>
                    <td className="p-3 text-sm text-muted-foreground">/contact</td>
                    <td className="p-3 text-sm">March 20, 2025</td>
                    <td className="p-3"><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Published</span></td>
                    <td className="p-3 text-right"><Button variant="ghost" size="sm">Edit</Button></td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3">FAQ</td>
                    <td className="p-3 text-sm text-muted-foreground">/faq</td>
                    <td className="p-3 text-sm">March 15, 2025</td>
                    <td className="p-3"><span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Draft</span></td>
                    <td className="p-3 text-right"><Button variant="ghost" size="sm">Edit</Button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Media Tab */}
        <TabsContent value="media" className="border p-6 rounded-lg">
          <div className="text-center py-20">
            <Image className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">Media Library</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Upload and manage images, videos, and documents for your listings and content.
            </p>
            <Button className="mt-4">
              <Plus className="h-4 w-4 mr-2" /> Upload Files
            </Button>
          </div>
        </TabsContent>
        
        {/* SEO Tab */}
        <TabsContent value="seo" className="border p-6 rounded-lg">
          <div className="text-center py-20">
            <Globe className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">SEO Settings</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Configure SEO settings, meta tags, sitemaps, and other optimization tools for better search engine visibility.
            </p>
            <Button className="mt-4">Configure SEO</Button>
          </div>
        </TabsContent>
        
        {/* Tags Tab */}
        <TabsContent value="tags" className="border p-6 rounded-lg">
          <div className="text-center py-20">
            <Tags className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">Tags Management</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Create and manage tags for categorizing and filtering listings across the marketplace.
            </p>
            <Button className="mt-4">Manage Tags</Button>
          </div>
        </TabsContent>
        
        {/* Email Templates Tab */}
        <TabsContent value="emails" className="border p-6 rounded-lg">
          <div className="text-center py-20">
            <Mail className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">Email Templates</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Customize email templates for notifications, welcome messages, and other system communications.
            </p>
            <Button className="mt-4">Edit Templates</Button>
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
            <Button className="mt-4">Manage Settings</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminCMSEnhanced;
