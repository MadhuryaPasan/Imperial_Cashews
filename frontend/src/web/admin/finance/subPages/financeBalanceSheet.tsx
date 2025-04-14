import { SidebarProvider } from "@/components/ui/sidebar";
import FinanceSideBar from "@/web/admin/finance/layout/financeSideBar";
const financeBalanceSheet = () => {
  return (
    <>
      <div className="flex ">
        <div>
          <SidebarProvider>
            <FinanceSideBar />
          </SidebarProvider>
        </div>
        <div>
          <div className="">financeBalanceSheet</div>
        </div>
      </div>
    </>
    
  )
}

export default financeBalanceSheet