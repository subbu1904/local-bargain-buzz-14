
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Pencil, 
  Plus, 
  Trash2, 
  FolderPlus, 
  ChevronRight 
} from "lucide-react";
import { categories, Category, Subcategory } from "@/data/categoryData";
import { useToast } from "@/hooks/use-toast";

const CategoryManager = () => {
  const [categoryData, setCategoryData] = useState<Category[]>([...categories]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isAddSubcategoryOpen, setIsAddSubcategoryOpen] = useState(false);
  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false);
  const [isEditSubcategoryOpen, setIsEditSubcategoryOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategorySlug, setNewCategorySlug] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState("bg-blue-100 text-blue-600");
  const [newSubcategoryName, setNewSubcategoryName] = useState("");
  const [newSubcategorySlug, setNewSubcategorySlug] = useState("");
  const { toast } = useToast();

  const colorOptions = [
    { value: "bg-blue-100 text-blue-600", label: "Blue" },
    { value: "bg-green-100 text-green-600", label: "Green" },
    { value: "bg-red-100 text-red-600", label: "Red" },
    { value: "bg-yellow-100 text-yellow-600", label: "Yellow" },
    { value: "bg-purple-100 text-purple-600", label: "Purple" },
    { value: "bg-pink-100 text-pink-600", label: "Pink" },
    { value: "bg-indigo-100 text-indigo-600", label: "Indigo" },
    { value: "bg-amber-100 text-amber-600", label: "Amber" },
    { value: "bg-orange-100 text-orange-600", label: "Orange" },
    { value: "bg-sky-100 text-sky-600", label: "Sky" },
  ];

  // Handler for adding a new category
  const handleAddCategory = () => {
    // In a real application, you would call an API to save to a database
    const newCategory: Partial<Category> = {
      id: `category-${Date.now()}`,
      name: newCategoryName,
      slug: newCategorySlug || newCategoryName.toLowerCase().replace(/\s+/g, '-'),
      color: newCategoryColor,
      subcategories: []
    };
    
    setCategoryData([...categoryData, newCategory as Category]);
    setIsAddCategoryOpen(false);
    setNewCategoryName("");
    setNewCategorySlug("");
    setNewCategoryColor("bg-blue-100 text-blue-600");
    
    toast({
      title: "Category Added",
      description: `${newCategoryName} has been added successfully.`
    });
  };

  // Handler for editing a category
  const handleEditCategory = () => {
    if (!selectedCategory) return;
    
    const updatedCategories = categoryData.map(cat => 
      cat.id === selectedCategory.id 
        ? { 
            ...cat, 
            name: newCategoryName || cat.name,
            slug: newCategorySlug || cat.slug,
            color: newCategoryColor || cat.color
          }
        : cat
    );
    
    setCategoryData(updatedCategories);
    setIsEditCategoryOpen(false);
    
    toast({
      title: "Category Updated",
      description: `Category has been updated successfully.`
    });
  };

  // Handler for deleting a category
  const handleDeleteCategory = (categoryId: string) => {
    setCategoryData(categoryData.filter(cat => cat.id !== categoryId));
    
    toast({
      title: "Category Deleted",
      description: "Category has been deleted successfully."
    });
  };

  // Handler for adding a subcategory
  const handleAddSubcategory = () => {
    if (!selectedCategory) return;
    
    const newSubcategory = {
      id: `${selectedCategory.id}-${Date.now()}`,
      name: newSubcategoryName,
      slug: newSubcategorySlug || newSubcategoryName.toLowerCase().replace(/\s+/g, '-')
    };
    
    const updatedCategories = categoryData.map(cat => 
      cat.id === selectedCategory.id 
        ? { 
            ...cat, 
            subcategories: [...cat.subcategories, newSubcategory]
          }
        : cat
    );
    
    setCategoryData(updatedCategories);
    setIsAddSubcategoryOpen(false);
    setNewSubcategoryName("");
    setNewSubcategorySlug("");
    
    toast({
      title: "Subcategory Added",
      description: `${newSubcategoryName} has been added to ${selectedCategory.name}.`
    });
  };

  // Handler for editing a subcategory
  const handleEditSubcategory = () => {
    if (!selectedCategory || !selectedSubcategory) return;
    
    const updatedCategories = categoryData.map(cat => 
      cat.id === selectedCategory.id 
        ? { 
            ...cat, 
            subcategories: cat.subcategories.map(subcat => 
              subcat.id === selectedSubcategory.id
                ? {
                    ...subcat,
                    name: newSubcategoryName || subcat.name,
                    slug: newSubcategorySlug || subcat.slug
                  }
                : subcat
            )
          }
        : cat
    );
    
    setCategoryData(updatedCategories);
    setIsEditSubcategoryOpen(false);
    
    toast({
      title: "Subcategory Updated",
      description: "Subcategory has been updated successfully."
    });
  };

  // Handler for deleting a subcategory
  const handleDeleteSubcategory = (categoryId: string, subcategoryId: string) => {
    const updatedCategories = categoryData.map(cat => 
      cat.id === categoryId 
        ? { 
            ...cat, 
            subcategories: cat.subcategories.filter(subcat => subcat.id !== subcategoryId)
          }
        : cat
    );
    
    setCategoryData(updatedCategories);
    
    toast({
      title: "Subcategory Deleted",
      description: "Subcategory has been deleted successfully."
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Category Management</h2>
        <Button onClick={() => setIsAddCategoryOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Subcategories</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categoryData.map((category) => (
            <TableRow key={category.id}>
              <TableCell>
                <div className="flex items-center">
                  <div className={`w-8 h-8 ${category.color} rounded-full flex items-center justify-center mr-3`}>
                    {category.icon && <category.icon size={16} />}
                  </div>
                  {category.name}
                </div>
              </TableCell>
              <TableCell>{category.slug}</TableCell>
              <TableCell>{category.subcategories.length}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsAddSubcategoryOpen(true);
                  }}
                >
                  <FolderPlus className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSelectedCategory(category);
                    setNewCategoryName(category.name);
                    setNewCategorySlug(category.slug);
                    setNewCategoryColor(category.color);
                    setIsEditCategoryOpen(true);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Subcategories</h3>
        {categoryData.map((category) => (
          <div key={`subcategories-${category.id}`} className="mb-6">
            <div className="flex items-center mb-2">
              <div className={`w-6 h-6 ${category.color} rounded-full flex items-center justify-center mr-2`}>
                {category.icon && <category.icon size={12} />}
              </div>
              <h4 className="text-lg font-semibold">{category.name}</h4>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {category.subcategories.map((subcategory) => (
                  <TableRow key={subcategory.id}>
                    <TableCell className="flex items-center">
                      <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                      {subcategory.name}
                    </TableCell>
                    <TableCell>{subcategory.slug}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedCategory(category);
                          setSelectedSubcategory(subcategory);
                          setNewSubcategoryName(subcategory.name);
                          setNewSubcategorySlug(subcategory.slug);
                          setIsEditSubcategoryOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteSubcategory(category.id, subcategory.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </div>

      {/* Add Category Dialog */}
      <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium leading-none">Name</label>
              <Input 
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Category name"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium leading-none">Slug (optional)</label>
              <Input 
                value={newCategorySlug}
                onChange={(e) => setNewCategorySlug(e.target.value)}
                placeholder="category-slug"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave empty to auto-generate from name
              </p>
            </div>
            <div>
              <label className="text-sm font-medium leading-none">Color</label>
              <Select 
                value={newCategoryColor}
                onValueChange={setNewCategoryColor}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select a color" />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((color) => (
                    <SelectItem key={color.value} value={color.value}>
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full ${color.value.split(' ')[0]}`} />
                        <span className="ml-2">{color.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline" 
              onClick={() => setIsAddCategoryOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddCategory}>Add Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={isEditCategoryOpen} onOpenChange={setIsEditCategoryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium leading-none">Name</label>
              <Input 
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium leading-none">Slug</label>
              <Input 
                value={newCategorySlug}
                onChange={(e) => setNewCategorySlug(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium leading-none">Color</label>
              <Select 
                value={newCategoryColor}
                onValueChange={setNewCategoryColor}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select a color" />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((color) => (
                    <SelectItem key={color.value} value={color.value}>
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full ${color.value.split(' ')[0]}`} />
                        <span className="ml-2">{color.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline" 
              onClick={() => setIsEditCategoryOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditCategory}>Update Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Subcategory Dialog */}
      <Dialog open={isAddSubcategoryOpen} onOpenChange={setIsAddSubcategoryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Subcategory</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium leading-none">Parent Category</label>
              <Input 
                value={selectedCategory?.name || ""}
                disabled
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium leading-none">Name</label>
              <Input 
                value={newSubcategoryName}
                onChange={(e) => setNewSubcategoryName(e.target.value)}
                placeholder="Subcategory name"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium leading-none">Slug (optional)</label>
              <Input 
                value={newSubcategorySlug}
                onChange={(e) => setNewSubcategorySlug(e.target.value)}
                placeholder="subcategory-slug"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave empty to auto-generate from name
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline" 
              onClick={() => setIsAddSubcategoryOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddSubcategory}>Add Subcategory</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Subcategory Dialog */}
      <Dialog open={isEditSubcategoryOpen} onOpenChange={setIsEditSubcategoryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Subcategory</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium leading-none">Parent Category</label>
              <Input 
                value={selectedCategory?.name || ""}
                disabled
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium leading-none">Name</label>
              <Input 
                value={newSubcategoryName}
                onChange={(e) => setNewSubcategoryName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium leading-none">Slug</label>
              <Input 
                value={newSubcategorySlug}
                onChange={(e) => setNewSubcategorySlug(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline" 
              onClick={() => setIsEditSubcategoryOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditSubcategory}>Update Subcategory</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryManager;
