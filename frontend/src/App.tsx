import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import Shop from "./pages/shop";

import Quality from "./pages/quality";

import Elements from "./pages/elements";
import Access from "./pages/access";

import Dashboard from "./pages/dashboard";

//layouts

import Layout_Main from "./components/layouts/Layout_main";
import Layout_dashboard from "./components/layouts/Layout_dashboard";


//temporary
import Finance_management from "./pages/MainFunctions/Finance/finance_management";
import Inventory_management from "./pages/MainFunctions/Inventory/inventory_management";
import Sales_management from "./pages/MainFunctions/Sales/sales_management";
import Staff_management from "./pages/MainFunctions/Staff/staff_management";
import Quality_control from "./pages/MainFunctions/QualityControl/Quality_control";




function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          {/* <Route  element={<FooterLayout />}> */}
          <Route element={<Layout_Main />}>
            <Route path="/home" element={<Home />} />
            {/* http://localhost:5173/*/}
            <Route path="/shop" element={<Shop />} />
            {/* http://localhost:5173/#/shop */}
            <Route path="/quality" element={<Quality />} />
            {/* http://localhost:5173/#/shop */}
            <Route path="/elements" element={<Elements />} />
            {/* http://localhost:5173/#/elements */}

            {/* dashboard */}
          </Route>
            <Route element={<Layout_dashboard />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/finance_management" element={<Finance_management />} />
              <Route path="/inventory_management" element={<Inventory_management />} />
              <Route path="/sales_management" element={<Sales_management />} />
              <Route path="/staff_management" element={<Staff_management />} />
              <Route path="/quality_control" element={<Quality_control />} />

              {/* http://localhost:5173/#/dashboard */}
            </Route>
          <Route path="/" element={<Access />} />
          {/* http://localhost:5173/#/access */}
          {/* </Route> */}
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
