import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/footer";
import Navbar from "./Navbar/navbar";



const FooterLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer/>
      
    </>
  );
};

export default FooterLayout;
