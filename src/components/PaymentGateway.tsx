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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle, CreditCard, AlertTriangle, Shield, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
};

interface CurrencyOption {
  value: string;
  label: string;
  symbol: string;
  popular?: boolean;
}

const currencyOptions: CurrencyOption[] = [
  { value: "INR", label: "Indian Rupee", symbol: "₹", popular: true },
  { value: "USD", label: "US Dollar", symbol: "$", popular: true },
  { value: "EUR", label: "Euro", symbol: "€", popular: true },
  { value: "GBP", label: "British Pound", symbol: "£", popular: true },
  { value: "JPY", label: "Japanese Yen", symbol: "¥" },
  { value: "CNY", label: "Chinese Yuan", symbol: "¥" },
  { value: "SGD", label: "Singapore Dollar", symbol: "S$" },
  { value: "HKD", label: "Hong Kong Dollar", symbol: "HK$" },
  { value: "MYR", label: "Malaysian Ringgit", symbol: "RM" },
  { value: "THB", label: "Thai Baht", symbol: "฿" },
  { value: "IDR", label: "Indonesian Rupiah", symbol: "Rp" },
  { value: "KRW", label: "South Korean Won", symbol: "₩" },
  { value: "AED", label: "UAE Dirham", symbol: "د.إ" },
  { value: "SAR", label: "Saudi Riyal", symbol: "﷼" },
  { value: "QAR", label: "Qatari Riyal", symbol: "﷼" },
  { value: "CAD", label: "Canadian Dollar", symbol: "C$" },
  { value: "AUD", label: "Australian Dollar", symbol: "A$" },
  { value: "NZD", label: "New Zealand Dollar", symbol: "NZ$" },
  { value: "CHF", label: "Swiss Franc", symbol: "Fr" },
  { value: "BRL", label: "Brazilian Real", symbol: "R$" },
  { value: "ZAR", label: "South African Rand", symbol: "R" },
  { value: "MXN", label: "Mexican Peso", symbol: "Mex$" },
  { value: "BTC", label: "Bitcoin", symbol: "₿" },
  { value: "ETH", label: "Ethereum", symbol: "Ξ" },
  { value: "USDT", label: "Tether", symbol: "₮" },
];

interface PaymentGatewayProps {
  customerInfo?: {
    name: string;
    email: string;
    phone: string;
  };
}

