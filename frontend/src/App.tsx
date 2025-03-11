import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import Shop from "./pages/shop";
import Quality from "./pages/quaity";

//layouts
import Layout from "./components/layouts/Layout";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/quality" element={<Quality />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
