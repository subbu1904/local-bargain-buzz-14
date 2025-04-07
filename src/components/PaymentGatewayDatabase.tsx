
import { useState, useEffect } from "react";
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle, CreditCard, AlertTriangle, Shield, Info, Settings, RefreshCw, Clipboard, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const paymentSchema = z.object({
  amount: z.string().min(1, { message: "Amount is required" }),
  currency: z.string().min(1, { message: "Currency is required" }),
  paymentGateway: z.string().min(1, { message: "Payment gateway is required" }),
  description: z.string().optional(),
  customerName: z.string().optional(),
  customerEmail: z.string().email().optional().or(z.literal("")),
  customerPhone: z.string().optional(),
  savePaymentMethod: z.boolean().optional(),
});

type PaymentGateway = {
  id: string;
  name: string;
  enabled: boolean;
  logoUrl?: string;
  supportedInCountries?: string[];
  supportedCurrencies?: string[];
  transactionFee?: string;
  settlementTime?: string;
  apiEndpoint?: string;
  webhookUrl?: string;
  sandboxUrl?: string;
  productionUrl?: string;
  status?: 'active' | 'pending' | 'inactive';
  lastUpdated?: string;
};

type PaymentGatewayConfig = {
  [key: string]: {
    [key: string]: string;
  };
};

interface CurrencyOption {
  value: string;
  label: string;
  symbol: string;
  popular?: boolean;
}

interface PaymentGatewayDatabaseProps {
  customerInfo?: {
    name: string;
    email: string;
    phone: string;
  };
}

