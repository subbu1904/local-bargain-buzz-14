
import { ReactNode } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface MenuItemType {
  title: string;
  path: string;
  icon: LucideIcon;
}

interface MenuGroupType {
  title: string;
  items: MenuItemType[];
}

interface DashboardLayoutProps {
  children: ReactNode;
  menuGroups: MenuGroupType[];
  role: "admin" | "user";
}

const DashboardLayout = ({ children, menuGroups, role }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full">
        <Navbar />
        <div className="flex flex-1 w-full">
          <DashboardSidebar menuGroups={menuGroups} role={role} />
          <main className="flex-1 p-6 bg-gray-50">
            <div className="container mx-auto">
              <div className="flex items-center mb-6">
                <SidebarTrigger className="mr-2" />
                <h1 className="text-2xl font-bold">{role === "admin" ? "Admin Dashboard" : "My Account"}</h1>
              </div>
              {children}
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
};

interface DashboardSidebarProps {
  menuGroups: MenuGroupType[];
  role: "admin" | "user";
}

const DashboardSidebar = ({ menuGroups, role }: DashboardSidebarProps) => {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="text-lg font-semibold text-center">
          {role === "admin" ? "Admin Panel" : "My Account"}
        </div>
      </SidebarHeader>
      <SidebarContent>
        {menuGroups.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <Link to={item.path}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="text-xs text-center text-gray-500">
          {role === "admin" ? "Admin Dashboard v1.0" : "Customer Portal v1.0"}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardLayout;
