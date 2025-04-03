
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface SubscriptionFeature {
  text: string;
  included: boolean;
}

interface SubscriptionPlan {
  name: string;
  price: number;
  description: string;
  features: SubscriptionFeature[];
  buttonText: string;
  popular?: boolean;
  path: string;
  currency?: string;
  billingPeriod?: string;
  discountedPrice?: number;
  discountPercentage?: number;
  highlightColor?: string;
  maxListings?: number;
  supportLevel?: string;
  recommendedFor?: string;
}

const plans: SubscriptionPlan[] = [
  {
    name: "Free",
    price: 0,
    description: "Basic features for occasional sellers",
    features: [
      { text: "Post up to 5 listings", included: true },
      { text: "Basic listing visibility", included: true },
      { text: "Standard support", included: true },
      { text: "Featured listings", included: false },
      { text: "Priority search results", included: false },
      { text: "Seller verification badge", included: false },
    ],
    buttonText: "Start Free",
    path: "/dashboard",
    currency: "₹",
    billingPeriod: "month",
    maxListings: 5,
    supportLevel: "Basic",
    recommendedFor: "Beginners",
  },
  {
    name: "Starter",
    price: 299,
    description: "Perfect for new sellers",
    features: [
      { text: "Post up to 15 listings", included: true },
      { text: "Improved listing visibility", included: true },
      { text: "Email support", included: true },
      { text: "Featured listings (1 per month)", included: true },
      { text: "Priority search results", included: false },
      { text: "Seller verification badge", included: false },
    ],
    buttonText: "Go Starter",
    path: "/dashboard/payments",
    currency: "₹",
    billingPeriod: "month",
    discountedPrice: 249,
    discountPercentage: 17,
    maxListings: 15,
    supportLevel: "Email",
    recommendedFor: "New Sellers",
  },
  {
    name: "Premium",
    price: 599,
    description: "Enhanced features for regular sellers",
    features: [
      { text: "Unlimited listings", included: true },
      { text: "Higher listing visibility", included: true },
      { text: "Priority support", included: true },
      { text: "Featured listings", included: true },
      { text: "Priority search results", included: false },
      { text: "Seller verification badge", included: true },
    ],
    buttonText: "Upgrade Now",
    popular: true,
    path: "/dashboard/payments",
    currency: "₹",
    billingPeriod: "month",
    highlightColor: "purple",
    maxListings: -1, // Unlimited
    supportLevel: "Priority",
    recommendedFor: "Regular Sellers",
  },
  {
    name: "Pro",
    price: 1199,
    description: "Advanced features for power sellers",
    features: [
      { text: "Unlimited listings", included: true },
      { text: "Maximum listing visibility", included: true },
      { text: "24/7 VIP support", included: true },
      { text: "Featured listings", included: true },
      { text: "Priority search results", included: true },
      { text: "Seller verification badge", included: true },
    ],
    buttonText: "Go Pro",
    path: "/dashboard/payments",
    currency: "₹",
    billingPeriod: "month",
    highlightColor: "blue",
    maxListings: -1, // Unlimited
    supportLevel: "24/7 VIP",
    recommendedFor: "Power Sellers",
  },
  {
    name: "Enterprise",
    price: 9999,
    description: "Complete solution for businesses",
    features: [
      { text: "Unlimited listings with bulk upload", included: true },
      { text: "Premium store profile", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "Advanced analytics dashboard", included: true },
      { text: "API access for integration", included: true },
      { text: "White-labeled mobile app", included: true },
    ],
    buttonText: "Contact Sales",
    path: "/dashboard/payments",
    currency: "₹",
    billingPeriod: "month",
    highlightColor: "green",
    maxListings: -1, // Unlimited
    supportLevel: "Dedicated Manager",
    recommendedFor: "Businesses",
  },
  {
    name: "Business Annual",
    price: 99999,
    description: "Enterprise solutions for large sellers",
    features: [
      { text: "Everything in Enterprise plan", included: true },
      { text: "Yearly strategy consultation", included: true },
      { text: "Premium listing placement", included: true },
      { text: "Custom reporting tools", included: true },
      { text: "Multi-user access", included: true },
      { text: "Market trend analysis", included: true },
    ],
    buttonText: "Contact Sales",
    path: "/dashboard/payments",
    currency: "₹",
    billingPeriod: "year",
    discountedPrice: 89999,
    discountPercentage: 10,
    highlightColor: "gold",
    maxListings: -1, // Unlimited
    supportLevel: "Enterprise",
    recommendedFor: "Large Businesses",
  },
];

