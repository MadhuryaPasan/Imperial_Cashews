import { SidebarProvider } from "@/components/ui/sidebar";
import FinanceSideBar from "@/web/admin/finance/layout/financeSideBar";

const financePettyCash = () => {
  return (
    <>
      <div className="flex ">
        <div>
          <SidebarProvider>
            <FinanceSideBar />
          </SidebarProvider>
        </div>
        <div>
          <div className="">financePettyCash</div>
        </div>
      </div>
    </>
  )
}

export default financePettyCash