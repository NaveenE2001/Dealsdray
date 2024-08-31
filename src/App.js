import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import DataTable from "./components/DataTable";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute.js"; // Import the ProtectedRoute component
import Forgotpassword from "./components/Forgotpassword.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgotpassword />} />
        <Route
          path="/employe/table"
          element={
            <ProtectedRoute
              element={
                <>
                  <ResponsiveAppBar /> <DataTable />
                </>
              }
            />
          }
        />
        <Route
          path="/employe/register"
          element={
            <ProtectedRoute
              element={
                <>
                  <ResponsiveAppBar /> <Register />
                </>
              }
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
