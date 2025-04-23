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
    url: "/admin/quality-control",
    icon: LayoutDashboard,
  },
  {
    title: "Raw Material Check List",
    url: "/admin/quality-control/raw-material-check-list",
    icon: LayoutDashboard,
  },
  {
    title: "Raw Material Check",
    url: "/admin/quality-control/raw-material-check",
    icon: LayoutDashboard,
  },
  {
    title: "Final Product Check List",
    url: "/admin/quality-control/final-product-check-list",
    icon: LayoutDashboard,
  },
  {
    title: "Final Product Check",
    url: "/admin/quality-control/final-product-check",
    icon: LayoutDashboard,
  },
  
  
  
];

const qualityControlSideBar = () => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarGroupLabel className=" text-lg">Quality Control </SidebarGroupLabel>
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

export default qualityControlSideBar;
