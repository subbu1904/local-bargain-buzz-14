
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, CreditCard, Clock, RefreshCw } from "lucide-react";
import { userMenuGroups } from "@/data/userMenuData";

const UserPayments = () => {
  return (
    <DashboardLayout menuGroups={userMenuGroups} role="user">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Subscription & Payments</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-2 border-flipssi-purple">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <span>Current Plan</span>
                <span className="bg-flipssi-purple/20 text-flipssi-purple text-xs font-medium px-2 py-1 rounded-full">
                  Active
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-xl font-bold">Premium</h3>
                <p className="text-gray-500 text-sm">$9.99/month</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>Unlimited listings</span>
                </div>
                <div className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>Higher listing visibility</span>
                </div>
                <div className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>Priority support</span>
                </div>
                <div className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>Featured listings</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-gray-500" />
                <span>Renews on May 15, 2023</span>
              </div>
              
              <div className="pt-2 space-x-2">
                <Button variant="outline" size="sm">
                  Cancel
                </Button>
                <Button size="sm" className="bg-flipssi-purple hover:bg-purple-700">
                  Upgrade to Pro
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Payment Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-3 text-gray-500" />
                  <div>
                    <p className="font-medium">•••• •••• •••• 4242</p>
                    <p className="text-xs text-gray-500">Expires 12/2025</p>
                  </div>
                </div>
                <div className="bg-gray-100 px-2 py-1 rounded text-xs">
                  Default
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="w-full">
                Add Payment Method
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Billing History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { date: "Apr 1, 2023", amount: "$9.99", status: "Paid" },
                  { date: "Mar 1, 2023", amount: "$9.99", status: "Paid" },
                  { date: "Feb 1, 2023", amount: "$9.99", status: "Paid" },
                ].map((invoice, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium">{invoice.date}</p>
                      <p className="text-xs text-gray-500">Premium Plan</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{invoice.amount}</p>
                      <p className="text-xs text-green-600">{invoice.status}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-4 w-full text-gray-500 hover:text-gray-700"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                View All Transactions
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="border rounded-lg p-4">
                  <h3 className="font-bold">Free</h3>
                  <p className="text-2xl font-bold mt-1">$0</p>
                  <p className="text-sm text-gray-500 mb-4">per month</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Up to 5 listings</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Basic listing visibility</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full" disabled>
                    Current Plan
                  </Button>
                </div>
                
                <div className="border-2 border-flipssi-purple rounded-lg p-4 relative">
                  <div className="absolute -top-3 right-4 bg-flipssi-purple text-white px-2 py-0.5 text-xs font-bold rounded">
                    CURRENT
                  </div>
                  <h3 className="font-bold">Premium</h3>
                  <p className="text-2xl font-bold mt-1">$9.99</p>
                  <p className="text-sm text-gray-500 mb-4">per month</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Unlimited listings</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Higher listing visibility</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Featured listings</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full" disabled>
                    Current Plan
                  </Button>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-bold">Pro</h3>
                  <p className="text-2xl font-bold mt-1">$19.99</p>
                  <p className="text-sm text-gray-500 mb-4">per month</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Unlimited listings</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Maximum visibility</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Priority search results</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>24/7 VIP support</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-flipssi-purple hover:bg-purple-700">
                    Upgrade to Pro
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserPayments;
