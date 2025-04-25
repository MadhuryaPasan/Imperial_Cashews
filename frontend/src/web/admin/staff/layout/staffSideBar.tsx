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
    url: "/admin/staff",
    icon: LayoutDashboard,
  },
  {
    title: "All Staff",
    url: "/admin/staff/staff-management",
    icon: LayoutDashboard,
  },
  {
    title: "Attendance",
    url: "/admin/sales/sales-attendance",
    icon: LayoutDashboard,
  },
  
];

const staffSideBar = () => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarGroupLabel className=" text-lg">Staff Management</SidebarGroupLabel>
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

export default staffSideBar;
