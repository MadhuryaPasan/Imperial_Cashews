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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Book,
  BookDashed,
  BoxSelect,
  Calendar,
  ChartAreaIcon,
  ChevronDown,
  Coins,
  DotSquare,
  FileWarningIcon,
  Home,
  Inbox,
  Search,
  Settings,
  Sheet,
  SquareArrowLeftIcon,
} from "lucide-react";
import { useState } from "react";





const app_sidebar = () => {
  let value;

  // workpace options
  const workspaceOptions = [
    { title: "Finance" },
    { title: "Sales" },
    { title: "Quality Control" },
    { title: "inventory" },
    { title: "staff" },
  ];

  // workspace options set
  const [workspace, setWorkspace] = useState("Finance");

  if ("Finance" === workspace) {
    value = [
      {
        title: "Bank Books",
        url: "testbankbooks",
        icon: Book,
      },
      {
        title: "Balance Sheet",
        url: "Finance_BalanceSheet_Table",
        icon: Sheet,
      },
      {
        title: "Petty Cash",
        url: "Finance_PettyCash_Table",
        icon: Coins,
      },
      {
        title: "profit and Loss",
        url: "#",
        icon: ChartAreaIcon,
      },
    ];
  } else {
    value = [{ title: "No data", url: null, icon: FileWarningIcon }];
  }



  // session
  const [active, setActive] = useState("test");

  localStorage.setItem("sidebarToken", active);

  return (
    <>
      {/* <Sidebar className=" z-0 pt-20">{sidebar_finance(userPosition)}</Sidebar> */}
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <DotSquare />
                    Select Workspace
                    <ChevronDown className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56"> 
                  {workspaceOptions.map((item: any) => (
                    <DropdownMenuItem onClick={() => setWorkspace(item.title)}>
                      <span>{item.title}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Options</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {value.map((item: any, index: any) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton
                      className="hover:text-primary cursor-pointer"
                      onClick={() => setActive(item.url)}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>

                    {item.submenus?.map((submenu: any, index: any) => (
                      <SidebarMenuSub key={index}>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            className="hover:text-primary cursor-pointer"
                            onClick={() => console.log(submenu.title)}
                          >
                            {submenu.title}
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    ))}
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
    </>
  );
};

export default app_sidebar;

// {
//   title: "Balance Sheet",
//   url: "#",
//   icon: Sheet,
//   submenus: [
//     {
//       title: "create",
//       url: "#",
//     },
//     {
//       title: "read",
//       url: "#",
//     },
//     {
//       title: "update",
//       url: "#",
//     },
//   ],
// },
