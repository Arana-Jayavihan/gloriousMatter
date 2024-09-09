// src/App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Notes from "./components/Notes";
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/notes" element={<Notes />} />
      {/* Add other routes here */}
    </Routes>
  );
}

export default App;
