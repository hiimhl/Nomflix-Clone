import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/tv/*" element={<Tv />} />
        <Route path="/search/*" element={<Search />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
