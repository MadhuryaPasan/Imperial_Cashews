import { Outlet } from "react-router-dom";
import FloatingNavBtns from "@/web/admin/layout/components/floatingNavBtns";

const adminMainLayout = () => {
  return (
    <>
      
        <Outlet />
        <FloatingNavBtns />
      
    </>
  );
};

export default adminMainLayout;
