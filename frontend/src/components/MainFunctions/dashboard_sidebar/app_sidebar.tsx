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


const app_sidebar = () => {
  let userPosition = "finance";
  let value;

  if (userPosition === "finance") {
    value = [
      {
        title: "Home",
        url: "#",
        icon: Home,
      },
      {
        title: "Bank Books",
        url: "#",
        icon: Book,
        submenus: [
          {
            title: "create",
            url: "#",
          },
          {
            title: "read",
            url: "#",
          },
          {
            title: "update",
            url: "#",
          },
        ],
      },
      {
        title: "Balance Sheet",
        url: "#",
        icon: Sheet,
        submenus: [
          {
            title: "create",
            url: "#",
          },
          {
            title: "read",
            url: "#",
          },
          {
            title: "update",
            url: "#",
          },
        ],
      },
      {
        title: "Petty Cash",
        url: "#",
        icon: Coins,
        submenus: [
          {
            title: "create",
            url: "#",
          },
          {
            title: "read",
            url: "#",
          },
          {
            title: "update",
            url: "#",
          },
        ],
      },
      {
        title: "profit and Loss",
        url: "#",
        icon: ChartAreaIcon,
        submenus: [
          {
            title: "create",
            url: "#",
          },
          {
            title: "read",
            url: "#",
          },
          {
            title: "update",
            url: "#",
          },
        ],
      },
    ];
  }

  else{
    value = [{title: "No data", url: null, icon: FileWarningIcon}]
  }

  // let value;
  // switch (userPosition) {
  //   case "finance":
  //     value = "finance";
  //     break;
  //   case "Quality":
  //     value = "quality";
  //     break;
  //   case "Sales":
  //     value = "sales";
  //     break;
  //   case "staff":
  //     value = "staff";
  //     break;
  //   case "inventory":
  //     value = "inventory";
  //     break;
  //   default:
  //     value = null;
  // }
  // console.log(value);

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
                <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                  <DropdownMenuItem>
                    <span>Acme Inc</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Acme Corp.</span>
                  </DropdownMenuItem>
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
                      onClick={() => console.log(item.title)}
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
