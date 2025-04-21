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
  {
    title: "Home",
    url: "/admin/inventory",
    icon: LayoutDashboard,
  },
  {
    title: "Raw Material Stock",
    url: "/admin/inventory/raw-material-stock",
    icon: Receipt,
  },
  {
    title: "Finished Product Stock",
    url: "/admin/inventory/finished-product-stock",
    icon: Receipt,
  },
  // {
  //   title: "Finished Goods Stock",
  //   url: "/admin/inventory/finished-goods-stock",
  //   icon: LineChart,
  // },
  // {
  //   title: "Stock Adjustment",
  //   url: "/admin/inventory/stock-adjustment",
  //   icon: CreditCard,
  // },
  // {
  //   title: "Inventory Settings",
  //   url: "/admin/inventory/settings",
  //   icon: Settings,
  // },
  // {
  //   title: "Logout",
  //   url: "/logout",
  //   icon: LogOut,
  // },
];

const inventorySideBar = () => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarGroupLabel className=" text-lg">Inventory Management</SidebarGroupLabel>
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

export default inventorySideBar;
