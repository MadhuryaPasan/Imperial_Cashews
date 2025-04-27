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
  //   url: "/admin/finance",
  //   icon: LayoutDashboard,
  // },
  {
    title: "Balance Sheet",
    url: "/admin/finance/balance-sheet",
    icon: DollarSign,
  },
  {
    title: "Profit & Loss",
    url: "/admin/finance/profit-loss",
    icon: LineChart,
  },
  {
    title: "Petty Cash",
    url: "/admin/finance/petty-cash",
    icon: Receipt,
  },
  {
    title: "Bank Book",
    url: "/admin/finance/bank-book",
    icon: CreditCard,
  },
];

const financeSideBar = () => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarGroupLabel className=" text-lg">Finance Management</SidebarGroupLabel>
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

export default financeSideBar;
