import { ChevronsRight } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { returnAllCategory } from "@/utils/API/sales/Sales_Product_Categories_API";
import { Separator } from "@/components/ui/separator";

const sidebar = ({
  onSelectCategory,
}: {
  onSelectCategory: (category:string | null) => void;
}) => {

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup className="top-20">
            <SidebarGroupLabel className=" text-lg font-bold mb-5">
              Categories
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-5">
                {/* all products */}
                <SidebarMenuItem key={"all"} className=" hover:translate-y-1 active:scale-105  transition-all duration-300 ease-initial hover:shadow-lg">
                  <SidebarMenuButton onClick={() => onSelectCategory(null)} >
                  <ChevronsRight/>

                    <span>{"All"}</span>
                  </SidebarMenuButton>
                <Separator/>
                </SidebarMenuItem>
                {returnAllCategory().map((item) => (
                  <>
                    <SidebarMenuItem key={item._id} className=" hover:translate-y-1 active:scale-105  transition-all duration-300 ease-initial hover:shadow-lg">
                      <SidebarMenuButton
                        onClick={() => onSelectCategory(item.name)}
                      >
                        
                        <ChevronsRight/>
                        <span>{item.name}</span>
                      </SidebarMenuButton>
                    <Separator  />
                    </SidebarMenuItem>
                  </>
                  
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarTrigger className=" hidden md:block" />
        </SidebarFooter>
      </Sidebar>
    </>
  );
};

export default sidebar;