// Currency options expanded with more options
const currencyOptions = {
  "₹": "₹", // Indian Rupee (default)
  "$": "$", // US Dollar
  "€": "€", // Euro
  "£": "£", // British Pound
  "¥": "¥", // Japanese Yen / Chinese Yuan
  "₩": "₩", // Korean Won
  "A$": "A$", // Australian Dollar
  "C$": "C$", // Canadian Dollar
  "S$": "S$", // Singapore Dollar
  "د.إ": "د.إ", // UAE Dirham
  "₽": "₽", // Russian Ruble
  "R": "R", // South African Rand
  "₺": "₺", // Turkish Lira
  "₴": "₴", // Ukrainian Hryvnia
  "₿": "₿", // Bitcoin
};

const SubscriptionPackages = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Choose Your Plan</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select the perfect plan to boost your selling experience on flipssi.com
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 max-w-7xl mx-auto">
          {plans.slice(0, 6).map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
                plan.popular 
                  ? "border-flipssi-purple shadow-md" 
                  : plan.highlightColor === "blue"
                    ? "border-blue-500"
                    : plan.highlightColor === "green"
                      ? "border-green-500"
                      : plan.highlightColor === "gold"
                        ? "border-yellow-500"
                        : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-flipssi-purple text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                    Popular
                  </div>
                </div>
              )}
              {plan.billingPeriod === "year" && (
                <div className="absolute top-0 left-0">
                  <div className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-br-lg">
                    Annual
                  </div>
                </div>
              )}
              {plan.discountPercentage && (
                <div className="absolute top-0 left-0">
                  <div className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-br-lg">
                    {plan.discountPercentage}% OFF
                  </div>
                </div>
              )}
              {plan.recommendedFor && (
                <div className="absolute top-12 right-0 transform rotate-45 translate-x-12 bg-gray-100 text-xs px-10 py-1 text-gray-700">
                  {plan.recommendedFor}
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  {plan.discountedPrice ? (
                    <div>
                      <span className="text-3xl font-bold">{plan.currency || "₹"}{plan.discountedPrice}</span>
                      <span className="text-gray-500 ml-1">/{plan.billingPeriod || "month"}</span>
                      <div className="mt-1">
                        <span className="text-gray-500 line-through">{plan.currency || "₹"}{plan.price}</span>
                        <span className="text-red-500 ml-2 text-sm font-medium">Save {plan.discountPercentage}%</span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <span className="text-3xl font-bold">{plan.currency || "₹"}{plan.price}</span>
                      <span className="text-gray-500 ml-1">/{plan.billingPeriod || "month"}</span>
                    </div>
                  )}
                </div>
                {plan.maxListings && (
                  <div className="mt-2 text-sm font-medium">
                    {plan.maxListings === -1 ? "Unlimited listings" : `Up to ${plan.maxListings} listings`}
                  </div>
                )}
                {plan.supportLevel && (
                  <div className="mt-1 text-sm text-gray-500">
                    {plan.supportLevel} Support
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className={`mr-2 rounded-full p-1 ${
                        feature.included 
                          ? "bg-green-100 text-green-600" 
                          : "bg-gray-100 text-gray-400"
                      }`}>
                        <Check className="h-4 w-4" />
                      </span>
                      <span className={feature.included ? "text-gray-700" : "text-gray-400"}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  asChild
                  className={`w-full ${
                    plan.popular 
                      ? "bg-flipssi-purple hover:bg-purple-700" 
                      : plan.name === "Free" 
                        ? "bg-flipssi-green hover:bg-green-600" 
                        : plan.highlightColor === "blue"
                          ? "bg-blue-600 hover:bg-blue-700"
                          : plan.highlightColor === "green"
                            ? "bg-green-600 hover:bg-green-700"
                            : plan.highlightColor === "gold"
                              ? "bg-yellow-600 hover:bg-yellow-700"
                              : ""
                  }`}
                >
                  <Link to={plan.path}>{plan.buttonText}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPackages;
