
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  Settings, 
  BarChart4, 
  AlertTriangle,
  FileText
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
      },
      {
        title: "Listings",
        path: "/admin/listings",
        icon: ShoppingBag,
      },
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
    ],
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
    ],
  },
];
