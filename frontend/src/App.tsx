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
