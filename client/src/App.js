import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Products from "./Components/Data/Products";
import Details from "./Components/Data/Detail";

function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  </>;
}

export default App;
