
import DashboardLayout from "@/components/DashboardLayout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Heart, 
  MessageCircle, 
  User, 
  CreditCard,
  Bell,
  Plus,
  Trash2,
  CreditCard as CardIcon
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface PaymentMethod {
  id: string;
  type: "card" | "paypal";
  name: string;
  last4?: string;
  expiryDate?: string;
  isDefault: boolean;
}

const UserPayments = () => {
  const { toast } = useToast();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "card",
      name: "Visa ending in 4242",
      last4: "4242",
      expiryDate: "04/25",
      isDefault: true,
    },
    {
      id: "2",
      type: "card",
      name: "Mastercard ending in 5555",
      last4: "5555",
      expiryDate: "08/24",
      isDefault: false,
    },
    {
      id: "3",
      type: "paypal",
      name: "PayPal - sarah@example.com",
      isDefault: false,
    },
  ]);
  
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    name: "",
    expiry: "",
    cvc: "",
  });

  const menuGroups = [
    {
      title: "Account",
      items: [
        {
          title: "Dashboard",
          path: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "My Listings",
          path: "/dashboard/listings",
          icon: ShoppingBag,
        },
        {
          title: "Favorites",
          path: "/dashboard/favorites",
          icon: Heart,
        },
        {
          title: "Messages",
          path: "/dashboard/messages",
          icon: MessageCircle,
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Profile",
          path: "/dashboard/profile",
          icon: User,
        },
        {
          title: "Payments",
          path: "/dashboard/payments",
          icon: CreditCard,
        },
        {
          title: "Notifications",
          path: "/dashboard/notifications",
          icon: Bell,
        },
      ],
    },
  ];

  const setDefaultPaymentMethod = (id: string) => {
    setPaymentMethods(methods => 
      methods.map(method => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
    toast({
      title: "Default payment method updated",
      description: "Your default payment method has been updated.",
    });
  };

  const deletePaymentMethod = () => {
    if (selectedMethod) {
      const isDefault = paymentMethods.find(m => m.id === selectedMethod)?.isDefault;
      
      setPaymentMethods(methods => {
        const filtered = methods.filter(method => method.id !== selectedMethod);
        
        // If we deleted the default method, set a new default if possible
        if (isDefault && filtered.length > 0) {
          filtered[0].isDefault = true;
        }
        
        return filtered;
      });
      
      toast({
        title: "Payment method removed",
        description: "Your payment method has been successfully removed.",
      });
      
      setShowDeleteDialog(false);
      setSelectedMethod(null);
    }
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!newCard.cardNumber || !newCard.name || !newCard.expiry || !newCard.cvc) {
      toast({
        variant: "destructive",
        title: "Form incomplete",
        description: "Please fill out all fields.",
      });
      return;
    }
    
    // In a real app you'd send this to your payment processor
    const last4 = newCard.cardNumber.slice(-4);
    
    const newPaymentMethod: PaymentMethod = {
      id: `${Date.now()}`,
      type: "card",
      name: `Card ending in ${last4}`,
      last4,
      expiryDate: newCard.expiry,
      isDefault: paymentMethods.length === 0,
    };
    
    setPaymentMethods([...paymentMethods, newPaymentMethod]);
    
    toast({
      title: "Payment method added",
      description: "Your new payment method has been added.",
    });
    
    // Reset form
    setNewCard({
      cardNumber: "",
      name: "",
      expiry: "",
      cvc: "",
    });
    
    setIsDialogOpen(false);
  };

  return (
    <DashboardLayout menuGroups={menuGroups} role="user">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Payment Methods</h1>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-flipssi-purple text-white hover:bg-purple-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Payment Method
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Payment Method</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddCard}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="•••• •••• •••• ••••"
                    value={newCard.cardNumber}
                    onChange={(e) => setNewCard({...newCard, cardNumber: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Name on Card</Label>
                  <Input
                    id="name"
                    placeholder="John Smith"
                    value={newCard.name}
                    onChange={(e) => setNewCard({...newCard, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={newCard.expiry}
                      onChange={(e) => setNewCard({...newCard, expiry: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input
                      id="cvc"
                      placeholder="•••"
                      type="password"
                      maxLength={4}
                      value={newCard.cvc}
                      onChange={(e) => setNewCard({...newCard, cvc: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit" className="bg-flipssi-green text-white hover:bg-green-500">
                  Add Card
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {paymentMethods.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow">
          <CardIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No payment methods</h3>
          <p className="text-gray-500 mb-4">
            You haven't added any payment methods yet.
          </p>
          <Button 
            className="bg-flipssi-purple text-white hover:bg-purple-700"
            onClick={() => setIsDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Payment Method
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {paymentMethods.map((method) => (
            <Card key={method.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{method.type === "card" ? "Credit Card" : "PayPal"}</CardTitle>
                    <CardDescription>{method.name}</CardDescription>
                  </div>
                  {method.type === "card" && (
                    <div className="bg-white p-2 rounded">
                      {method.last4?.startsWith("4") ? (
                        <svg className="h-6 w-auto" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="32" height="32" rx="4" fill="#0A56A3"/>
                          <path d="M11.5 16H20.5M8 12.5H24M8 19.5H24" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      ) : (
                        <svg className="h-6 w-auto" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="32" height="32" rx="4" fill="#EB001B"/>
                          <circle cx="12" cy="16" r="5" fill="#FF5F00"/>
                          <circle cx="20" cy="16" r="5" fill="#F79E1B"/>
                        </svg>
                      )}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {method.type === "card" && (
                  <div className="text-sm text-gray-500">
                    Expires {method.expiryDate}
                  </div>
                )}
                {method.isDefault && (
                  <div className="mt-2">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Default
                    </span>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                {!method.isDefault && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setDefaultPaymentMethod(method.id)}
                  >
                    Set as default
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => {
                    setSelectedMethod(method.id);
                    setShowDeleteDialog(true);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Payment Method</DialogTitle>
          </DialogHeader>
          <p className="py-4">Are you sure you want to remove this payment method? This action cannot be undone.</p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={deletePaymentMethod}
            >
              Remove
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default UserPayments;
