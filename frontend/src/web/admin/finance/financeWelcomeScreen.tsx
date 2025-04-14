import { SidebarProvider } from "@/components/ui/sidebar";
import FinanceSideBar from "@/web/admin/finance/layout/financeSideBar";

const financeWelcomeScreen = () => {
  return (
    <>
      <div className="flex ">
        <div>
          <SidebarProvider>
            <FinanceSideBar />
          </SidebarProvider>
        </div>
        <div>
          <div className="">financeWelcomeScreen</div>
        </div>
      </div>
    </>
  );
};

export default financeWelcomeScreen;
