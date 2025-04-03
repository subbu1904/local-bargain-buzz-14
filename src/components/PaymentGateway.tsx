
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";

const paymentSchema = z.object({
  amount: z.string().min(1, { message: "Amount is required" }),
  currency: z.string().min(1, { message: "Currency is required" }),
  paymentGateway: z.string().min(1, { message: "Payment gateway is required" }),
});

type PaymentGateway = {
  id: string;
  name: string;
  enabled: boolean;
};

interface PaymentGatewayProps {
  customerInfo?: {
    name: string;
    email: string;
    phone: string;
  };
}

const PaymentGateway = ({ customerInfo }: PaymentGatewayProps) => {
  const [sandboxMode, setSandboxMode] = useState(true);
  const [paymentGateways, setPaymentGateways] = useState<PaymentGateway[]>([
    { id: "paytm", name: "Paytm", enabled: true },
    { id: "stripe", name: "Stripe", enabled: false },
    { id: "paypal", name: "PayPal", enabled: false },
  ]);
  const [selectedGateway, setSelectedGateway] = useState("paytm");
  const [paytmConfig, setPaytmConfig] = useState({
    merchantId: sandboxMode ? "TEST_MERCHANT_ID" : "",
    merchantKey: sandboxMode ? "TEST_MERCHANT_KEY" : "",
    website: sandboxMode ? "WEBSTAGING" : "DEFAULT",
  });

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      amount: "100",
      currency: "INR",
      paymentGateway: "paytm",
    },
  });

  const handleToggleGateway = (id: string, enabled: boolean) => {
    setPaymentGateways(
      paymentGateways.map((gateway) =>
        gateway.id === id ? { ...gateway, enabled } : gateway
      )
    );
    
    // If disabling the currently selected gateway, switch to the first enabled one
    if (id === selectedGateway && !enabled) {
      const nextEnabled = paymentGateways.find(g => g.id !== id && g.enabled);
      if (nextEnabled) {
        setSelectedGateway(nextEnabled.id);
        form.setValue("paymentGateway", nextEnabled.id);
      }
    }
  };

  const handleToggleSandbox = (checked: boolean) => {
    setSandboxMode(checked);
    if (checked) {
      setPaytmConfig({
        merchantId: "TEST_MERCHANT_ID",
        merchantKey: "TEST_MERCHANT_KEY",
        website: "WEBSTAGING",
      });
      toast({
        title: "Sandbox Mode Enabled",
        description: "You are now using test credentials for payments.",
      });
    } else {
      toast({
        title: "Production Mode Enabled",
        description: "You are now using real credentials for payments.",
      });
    }
  };

  const onSubmit = (values: z.infer<typeof paymentSchema>) => {
    console.log("Payment values:", values);
    console.log("Selected gateway:", selectedGateway);
    console.log("Paytm config:", paytmConfig);
    console.log("Customer info:", customerInfo);
    
    if (selectedGateway === "paytm") {
      initiatePaytmPayment(values.amount);
    } else {
      toast({
        title: "Payment gateway not implemented",
        description: `${selectedGateway} payment gateway is not yet implemented.`,
      });
    }
  };

  const initiatePaytmPayment = (amount: string) => {
    // In a real implementation, this would make an API call to your backend
    // The backend would generate a transaction token and return it
    // Then you would redirect to the Paytm payment page or show their checkout widget

    toast({
      title: "Processing payment",
      description: `Initiating ₹${amount} payment via Paytm${sandboxMode ? " (Test Mode)" : ""}`,
    });

    // Simulate a successful payment after a delay
    setTimeout(() => {
      toast({
        title: "Payment successful",
        description: `Your payment of ₹${amount} was processed successfully.`,
      });
    }, 2000);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Payment Gateway</span>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-normal">Sandbox Mode</span>
            <Switch 
              checked={sandboxMode} 
              onCheckedChange={handleToggleSandbox} 
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Available Payment Gateways</h3>
          <div className="space-y-2">
            {paymentGateways.map((gateway) => (
              <div key={gateway.id} className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id={`gateway-${gateway.id}`}
                    name="gateway"
                    className="mr-2"
                    checked={selectedGateway === gateway.id && gateway.enabled}
                    onChange={() => {
                      if (gateway.enabled) {
                        setSelectedGateway(gateway.id);
                        form.setValue("paymentGateway", gateway.id);
                      }
                    }}
                    disabled={!gateway.enabled}
                  />
                  <label 
                    htmlFor={`gateway-${gateway.id}`}
                    className={`font-medium ${!gateway.enabled ? "text-gray-400" : ""}`}
                  >
                    {gateway.name}
                  </label>
                </div>
                <Switch
                  checked={gateway.enabled}
                  onCheckedChange={(checked) => handleToggleGateway(gateway.id, checked)}
                />
              </div>
            ))}
          </div>
        </div>

        {selectedGateway === "paytm" && (
          <div className="mb-6 border p-4 rounded-md bg-gray-50">
            <h3 className="text-sm font-medium mb-2">Paytm Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="merchantId">Merchant ID</Label>
                <Input 
                  id="merchantId"
                  value={paytmConfig.merchantId}
                  onChange={(e) => setPaytmConfig({...paytmConfig, merchantId: e.target.value})}
                  placeholder="Enter Merchant ID"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="merchantKey">Merchant Key</Label>
                <Input 
                  id="merchantKey"
                  type="password"
                  value={paytmConfig.merchantKey}
                  onChange={(e) => setPaytmConfig({...paytmConfig, merchantKey: e.target.value})}
                  placeholder="Enter Merchant Key"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input 
                  id="website"
                  value={paytmConfig.website}
                  onChange={(e) => setPaytmConfig({...paytmConfig, website: e.target.value})}
                  placeholder="Enter Website"
                />
              </div>
            </div>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input placeholder="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                        <SelectItem value="USD">US Dollar ($)</SelectItem>
                        <SelectItem value="EUR">Euro (€)</SelectItem>
                        <SelectItem value="GBP">British Pound (£)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full bg-flipssi-purple hover:bg-purple-700"
              >
                Make Payment
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PaymentGateway;