const PaymentGateway = ({ customerInfo }: PaymentGatewayProps) => {
  const [activeTab, setActiveTab] = useState("payment");
  const [sandboxMode, setSandboxMode] = useState(true);
  const [paymentGateways, setPaymentGateways] = useState<PaymentGateway[]>([
    { 
      id: "paytm", 
      name: "Paytm", 
      enabled: true, 
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg",
      supportedInCountries: ["India"],
      supportedCurrencies: ["INR"],
      transactionFee: "2% + ₹3",
      settlementTime: "T+1 day"
    },
    { 
      id: "razorpay", 
      name: "Razorpay", 
      enabled: false,
      logoUrl: "https://razorpay.com/favicon.png",
      supportedInCountries: ["India"],
      supportedCurrencies: ["INR", "USD"],
      transactionFee: "2.5%",
      settlementTime: "T+3 days"
    },
    { 
      id: "stripe", 
      name: "Stripe", 
      enabled: false,
      logoUrl: "https://stripe.com/img/v3/home/twitter.png",
      supportedInCountries: ["Global"],
      supportedCurrencies: ["USD", "EUR", "GBP", "INR", "AUD", "CAD", "JPY"],
      transactionFee: "2.9% + $0.30",
      settlementTime: "2-7 days"
    },
    { 
      id: "paypal", 
      name: "PayPal", 
      enabled: false,
      logoUrl: "https://www.paypalobjects.com/webstatic/icon/pp258.png",
      supportedInCountries: ["Global"],
      supportedCurrencies: ["USD", "EUR", "GBP", "AUD", "CAD"],
      transactionFee: "3.9% + fixed fee",
      settlementTime: "Instant to PayPal balance"
    },
    { 
      id: "phonepe", 
      name: "PhonePe", 
      enabled: false,
      logoUrl: "https://www.phonepe.com/webstatic/static/favicon-32x32.png",
      supportedInCountries: ["India"],
      supportedCurrencies: ["INR"],
      transactionFee: "2.1% + GST",
      settlementTime: "T+1 day"
    },
    { 
      id: "googlepay", 
      name: "Google Pay", 
      enabled: false,
      logoUrl: "https://pay.google.com/about/static/images/social/og_image.jpg",
      supportedInCountries: ["India", "USA", "UK"],
      supportedCurrencies: ["INR", "USD", "GBP"],
      transactionFee: "Varies by country",
      settlementTime: "1-3 business days"
    },
    { 
      id: "amazonpay", 
      name: "Amazon Pay", 
      enabled: false,
      logoUrl: "https://amazon.in/favicon.ico",
      supportedInCountries: ["India", "USA", "UK"],
      supportedCurrencies: ["INR", "USD", "GBP"],
      transactionFee: "2.5% for credit card transactions",
      settlementTime: "3-5 business days"
    },
    { 
      id: "bharatpe", 
      name: "BharatPe", 
      enabled: false,
      logoUrl: "https://bharatpe.com/images/logo.png",
      supportedInCountries: ["India"],
      supportedCurrencies: ["INR"],
      transactionFee: "0% for UPI",
      settlementTime: "Same day"
    },
    { 
      id: "upi", 
      name: "UPI Direct", 
      enabled: false,
      logoUrl: "https://www.npci.org.in/images/best-viewed/upi-logo.png",
      supportedInCountries: ["India"],
      supportedCurrencies: ["INR"],
      transactionFee: "0%",
      settlementTime: "Instant"
    },
  ]);
  const [selectedGateway, setSelectedGateway] = useState("paytm");
  const [paytmConfig, setPaytmConfig] = useState({
    merchantId: sandboxMode ? "TEST_MERCHANT_ID" : "",
    merchantKey: sandboxMode ? "TEST_MERCHANT_KEY" : "",
    website: sandboxMode ? "WEBSTAGING" : "DEFAULT",
    industryType: "Retail",
    channelId: "WEB",
    callbackUrl: window.location.origin + "/callback",
  });
  
  const [razorpayConfig, setRazorpayConfig] = useState({
    keyId: sandboxMode ? "rzp_test_key" : "",
    keySecret: sandboxMode ? "rzp_test_secret" : "",
    webhookSecret: "",
  });
  
  const [stripeConfig, setStripeConfig] = useState({
    publishableKey: sandboxMode ? "pk_test_key" : "",
    secretKey: sandboxMode ? "sk_test_key" : "",
    webhookSecret: "",
  });

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      amount: "100",
      currency: "INR",
      paymentGateway: "paytm",
      description: "Payment for order",
      customerName: customerInfo?.name || "",
      customerEmail: customerInfo?.email || "",
      customerPhone: customerInfo?.phone || "",
      savePaymentMethod: false,
    },
  });

  const handleToggleGateway = (id: string, enabled: boolean) => {
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
  };

  const handleToggleSandbox = (checked: boolean) => {
    setSandboxMode(checked);
    if (checked) {
      setPaytmConfig({
        ...paytmConfig,
        merchantId: "TEST_MERCHANT_ID",
        merchantKey: "TEST_MERCHANT_KEY",
        website: "WEBSTAGING",
      });
      setRazorpayConfig({
        ...razorpayConfig,
        keyId: "rzp_test_key",
        keySecret: "rzp_test_secret",
      });
      setStripeConfig({
        ...stripeConfig,
        publishableKey: "pk_test_key",
        secretKey: "sk_test_key",
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
    console.log("Customer info:", customerInfo);
    
    const currencySymbol = currencyOptions.find(c => c.value === values.currency)?.symbol || "₹";
    
    if (selectedGateway === "paytm") {
      initiatePaytmPayment(values.amount, values.currency, currencySymbol, values);
    } else if (selectedGateway === "razorpay") {
      initiateRazorpayPayment(values.amount, values.currency, currencySymbol, values);
    } else if (selectedGateway === "stripe") {
      initiateStripePayment(values.amount, values.currency, currencySymbol, values);
    } else {
      toast({
        title: "Payment gateway not implemented",
        description: `${selectedGateway} payment gateway is not yet implemented.`,
      });
    }
  };

  const initiatePaytmPayment = (amount: string, currency: string, symbol: string, values: any) => {
    toast({
      title: "Processing payment",
      description: `Initiating ${symbol}${amount} payment via Paytm${sandboxMode ? " (Test Mode)" : ""}`,
    });

    setTimeout(() => {
      toast({
        title: "Payment successful",
        description: `Your payment of ${symbol}${amount} was processed successfully.`,
      });
    }, 2000);
  };

  const initiateRazorpayPayment = (amount: string, currency: string, symbol: string, values: any) => {
    toast({
      title: "Processing payment",
      description: `Initiating ${symbol}${amount} payment via Razorpay${sandboxMode ? " (Test Mode)" : ""}`,
    });

    setTimeout(() => {
      toast({
        title: "Payment successful",
        description: `Your payment of ${symbol}${amount} was processed successfully.`,
      });
    }, 2000);
  };

  const initiateStripePayment = (amount: string, currency: string, symbol: string, values: any) => {
    toast({
      title: "Processing payment",
      description: `Initiating ${symbol}${amount} payment via Stripe${sandboxMode ? " (Test Mode)" : ""}`,
    });

    setTimeout(() => {
      toast({
        title: "Payment successful",
        description: `Your payment of ${symbol}${amount} was processed successfully.`,
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
                          <Input placeholder="Payment for order" {...field} />
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
                          <Input placeholder="John Doe" {...field} />
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
                          <Input placeholder="example@mail.com" {...field} />
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
                          <Input placeholder="+91 1234567890" {...field} />
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
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

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
                  <div key={gateway.id} className="flex items-center justify-between py-3 px-4 border rounded-md hover:bg-gray-50">
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
                        disabled={!gateway.enabled}
                      />
                      <div className="flex flex-col">
                        <label 
                          htmlFor={`gateway-${gateway.id}`}
                          className={`font-medium ${!gateway.enabled ? "text-gray-400" : ""}`}
                        >
                          {gateway.name}
                        </label>
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
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="configuration" className="space-y-4">
            {selectedGateway === "paytm" && (
              <div className="mb-6 border p-4 rounded-md bg-gray-50">
                <h3 className="text-sm font-medium mb-4">Paytm Configuration</h3>
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
                  <div className="space-y-2">
                    <Label htmlFor="industryType">Industry Type</Label>
                    <Input 
                      id="industryType"
                      value={paytmConfig.industryType}
                      onChange={(e) => setPaytmConfig({...paytmConfig, industryType: e.target.value})}
                      placeholder="Enter Industry Type"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="channelId">Channel ID</Label>
                    <Input 
                      id="channelId"
                      value={paytmConfig.channelId}
                      onChange={(e) => setPaytmConfig({...paytmConfig, channelId: e.target.value})}
                      placeholder="Enter Channel ID"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="callbackUrl">Callback URL</Label>
                    <Input 
                      id="callbackUrl"
                      value={paytmConfig.callbackUrl}
                      onChange={(e) => setPaytmConfig({...paytmConfig, callbackUrl: e.target.value})}
                      placeholder="Enter Callback URL"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {selectedGateway === "razorpay" && (
              <div className="mb-6 border p-4 rounded-md bg-gray-50">
                <h3 className="text-sm font-medium mb-4">Razorpay Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="razorpayKeyId">Key ID</Label>
                    <Input 
                      id="razorpayKeyId"
                      value={razorpayConfig.keyId}
                      onChange={(e) => setRazorpayConfig({...razorpayConfig, keyId: e.target.value})}
                      placeholder="Enter Key ID"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="razorpayKeySecret">Key Secret</Label>
                    <Input 
                      id="razorpayKeySecret"
                      type="password"
                      value={razorpayConfig.keySecret}
                      onChange={(e) => setRazorpayConfig({...razorpayConfig, keySecret: e.target.value})}
                      placeholder="Enter Key Secret"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="razorpayWebhook">Webhook Secret</Label>
                    <Input 
                      id="razorpayWebhook"
                      type="password"
                      value={razorpayConfig.webhookSecret}
                      onChange={(e) => setRazorpayConfig({...razorpayConfig, webhookSecret: e.target.value})}
                      placeholder="Enter Webhook Secret"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {selectedGateway === "stripe" && (
              <div className="mb-6 border p-4 rounded-md bg-gray-50">
                <h3 className="text-sm font-medium mb-4">Stripe Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stripePublishableKey">Publishable Key</Label>
                    <Input 
                      id="stripePublishableKey"
                      value={stripeConfig.publishableKey}
                      onChange={(e) => setStripeConfig({...stripeConfig, publishableKey: e.target.value})}
                      placeholder="Enter Publishable Key"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stripeSecretKey">Secret Key</Label>
                    <Input 
                      id="stripeSecretKey"
                      type="password"
                      value={stripeConfig.secretKey}
                      onChange={(e) => setStripeConfig({...stripeConfig, secretKey: e.target.value})}
                      placeholder="Enter Secret Key"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stripeWebhook">Webhook Secret</Label>
                    <Input 
                      id="stripeWebhook"
                      type="password"
                      value={stripeConfig.webhookSecret}
                      onChange={(e) => setStripeConfig({...stripeConfig, webhookSecret: e.target.value})}
                      placeholder="Enter Webhook Secret"
                    />
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex flex-col space-y-2 p-4 border rounded-md">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                <span className="font-medium">Gateway Configuration Notes</span>
              </div>
              <ul className="space-y-1 pl-7 text-sm text-gray-600 list-disc">
                <li>Credentials are stored in memory only and will be reset on page reload.</li>
                <li>In production, API keys and secrets should be stored securely on the server.</li>
                <li>Use sandbox/test mode during development and testing.</li>
                <li>Each gateway requires specific configuration - see documentation.</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PaymentGateway;
