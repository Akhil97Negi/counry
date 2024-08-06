import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../Pages/HomePage"
import PrivateRoute from "./PrivateRoutes";
import { History } from "../Pages/HistoryPage";
import { Favourite } from "../Pages/FavrouitePage";
import { AuthContextProvider } from "../context/AuthContext";
import { Register } from "../Pages/RegisterPage";
import { Login } from "../Pages/LoginPage";

const AllRoutes = () => {
  return (
    <AuthContextProvider>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route
        path="/favorite"
        element={
          <PrivateRoute>
            <Favourite />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/history"
        element={
          <PrivateRoute>
            <History />
          </PrivateRoute>
        }
      ></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>
    </AuthContextProvider>
  );
};

export { AllRoutes };
