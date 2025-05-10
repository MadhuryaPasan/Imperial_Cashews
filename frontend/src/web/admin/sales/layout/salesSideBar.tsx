import { LayoutDashboard, DollarSign, Receipt, LineChart, CreditCard, Settings, LogOut } from "lucide-react"

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
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";


// Menu items.
const items = [
  // {
  //   title: "Home",
  //   url: "/admin/sales",
  //   icon: LayoutDashboard,
  // },
  {
    title: "All Clients",
    url: "/admin/sales/clients-management",
    icon: LayoutDashboard,
  },
  {
    title: "Orders",
    url: "/admin/sales/sales-orders",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    url: "/admin/sales/sales-products",
    icon: LayoutDashboard,
  },
  
];

const salesSideBar = () => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarGroupLabel className=" text-lg">Sales Management</SidebarGroupLabel>
      </SidebarHeader>
      <Separator/>
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu className="gap-4">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarTrigger />
      </SidebarFooter>
    </Sidebar>
  );
};

export default salesSideBar;
