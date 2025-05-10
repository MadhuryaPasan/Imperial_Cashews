import { Outlet } from "react-router-dom";

import Navbar from "@/web/layout/components/navbar";
import Footer from "@/web/layout/components/footer";



const FooterLayout = () => {
  return (
    <>
      <div className="sticky top-0 z-99">
        <Navbar/>
      </div>
      
        <Outlet /> 
        {/* <Footer/> */}
    </>
  );
};

export default FooterLayout;
