import { useState } from "react";
import { AllRoutes } from "./routes/AllRoutes";
import "./App.css";
import { Navbar } from "./components/Navbar.jsx";


function App() {
  return (
    <>
      <Navbar />
      <AllRoutes />
    </>
  );
}

export default App;
