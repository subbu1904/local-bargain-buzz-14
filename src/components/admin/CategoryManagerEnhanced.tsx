
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Plus, Edit, Trash2, AlertCircle } from "lucide-react";
import { categories, Category, Subcategory } from "@/data/categoryData";
import { toast } from "sonner";
import CategoryForm from "./CategoryForm";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const CategoryManagerEnhanced = () => {
  const [categoryList, setCategoryList] = useState(categories);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  const handleAddCategory = (newCategory: Omit<Category, 'icon'> & { iconName: string }) => {
    // This is a mock implementation as we can't directly import icons dynamically
    // In a real app, you would store icon name as a string and have a mapping function
    const mockIcon = categories[0].icon; // Using the first icon as a placeholder
    
    const categoryToAdd = {
      ...newCategory,
      icon: mockIcon
    } as Category;
    
    setCategoryList([...categoryList, categoryToAdd]);
    setIsAddDialogOpen(false);
    toast.success(`Category "${newCategory.name}" has been added`);
  };

  const handleEditCategory = (editedCategory: Omit<Category, 'icon'> & { iconName: string }) => {
    // This is a mock implementation
    const mockIcon = categories[0].icon;
    
    const updatedCategory = {
      ...editedCategory,
      icon: mockIcon
    } as Category;
    
    const updatedCategories = categoryList.map(cat => 
      cat.id === updatedCategory.id ? updatedCategory : cat
    );
    
    setCategoryList(updatedCategories);
    setIsEditDialogOpen(false);
    setCurrentCategory(null);
    toast.success(`Category "${editedCategory.name}" has been updated`);
  };

  const handleDeleteCategory = () => {
    if (currentCategory) {
      const updatedCategories = categoryList.filter(cat => cat.id !== currentCategory.id);
      setCategoryList(updatedCategories);
      setIsDeleteDialogOpen(false);
      setCurrentCategory(null);
      toast.success(`Category "${currentCategory.name}" has been deleted`);
    }
  };

  const openEditDialog = (category: Category) => {
    setCurrentCategory(category);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (category: Category) => {
    setCurrentCategory(category);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Categories</h2>
          <p className="text-muted-foreground">Manage listing categories and subcategories</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoryList.map((category) => (
          <Card key={category.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-md ${category.color}`}>
                    <category.icon className="h-5 w-5" />
                  </div>
                  <CardTitle>{category.name}</CardTitle>
                </div>
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => openEditDialog(category)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => openDeleteDialog(category)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
              <CardDescription className="text-xs text-gray-500">
                Slug: {category.slug} • {category.subcategories.length} subcategories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Separator className="my-2" />
              <div className="text-sm space-y-1">
                {category.subcategories.map((subcategory) => (
                  <div key={subcategory.id} className="flex items-center justify-between">
                    <span>{subcategory.name}</span>
                    <span className="text-xs text-gray-500">{subcategory.slug}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Category Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Create a new category with subcategories for listings
            </DialogDescription>
          </DialogHeader>
          <CategoryForm onSave={handleAddCategory} />
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Modify the selected category and its subcategories
            </DialogDescription>
          </DialogHeader>
          {currentCategory && (
            <CategoryForm existingCategory={currentCategory} onSave={handleEditCategory} />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Delete Category
            </AlertDialogTitle>
            <AlertDialogDescription>
              {currentCategory && (
                <>
                  Are you sure you want to delete the category "{currentCategory.name}"? 
                  This action cannot be undone and will also remove all {currentCategory.subcategories.length} subcategories.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDeleteCategory}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CategoryManagerEnhanced;
