import "./App.css";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "@/web/pages/error/pageNotFound";
import Home from "@/web/pages/home/home";
import Shop from "@/web/pages/shop/shop";
import LayoutMain from "@/web/layout/layout_Main";
import Dashboard from "@/web/admin/dashboard";
import AdminMainLayout from "@/web/admin/layout/adminMainLayout";
import ProductView from "@/web/pages/shop/productView";
import Cart from "@/web/pages/shop/cart";

import FinanceWelcomeScreen from "@/web/admin/finance/financeWelcomeScreen";
import FinanceBalanceSheet from "@/web/admin/finance/subPages/financeBalanceSheet";
import FinanceProfitLoss from "@/web/admin/finance/subPages/financeProfitLoss";
import FinancePettyCash from "@/web/admin/finance/subPages/financePettyCash";
import FinanceBankBook from "@/web/admin/finance/subPages/financeBankBook";

import Inventory from "@/web/admin/inventory/inventoryWelcomeScreen";
import RawMaterialStock from "@/web/admin/inventory/subPages/rawMaterialStock";
import Sales from "@/web/admin/sales/salesWelcomeScreen";
import Staff from "@/web/admin/staff/staffWelcomeScreen";
import QualityControl from "@/web/admin/qualityControl/qualityControlWelcomeScreen";
import RawMaterialCheck from "@/web/admin/qualityControl/subPages/rawMaterialCheck";
import StaffManagement from "@/web/admin/staff/subPages/staff";
import ClientsManagement from "@/web/admin/sales/subPages/clients";
import FinishedProductStock from "@/web/admin/inventory/subPages/finshedProductStock";
import ContactUs from "@/web/pages/contactUs/contactus";
import Pdf from "./web/test/reactpdf/pdf";
import RawMaterialCheckList from "@/web/admin/qualityControl/subPages/rawMaterialCheckList";
import RawMaterialCheckForm from "@/web/admin/qualityControl/subPages/rawMaterialCheckForm";
import FinalProductCheckList from "./web/admin/qualityControl/subPages/FinalProductCheckList";
import FinalProductCheck from "@/web/admin/qualityControl/subPages/FinalProductCheck";
import FinalProductForm from "@/web/admin/qualityControl/subPages/FinalProductForm";
import Sales_orders from "@/web/admin/sales/subPages/sales_orders";
import Sales_Attendance from "./web/admin/staff/subPages/Staff_Attendance";

const ProtectedRoute = ({
  user,
  allowedRoles,
  children,
}: {
  user: { role: string } | null;
  allowedRoles: string[];
  children: React.ReactNode;
}) => {
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/error" />;
  }
  return <>{children}</>;
};