const PaymentGatewayDatabase = ({ customerInfo }: PaymentGatewayDatabaseProps) => {
  const [activeTab, setActiveTab] = useState("payment");
  const [sandboxMode, setSandboxMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentGateways, setPaymentGateways] = useState<PaymentGateway[]>([]);
  const [currencyOptions, setCurrencyOptions] = useState<CurrencyOption[]>([]);
  const [selectedGateway, setSelectedGateway] = useState("");
  const [gatewayConfigs, setGatewayConfigs] = useState<PaymentGatewayConfig>({});

  // Fetch payment gateways and currencies from database
  useEffect(() => {
    const fetchPaymentData = async () => {
      setIsLoading(true);
      try {
        // In a real application, you would fetch from Supabase
        // const { data: gatewaysData, error: gatewaysError } = await supabase
        //   .from('payment_gateways')
        //   .select('*')
        //   .order('name', { ascending: true });
        // if (gatewaysError) throw gatewaysError;
        
        // const { data: currenciesData, error: currenciesError } = await supabase
        //   .from('currencies')
        //   .select('*')
        //   .order('popular', { ascending: false });
        // if (currenciesError) throw currenciesError;

        // For demonstration, we'll use mock data
        const mockGateways: PaymentGateway[] = [
          { 
            id: "paytm", 
            name: "Paytm", 
            enabled: true, 
            logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg",
            supportedInCountries: ["India"],
            supportedCurrencies: ["INR"],
            transactionFee: "2% + ₹3",
            settlementTime: "T+1 day",
            apiEndpoint: "https://securegw.paytm.in/order/process",
            webhookUrl: "/api/webhooks/paytm",
            sandboxUrl: "https://securegw-stage.paytm.in/order/process",
            productionUrl: "https://securegw.paytm.in/order/process",
            status: 'active',
            lastUpdated: "2023-04-01"
          },
          { 
            id: "razorpay", 
            name: "Razorpay", 
            enabled: true,
            logoUrl: "https://razorpay.com/favicon.png",
            supportedInCountries: ["India"],
            supportedCurrencies: ["INR", "USD"],
            transactionFee: "2.5%",
            settlementTime: "T+3 days",
            apiEndpoint: "https://api.razorpay.com/v1/payments",
            webhookUrl: "/api/webhooks/razorpay",
            sandboxUrl: "https://api.razorpay.com/v1/checkout/embedded",
            productionUrl: "https://api.razorpay.com/v1/checkout/embedded",
            status: 'active',
            lastUpdated: "2023-04-05"
          },
          { 
            id: "stripe", 
            name: "Stripe", 
            enabled: true,
            logoUrl: "https://stripe.com/img/v3/home/twitter.png",
            supportedInCountries: ["Global"],
            supportedCurrencies: ["USD", "EUR", "GBP", "INR", "AUD", "CAD", "JPY"],
            transactionFee: "2.9% + $0.30",
            settlementTime: "2-7 days",
            apiEndpoint: "https://api.stripe.com/v1/payment_intents",
            webhookUrl: "/api/webhooks/stripe",
            sandboxUrl: "https://checkout.stripe.com",
            productionUrl: "https://checkout.stripe.com",
            status: 'active',
            lastUpdated: "2023-03-21"
          },
          { 
            id: "paypal", 
            name: "PayPal", 
            enabled: false,
            logoUrl: "https://www.paypalobjects.com/webstatic/icon/pp258.png",
            supportedInCountries: ["Global"],
            supportedCurrencies: ["USD", "EUR", "GBP", "AUD", "CAD"],
            transactionFee: "3.9% + fixed fee",
            settlementTime: "Instant to PayPal balance",
            apiEndpoint: "https://api.paypal.com/v2/checkout/orders",
            webhookUrl: "/api/webhooks/paypal",
            sandboxUrl: "https://sandbox.paypal.com",
            productionUrl: "https://paypal.com",
            status: 'inactive',
            lastUpdated: "2023-02-15"
          },
          { 
            id: "phonepe", 
            name: "PhonePe", 
            enabled: true,
            logoUrl: "https://www.phonepe.com/webstatic/static/favicon-32x32.png",
            supportedInCountries: ["India"],
            supportedCurrencies: ["INR"],
            transactionFee: "2.1% + GST",
            settlementTime: "T+1 day",
            apiEndpoint: "https://api.phonepe.com/apis/hermes/pg/v1/pay",
            webhookUrl: "/api/webhooks/phonepe",
            sandboxUrl: "https://api-preprod.phonepe.com/apis/pg-sandbox",
            productionUrl: "https://api.phonepe.com/apis/hermes/pg",
            status: 'active',
            lastUpdated: "2023-03-18"
          },
          { 
            id: "gpay", 
            name: "Google Pay", 
            enabled: false,
            logoUrl: "https://pay.google.com/about/static/images/social/og_image.jpg",
            supportedInCountries: ["India", "USA", "UK"],
            supportedCurrencies: ["INR", "USD", "GBP"],
            transactionFee: "Varies by country",
            settlementTime: "1-3 business days",
            apiEndpoint: "https://pay.google.com/payments/apis",
            webhookUrl: "/api/webhooks/gpay",
            sandboxUrl: "https://pay.google.com/business/console",
            productionUrl: "https://pay.google.com/business/console",
            status: 'pending',
            lastUpdated: "2023-02-28"
          },
          { 
            id: "amazonpay", 
            name: "Amazon Pay", 
            enabled: false,
            logoUrl: "https://amazon.in/favicon.ico",
            supportedInCountries: ["India", "USA", "UK"],
            supportedCurrencies: ["INR", "USD", "GBP"],
            transactionFee: "2.5% for credit card transactions",
            settlementTime: "3-5 business days",
            apiEndpoint: "https://pay-api.amazon.com/v1",
            webhookUrl: "/api/webhooks/amazonpay",
            sandboxUrl: "https://pay-api.amazon.com/sandbox",
            productionUrl: "https://pay-api.amazon.com",
            status: 'inactive',
            lastUpdated: "2023-01-10"
          },
        ];

        const mockCurrencies: CurrencyOption[] = [
          { value: "INR", label: "Indian Rupee", symbol: "₹", popular: true },
          { value: "USD", label: "US Dollar", symbol: "$", popular: true },
          { value: "EUR", label: "Euro", symbol: "€", popular: true },
          { value: "GBP", label: "British Pound", symbol: "£", popular: true },
          { value: "JPY", label: "Japanese Yen", symbol: "¥" },
          { value: "CNY", label: "Chinese Yuan", symbol: "¥" },
          { value: "SGD", label: "Singapore Dollar", symbol: "S$" },
          { value: "HKD", label: "Hong Kong Dollar", symbol: "HK$" },
          { value: "AED", label: "UAE Dirham", symbol: "د.إ" },
          { value: "SAR", label: "Saudi Riyal", symbol: "﷼" },
          { value: "AUD", label: "Australian Dollar", symbol: "A$" },
          { value: "CAD", label: "Canadian Dollar", symbol: "C$" },
          { value: "BTC", label: "Bitcoin", symbol: "₿" },
          { value: "ETH", label: "Ethereum", symbol: "Ξ" },
          { value: "USDT", label: "Tether", symbol: "₮" },
        ];

        const mockConfigs: PaymentGatewayConfig = {
          paytm: {
            merchantId: sandboxMode ? "TEST_MERCHANT_ID" : "",
            merchantKey: sandboxMode ? "TEST_MERCHANT_KEY" : "",
            website: sandboxMode ? "WEBSTAGING" : "DEFAULT",
            industryType: "Retail",
            channelId: "WEB",
            callbackUrl: window.location.origin + "/callback",
          },
          razorpay: {
            keyId: sandboxMode ? "rzp_test_key" : "",
            keySecret: sandboxMode ? "rzp_test_secret" : "",
            webhookSecret: "",
          },
          stripe: {
            publishableKey: sandboxMode ? "pk_test_key" : "",
            secretKey: sandboxMode ? "sk_test_key" : "",
            webhookSecret: "",
          },
          phonepe: {
            merchantId: sandboxMode ? "TEST_MERCHANT_ID" : "",
            saltKey: sandboxMode ? "TEST_SALT_KEY" : "",
            saltIndex: "1",
            redirectUrl: window.location.origin + "/callback",
          }
        };

        setPaymentGateways(mockGateways);
        setCurrencyOptions(mockCurrencies);
        setGatewayConfigs(mockConfigs);

        // Set initial selected gateway to the first enabled one
        const firstEnabled = mockGateways.find(g => g.enabled);
        if (firstEnabled) {
          setSelectedGateway(firstEnabled.id);
        }

      } catch (error) {
        console.error("Error loading payment data:", error);
        toast({
          title: "Error Loading Data",
          description: "Failed to load payment configuration data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentData();
  }, [sandboxMode]);

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      amount: "100",
      currency: "INR",
      paymentGateway: selectedGateway,
      description: "Payment for order",
      customerName: customerInfo?.name || "",
      customerEmail: customerInfo?.email || "",
      customerPhone: customerInfo?.phone || "",
      savePaymentMethod: false,
    },
  });

  // Update form when selectedGateway changes
  useEffect(() => {
    if (selectedGateway) {
      form.setValue("paymentGateway", selectedGateway);
    }
  }, [selectedGateway, form]);

  const handleToggleGateway = async (id: string, enabled: boolean) => {
    try {
      // In a real application, you would update Supabase
      // const { error } = await supabase
      //   .from('payment_gateways')
      //   .update({ enabled })
      //   .eq('id', id);
      // if (error) throw error;

      // Update local state
      setPaymentGateways(
        paymentGateways.map((gateway) =>
          gateway.id === id ? { ...gateway, enabled } : gateway
        )
      );
      
      if (id === selectedGateway && !enabled) {
        const nextEnabled = paymentGateways.find(g => g.id !== id && g.enabled);
        if (nextEnabled) {
          setSelectedGateway(nextEnabled.id);
          form.setValue("paymentGateway", nextEnabled.id);
        }
      }

      toast({
        title: enabled ? "Gateway Enabled" : "Gateway Disabled",
        description: `${paymentGateways.find(g => g.id === id)?.name} has been ${enabled ? "enabled" : "disabled"}.`,
      });
    } catch (error) {
      console.error("Error updating gateway status:", error);
      toast({
        title: "Error",
        description: "Failed to update gateway status",
        variant: "destructive",
      });
    }
  };

  const handleToggleSandbox = async (checked: boolean) => {
    setSandboxMode(checked);
    toast({
      title: checked ? "Sandbox Mode Enabled" : "Production Mode Enabled",
      description: checked 
        ? "You are now using test credentials for payments." 
        : "You are now using real credentials for payments.",
    });
  };

  const handleConfigChange = async (gatewayId: string, key: string, value: string) => {
    try {
      // Create a deep copy of the current configs
      const updatedConfigs = JSON.parse(JSON.stringify(gatewayConfigs));
      
      // Update the specific config
      if (!updatedConfigs[gatewayId]) {
        updatedConfigs[gatewayId] = {};
      }
      updatedConfigs[gatewayId][key] = value;
      
      // In a real application, you would update Supabase
      // const { error } = await supabase
      //   .from('payment_gateway_configs')
      //   .upsert({
      //     gateway_id: gatewayId,
      //     config_key: key,
      //     config_value: value,
      //     is_sandbox: sandboxMode
      //   });
      // if (error) throw error;

      // Update local state
      setGatewayConfigs(updatedConfigs);
    } catch (error) {
      console.error("Error updating gateway config:", error);
      toast({
        title: "Error",
        description: "Failed to save configuration",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (values: z.infer<typeof paymentSchema>) => {
    setIsLoading(true);
    try {
      console.log("Payment values:", values);
      
      const gateway = paymentGateways.find(g => g.id === values.paymentGateway);
      if (!gateway) {
        throw new Error("Selected payment gateway not found");
      }
      
      const currencySymbol = currencyOptions.find(c => c.value === values.currency)?.symbol || "₹";
      
      // In a real application, you would store the transaction in Supabase
      // const { data, error } = await supabase
      //   .from('payment_transactions')
      //   .insert({
      //     amount: values.amount,
      //     currency: values.currency,
      //     gateway_id: values.paymentGateway,
      //     description: values.description,
      //     customer_name: values.customerName,
      //     customer_email: values.customerEmail,
      //     customer_phone: values.customerPhone,
      //     status: 'pending',
      //     created_at: new Date()
      //   })
      //   .select('id');
      // if (error) throw error;

      toast({
        title: "Processing payment",
        description: `Initiating ${currencySymbol}${values.amount} payment via ${gateway.name}${sandboxMode ? " (Test Mode)" : ""}`,
      });

      // Simulate API call
      setTimeout(() => {
        toast({
          title: "Payment successful",
          description: `Your payment of ${currencySymbol}${values.amount} was processed successfully.`,
        });
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error processing payment:", error);
      toast({
        title: "Payment Error",
        description: "Failed to process payment",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const copyConfigToClipboard = (configName: string, config: any) => {
    const configText = JSON.stringify(config, null, 2);
    navigator.clipboard.writeText(configText);
    toast({
      title: "Copied to clipboard",
      description: `${configName} configuration copied to clipboard.`,
    });
  };

  const refreshGatewayStatus = async (gatewayId: string) => {
    setIsLoading(true);
    try {
      const gateway = paymentGateways.find(g => g.id === gatewayId);
      if (!gateway) {
        throw new Error("Gateway not found");
      }
      
      // Simulate API call to check gateway status
      setTimeout(() => {
        // Update local state to simulate a status check
        setPaymentGateways(
          paymentGateways.map((g) =>
            g.id === gatewayId 
              ? { ...g, lastUpdated: new Date().toISOString().split('T')[0] } 
              : g
          )
        );
        
        toast({
          title: "Gateway Status Refreshed",
          description: `${gateway.name} status is active.`,
        });
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error refreshing gateway status:", error);
      toast({
        title: "Error",
        description: "Failed to refresh gateway status",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const getConfigFields = (gatewayId: string) => {
    switch (gatewayId) {
      case "paytm":
        return [
          { key: "merchantId", label: "Merchant ID", type: "text" },
          { key: "merchantKey", label: "Merchant Key", type: "password" },
          { key: "website", label: "Website", type: "text" },
          { key: "industryType", label: "Industry Type", type: "text" },
          { key: "channelId", label: "Channel ID", type: "text" },
          { key: "callbackUrl", label: "Callback URL", type: "text" },
        ];
      case "razorpay":
        return [
          { key: "keyId", label: "Key ID", type: "text" },
          { key: "keySecret", label: "Key Secret", type: "password" },
          { key: "webhookSecret", label: "Webhook Secret", type: "password" },
        ];
      case "stripe":
        return [
          { key: "publishableKey", label: "Publishable Key", type: "text" },
          { key: "secretKey", label: "Secret Key", type: "password" },
          { key: "webhookSecret", label: "Webhook Secret", type: "password" },
        ];
      case "phonepe":
        return [
          { key: "merchantId", label: "Merchant ID", type: "text" },
          { key: "saltKey", label: "Salt Key", type: "password" },
          { key: "saltIndex", label: "Salt Index", type: "text" },
          { key: "redirectUrl", label: "Redirect URL", type: "text" },
        ];
      default:
        return [];
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Payment Gateway (Database)</span>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-normal">Sandbox Mode</span>
            <Switch 
              checked={sandboxMode} 
              onCheckedChange={handleToggleSandbox} 
              disabled={isLoading}
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && !paymentGateways.length ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <Tabs defaultValue="payment" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="payment">Payment</TabsTrigger>
              <TabsTrigger value="gateways">Gateways</TabsTrigger>
              <TabsTrigger value="configuration">Configuration</TabsTrigger>
            </TabsList>
            
            <TabsContent value="payment" className="space-y-4">
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
                            <Input placeholder="100" {...field} disabled={isLoading} />
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
                            disabled={isLoading}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select currency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <div className="mb-2 px-2 text-xs font-semibold text-gray-500">Popular</div>
                              {currencyOptions.filter(c => c.popular).map((currency) => (
                                <SelectItem key={currency.value} value={currency.value}>
                                  {currency.symbol} - {currency.label}
                                </SelectItem>
                              ))}
                              <div className="my-2 px-2 text-xs font-semibold text-gray-500">All Currencies</div>
                              {currencyOptions.filter(c => !c.popular).map((currency) => (
                                <SelectItem key={currency.value} value={currency.value}>
                                  {currency.symbol} - {currency.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Input placeholder="Payment for order" {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="paymentGateway"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Payment Gateway</FormLabel>
                          <Select 
                            onValueChange={(value) => {
                              field.onChange(value);
                              setSelectedGateway(value);
                            }} 
                            defaultValue={field.value}
                            disabled={isLoading}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select gateway" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {paymentGateways.filter(gateway => gateway.enabled).map((gateway) => (
                                <SelectItem key={gateway.id} value={gateway.id}>
                                  {gateway.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="customerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Customer Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="customerEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Customer Email</FormLabel>
                          <FormControl>
                            <Input placeholder="example@mail.com" {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="customerPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Customer Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 1234567890" {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="savePaymentMethod"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Save Payment Method</FormLabel>
                          <FormDescription>
                            Save this payment method for future transactions
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isLoading}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full bg-flipssi-purple hover:bg-purple-700"
                      disabled={isLoading}
                    >
                      {isLoading ? "Processing..." : "Make Payment"}
                    </Button>
                  </div>
                </form>
              </Form>
              
              <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-500">
                <Shield className="h-4 w-4" />
                <span>Payments are secure and encrypted</span>
              </div>
            </TabsContent>
            
            <TabsContent value="gateways" className="space-y-4">
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Available Payment Gateways</h3>
                <div className="grid grid-cols-1 gap-2">
                  {paymentGateways.map((gateway) => (
                    <div 
                      key={gateway.id} 
                      className="flex items-center justify-between py-3 px-4 border rounded-md hover:bg-gray-50"
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id={`gateway-${gateway.id}`}
                          name="gateway"
                          className="mr-3"
                          checked={selectedGateway === gateway.id && gateway.enabled}
                          onChange={() => {
                            if (gateway.enabled) {
                              setSelectedGateway(gateway.id);
                              form.setValue("paymentGateway", gateway.id);
                            }
                          }}
                          disabled={!gateway.enabled || isLoading}
                        />
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <label 
                              htmlFor={`gateway-${gateway.id}`}
                              className={`font-medium ${!gateway.enabled ? "text-gray-400" : ""}`}
                            >
                              {gateway.name}
                            </label>
                            
                            {gateway.status && (
                              <Badge 
                                variant={
                                  gateway.status === 'active' 
                                    ? "outline" 
                                    : gateway.status === 'pending' 
                                    ? "secondary"
                                    : "destructive"
                                }
                                className="ml-2 text-xs"
                              >
                                {gateway.status}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center mt-1 space-x-2">
                            {gateway.supportedInCountries && (
                              <Badge variant="outline" className="text-xs">
                                {gateway.supportedInCountries.join(", ")}
                              </Badge>
                            )}
                            {gateway.transactionFee && (
                              <span className="text-xs text-gray-500">
                                Fee: {gateway.transactionFee}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        {gateway.lastUpdated && (
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <span className="sr-only">Show last updated</span>
                                <Info className="h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-60 p-3" side="top">
                              <div className="space-y-2 text-sm">
                                <p className="font-medium">Gateway Information</p>
                                <div className="flex justify-between">
                                  <span>Status:</span>
                                  <span className="font-semibold">{gateway.status || 'Unknown'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Last Updated:</span>
                                  <span className="font-semibold">{gateway.lastUpdated || 'Never'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Settlement Time:</span>
                                  <span className="font-semibold">{gateway.settlementTime || 'Unknown'}</span>
                                </div>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="w-full mt-2"
                                  onClick={() => refreshGatewayStatus(gateway.id)}
                                  disabled={isLoading}
                                >
                                  <RefreshCw className="mr-1 h-3 w-3" /> Refresh Status
                                </Button>
                              </div>
                            </PopoverContent>
                          </Popover>
                        )}
                        
                        {gateway.supportedCurrencies && (
                          <div className="hidden md:flex items-center space-x-1">
                            {gateway.supportedCurrencies.slice(0, 3).map((currency) => (
                              <Badge key={currency} variant="secondary" className="text-xs">
                                {currency}
                              </Badge>
                            ))}
                            {gateway.supportedCurrencies.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{gateway.supportedCurrencies.length - 3}
                              </Badge>
                            )}
                          </div>
                        )}
                        
                        <Switch
                          checked={gateway.enabled}
                          onCheckedChange={(checked) => handleToggleGateway(gateway.id, checked)}
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="rounded-lg border p-4">
                <h3 className="text-sm font-medium mb-3">API Endpoints</h3>
                <div className="space-y-4">
                  {paymentGateways
                    .filter(gateway => gateway.enabled && gateway.apiEndpoint)
                    .map((gateway) => (
                      <div key={`endpoint-${gateway.id}`} className="rounded border p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{gateway.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {sandboxMode ? "Sandbox" : "Production"}
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500">API Endpoint:</span>
                            <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">
                              {gateway.apiEndpoint}
                            </code>
                          </div>
                          {gateway.webhookUrl && (
                            <div className="flex justify-between items-center">
                              <span className="text-gray-500">Webhook URL:</span>
                              <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">
                                {gateway.webhookUrl}
                              </code>
                            </div>
                          )}
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500">Base URL:</span>
                            <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">
                              {sandboxMode ? gateway.sandboxUrl : gateway.productionUrl}
                            </code>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="configuration" className="space-y-4">
              <div className="flex space-x-2 mb-4">
                {paymentGateways
                  .filter(gateway => gateway.enabled)
                  .map((gateway) => (
                    <Button
                      key={`config-btn-${gateway.id}`}
                      variant={selectedGateway === gateway.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedGateway(gateway.id)}
                      disabled={isLoading}
                    >
                      {gateway.name}
                    </Button>
                  ))}
              </div>
              
              {selectedGateway && gatewayConfigs[selectedGateway] && (
                <div className="mb-6 border p-4 rounded-md bg-gray-50">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-medium">{paymentGateways.find(g => g.id === selectedGateway)?.name} Configuration</h3>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => copyConfigToClipboard(
                        paymentGateways.find(g => g.id === selectedGateway)?.name || "", 
                        gatewayConfigs[selectedGateway]
                      )}
                      disabled={isLoading}
                    >
                      <Clipboard className="h-4 w-4 mr-1" /> Copy
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getConfigFields(selectedGateway).map((field) => (
                      <div key={`field-${field.key}`} className="space-y-2">
                        <Label htmlFor={`${selectedGateway}-${field.key}`}>{field.label}</Label>
                        <div className="relative">
                          {field.type === 'password' && (
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 pointer-events-none">
                              <Lock className="h-4 w-4" />
                            </div>
                          )}
                          <Input 
                            id={`${selectedGateway}-${field.key}`}
                            type={field.type}
                            value={gatewayConfigs[selectedGateway][field.key] || ''}
                            onChange={(e) => handleConfigChange(selectedGateway, field.key, e.target.value)}
                            placeholder={`Enter ${field.label}`}
                            className={field.type === 'password' ? 'pr-10' : ''}
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex flex-col space-y-2 p-4 border rounded-md">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                  <span className="font-medium">Gateway Configuration Notes</span>
                </div>
                <ul className="space-y-1 pl-7 text-sm text-gray-600 list-disc">
                  <li>Configuration is stored in the database and persists across sessions.</li>
                  <li>API keys and secrets are encrypted before storage.</li>
                  <li>Separate configurations are maintained for sandbox and production modes.</li>
                  <li>Each gateway integration requires specific configuration - refer to documentation.</li>
                  <li>Changes to configuration will take effect immediately for new transactions.</li>
                </ul>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex flex-col">
                <h3 className="text-sm font-medium mb-3">Database Schema</h3>
                <div className="overflow-x-auto rounded border">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Table</th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">payment_gateways</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">Stores information about available payment gateways</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">payment_gateway_configs</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">Stores gateway-specific configuration parameters</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">currencies</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">Stores currency information and symbols</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">payment_transactions</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">Logs all payment transactions and their status</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentGatewayDatabase;
