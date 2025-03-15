import { Outlet } from "react-router-dom";

import Sidebar from "../MainFunctions/dashboard_sidebar/app_sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import Footer from "./Footer/footer";
import Navbar from "./Navbar/navbar";

const Layout_dashboard = () => {
  return (
    <>
      <SidebarProvider>
        <Sidebar />
        <SidebarInset>
          <Navbar />
          <Outlet />
        </SidebarInset>
      </SidebarProvider>

      {/* <Footer /> */}
    </>
  );
};

export default Layout_dashboard;
