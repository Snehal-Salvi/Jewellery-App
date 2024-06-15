import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";

import Search from "./components/Search/Search";
 
import SignUp from "./components/Auth/SignUp";
import SignIn from "./components/Auth/SignIn";
import CompanyDetails from "./components/CompanyDetails/CompanyDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/search" element={<Search />} />
        <Route path="/company/:id" element={<CompanyDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
