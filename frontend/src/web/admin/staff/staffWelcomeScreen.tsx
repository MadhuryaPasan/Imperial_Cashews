import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import FinanceSideBar from "@/web/admin/staff/layout/staffSideBar";

const staffWelcomeScreen = () => {
  return (
    <>
      <div className="flex ">
        <div>
          <SidebarProvider>
            <FinanceSideBar />
            <SidebarTrigger className=" md:absolute md:z-99 md:hidden " />
          </SidebarProvider>
        </div>
        <main className=" w-full mx-5 mt-4">
          <div className="flex justify-between">
            <div className="text-3xl font-bold ">Staff Management</div>
          </div>
          <Separator className=" my-4" />
        </main>
      </div>
    </>
  )
}

export default staffWelcomeScreen