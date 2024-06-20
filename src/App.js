import React from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import DataTable from "./components/DataTable.js";
import ResponsiveAppBar from "./components/ResponsiveAppBar.js";
import Register from "./components/Register.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    // eslint-disable-next-line
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/employe/table"
            element={
              <>
                <ResponsiveAppBar /> <DataTable />
              </>
            }
          />
          <Route
            path="/employe/register"
            element={
              <>
                <ResponsiveAppBar /> <Register />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
      {/* <Login /> */}
      {/* <SignUp /> */}
      {/* <DataTable /> */}
      {/* <ResponsiveAppBar /> */}
      {/* <DataTable /> */}
      {/* <Register/> */}
    </div>
  );
}

export default App;
