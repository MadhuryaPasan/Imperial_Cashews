import { Outlet } from "react-router-dom";

import Navbar from "@/web/layout/components/navbar";



const FooterLayout = () => {
  return (
    <>
      <div className="sticky top-0 z-99">
        <Navbar/>
      </div>
      
        <Outlet /> 
    </>
  );
};

export default FooterLayout;
