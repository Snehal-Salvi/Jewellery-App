import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Search from "./components/Search/Search";
import SignUp from "./components/Auth/SignUp";
import SignIn from "./components/Auth/SignIn";
import CompanyDetails from "./components/CompanyDetails/CompanyDetails";

function App() {
  return (
    // BrowserRouter provides the routing infrastructure for React application.
    <BrowserRouter>
      <Navbar /> {/* Render the Navbar component */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Route for Home component */}
        <Route path="/signup" element={<SignUp />} />{" "}
        {/* Route for SignUp component */}
        <Route path="/signin" element={<SignIn />} />{" "}
        {/* Route for SignIn component */}
        <Route path="/search" element={<Search />} />{" "}
        {/* Route for Search component */}
        <Route path="/company/:id" element={<CompanyDetails />} />{" "}
        {/* Dynamic route for CompanyDetails component */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