function App() {
  // Temporary user object to simulate authentication
  // In a real application, you would get this from your authentication context or state management
  //change admin or user to test the route
  const currentUser = { role: "admin" };
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/pdf" element={<Pdf />} />

          {/* <Route
              path="/admin"
              element={
                <ProtectedRoute
                user={currentUser}
                allowedRoles={["admin", "finance"]}
                >
                  <Dashboard />
                </ProtectedRoute>
              }
            /> */}
          {/* admin */}
          <Route
            element={
              <ProtectedRoute
                user={currentUser}
                allowedRoles={["admin", "finance"]}
              >
                <AdminMainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/finance" element={<FinanceWelcomeScreen />} />
            <Route path="/admin/inventory" element={<Inventory />} />
            <Route
              path="/admin/inventory/raw-material-stock"
              element={<RawMaterialStock />}
            />
            <Route
              path="/admin/inventory/finished-product-stock"
              element={<FinishedProductStock />}
            />

            <Route path="/admin/sales" element={<Sales />} />
            <Route
              path="/admin/sales/clients-management"
              element={<ClientsManagement />}
            />
            <Route path="/admin/staff" element={<Staff />} />
            <Route
              path="/admin/staff/staff-management"
              element={<StaffManagement />}
            />

            <Route
              path="/admin/sales/sales-attendance"
              element={<Sales_Attendance />}
              />
            
            <Route path="/admin/quality-control" element={<QualityControl />} />
            <Route
              path="/admin/quality-control/raw-material-check"
              element={<RawMaterialCheck />}
            />
            <Route
              path="/admin/quality-control/raw-material-check-form/:id"
              element={<RawMaterialCheckForm />}
            />
            <Route
              path="/admin/quality-control/final-product-check-form/:id"
              element={<FinalProductForm />}
            />

            <Route
              path="/admin/quality-control/raw-material-check-list"
              element={<RawMaterialCheckList />}
            />
            <Route
              path="/admin/quality-control/final-product-check-list"
              element={<FinalProductCheckList />}
            />
            <Route
              path="/admin/quality-control/final-product-check"
              element={<FinalProductCheck />}
            />

            <Route
              path="/admin/finance/balance-sheet"
              element={<FinanceBalanceSheet />}
            />
            <Route
              path="/admin/finance/profit-loss"
              element={<FinanceProfitLoss />}
            />
            <Route
              path="/admin/finance/petty-cash"
              element={<FinancePettyCash />}
            />
            <Route
              path="/admin/finance/bank-book"
              element={<FinanceBankBook />}
            />
            <Route
              path="/admin/sales/sales-orders"
              element={<Sales_orders />}
            />
          </Route>
          <Route element={<LayoutMain />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/product/:id" element={<ProductView />} />
            <Route path="/shop/cart" element={<Cart />} />
            <Route path="/contact" element={<ContactUs />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;

// import Home from "./pages/home";
// import Shop from "./pages/shop";
// import ShopProduct from "./pages/shop/productRead";
// import ShopCart from "./pages/shop/cart";

// import Quality from "./pages/quality";

// import Elements from "./pages/elements";
// import Access from "./pages/access";

// import Dashboard from "./pages/dashboard";
// import Page_not_found from "./pages/page_not_found";

// //layouts

// import Layout_Main from "./components/layouts/Layout_main";
// import Layout_dashboard from "./components/layouts/Layout_dashboard";

// //temporary
// import Finance_management from "./pages/MainFunctions/Finance/finance_management";
// import Inventory_management from "./pages/MainFunctions/Inventory/inventory_management";
// import Sales_management from "./pages/MainFunctions/Sales/sales_management";
// import Staff_management from "./pages/MainFunctions/Staff/staff_management";
// import Quality_control from "./pages/MainFunctions/QualityControl/Quality_control";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";

// <Routes>
//   {/* <Route  element={<FooterLayout />}> */}

//   <Route path="*" element={<Page_not_found />} />
//   <Route element={<Layout_Main />}>
//     <Route path="/home" element={<Home />} />
//     {/* http://localhost:5173/*/}
//     <Route path="/shop" element={<Shop />} />
//     <Route path="/shop/product/:id" element={<ShopProduct />} />
//     <Route path="/shop/cart" element={<ShopCart />} />
//     {/* http://localhost:5173/#/shop */}
//     <Route path="/quality" element={<Quality />} />
//     {/* http://localhost:5173/#/shop */}
//     <Route path="/elements" element={<Elements />} />
//     {/* http://localhost:5173/#/elements */}

//     {/* dashboard */}
//   </Route>
//     <Route element={<Layout_dashboard />}>
//       <Route path="/dashboard" element={<Dashboard />} />
//       <Route path="/finance_management" element={<Finance_management />} />
//       <Route path="/inventory_management" element={<Inventory_management />} />
//       <Route path="/sales_management" element={<Sales_management />} />
//       <Route path="/staff_management" element={<Staff_management />} />
//       <Route path="/quality_control" element={<Quality_control />} />

//       {/* http://localhost:5173/#/dashboard */}
//     </Route>
//   <Route path="/" element={<Access />} />
//   {/* http://localhost:5173/#/access */}
//   {/* </Route> */}
