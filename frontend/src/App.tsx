import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import Shop from "./pages/shop";
import Quality from "./pages/quaity";
import Elements from "./pages/elements";
import Access from "./pages/access";

//layouts

import Layout from "./components/layouts/Layout";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          {/* <Route  element={<FooterLayout />}> */}
            <Route element={<Layout />}>

              <Route path="/home" element={<Home />} />
              {/* http://localhost:5173/*/}
              <Route path="/shop" element={<Shop />} />
              {/* http://localhost:5173/#/shop */}
              <Route path="/quality" element={<Quality />} />
              {/* http://localhost:5173/#/quality */}
              <Route path="/elements" element={<Elements />} />
              {/* http://localhost:5173/#/elements */}
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
