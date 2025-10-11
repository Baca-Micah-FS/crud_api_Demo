import React from "react";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Grades from "./pages/Grades";
import { Route, Routes } from "react-router";
import "./App.css";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Grades" element={<Grades />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
