
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Heart, 
  MessageCircle, 
  User, 
  CreditCard,
  Bell,
  Plus
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface MenuItem {
  title: string;
  path: string;
  icon: LucideIcon;
}

export interface MenuGroup {
  title: string;
  items: MenuItem[];
}

export const userMenuGroups: MenuGroup[] = [
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
      {
        title: "Create Listing",
        path: "/create-listing",
        icon: Plus,
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
