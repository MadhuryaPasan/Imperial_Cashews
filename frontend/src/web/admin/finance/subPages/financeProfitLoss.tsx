import { SidebarProvider } from "@/components/ui/sidebar";
import FinanceSideBar from "@/web/admin/finance/layout/financeSideBar";

const financeProfitLoss = () => {
  return (
    <>
      <div className="flex ">
        <div>
          <SidebarProvider>
            <FinanceSideBar />
          </SidebarProvider>
        </div>
        <div>
          <div className="">financeProfitLoss</div>
        </div>
      </div>
    </>
    
  )
}

export default financeProfitLoss