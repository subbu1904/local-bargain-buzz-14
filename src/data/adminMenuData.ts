
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  Settings, 
  BarChart4, 
  AlertTriangle,
  FileText,
  CreditCard,
  Bell,
  Shield,
  MessageSquare,
  HelpCircle,
  Search,
  Plus
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface MenuItem {
  title: string;
  path: string;
  icon: LucideIcon;
  badge?: number | string;
}

export interface MenuGroup {
  title: string;
  items: MenuItem[];
}

export const adminMenuGroups: MenuGroup[] = [
  {
    title: "Main",
    items: [
      {
        title: "Dashboard",
        path: "/admin",
        icon: LayoutDashboard,
      },
      {
        title: "Users",
        path: "/admin/users",
        icon: Users,
        badge: 12
      },
      {
        title: "Listings",
        path: "/admin/listings",
        icon: ShoppingBag,
        badge: 24
      },
      {
        title: "Add Listing",
        path: "/admin/listings/create",
        icon: Plus
      }
    ],
  },
  {
    title: "Analytics",
    items: [
      {
        title: "Reports",
        path: "/admin/reports",
        icon: BarChart4,
      },
      {
        title: "Activity",
        path: "/admin/activity",
        icon: AlertTriangle,
      },
      {
        title: "Search Data",
        path: "/admin/search-analytics",
        icon: Search
      }
    ],
  },
  {
    title: "Communication",
    items: [
      {
        title: "Messages",
        path: "/admin/messages",
        icon: MessageSquare,
        badge: 5
      },
      {
        title: "Notifications",
        path: "/admin/notifications",
        icon: Bell,
        badge: 3
      }
    ]
  },
  {
    title: "Finance",
    items: [
      {
        title: "Payments",
        path: "/admin/payments",
        icon: CreditCard
      },
      {
        title: "Security",
        path: "/admin/security",
        icon: Shield
      }
    ]
  },
  {
    title: "System",
    items: [
      {
        title: "Settings",
        path: "/admin/settings",
        icon: Settings,
      },
      {
        title: "Logs",
        path: "/admin/logs",
        icon: FileText,
      },
      {
        title: "Help",
        path: "/admin/help",
        icon: HelpCircle
      }
    ],
  },
];
