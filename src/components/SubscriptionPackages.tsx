
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
    ],
    buttonText: "Start Free",
    path: "/dashboard",
    currency: "$",
    billingPeriod: "month",
  },
  {
    name: "Starter",
    price: 4.99,
    description: "Perfect for new sellers",
    features: [
      { text: "Post up to 15 listings", included: true },
      { text: "Improved listing visibility", included: true },
      { text: "Email support", included: true },
      { text: "Featured listings (1 per month)", included: true },
      { text: "Priority search results", included: false },
    ],
    buttonText: "Go Starter",
    path: "/dashboard/payments",
    currency: "$",
    billingPeriod: "month",
  },
  {
    name: "Premium",
    price: 9.99,
    description: "Enhanced features for regular sellers",
    features: [
      { text: "Unlimited listings", included: true },
      { text: "Higher listing visibility", included: true },
      { text: "Priority support", included: true },
      { text: "Featured listings", included: true },
      { text: "Priority search results", included: false },
    ],
    buttonText: "Upgrade Now",
    popular: true,
    path: "/dashboard/payments",
    currency: "$",
    billingPeriod: "month",
  },
  {
    name: "Pro",
    price: 19.99,
    description: "Advanced features for power sellers",
    features: [
      { text: "Unlimited listings", included: true },
      { text: "Maximum listing visibility", included: true },
      { text: "24/7 VIP support", included: true },
      { text: "Featured listings", included: true },
      { text: "Priority search results", included: true },
    ],
    buttonText: "Go Pro",
    path: "/dashboard/payments",
    currency: "$",
    billingPeriod: "month",
  },
  {
    name: "Business",
    price: 499.99,
    description: "Enterprise solutions for large sellers",
    features: [
      { text: "Unlimited listings with bulk upload", included: true },
      { text: "Premium store profile", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "Advanced analytics dashboard", included: true },
      { text: "API access for integration", included: true },
    ],
    buttonText: "Contact Sales",
    path: "/dashboard/payments",
    currency: "$",
    billingPeriod: "year",
  },
];

// Option to display prices in different currencies
const currencyOptions = {
  "$": "$",
  "₹": "₹",
  "€": "€",
  "£": "£",
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
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
                plan.popular 
                  ? "border-flipssi-purple shadow-md" 
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
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plan.currency || "$"}{plan.price}</span>
                  <span className="text-gray-500 ml-1">/{plan.billingPeriod || "month"}</span>
                </div>
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
                        : plan.name === "Business"
                          ? "bg-blue-600 hover:bg-blue-700"
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
