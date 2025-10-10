import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const API_BASE =
    import.meta.env.VITE_API_BASE || "http://localhost:8000/api/v1";
  const api = axios.create({ baseURL: API_BASE });

  async function getStudents() {
    return api.get("/students");
  }
  async function postStudent(e) {
    e.preventDefault();
  }

  return (
    <>
      <p>DQWA</p>
    </>
  );
}

export default App;
