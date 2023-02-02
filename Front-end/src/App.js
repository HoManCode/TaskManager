import "./App.css";
import React from "react";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import HeaderComponents from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponents";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateEmployeeComponent from "./components/CreateEmployeeComponent";
import ViewEmployeeComponent from "./components/ViewEmployeeComponent";
import LogIn from "./components/LogIn";
import PrivateRoute from "./components/PrivateRoute"
import HomePage from "./components/HomePage"
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <HeaderComponents />
      <div className="container">
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={
            //<PrivateRoute>
              <Dashboard />}
            //</PrivateRoute>} 
          />
          <Route path="/employees" element={
            <PrivateRoute>
              <ListEmployeeComponent />
            </PrivateRoute>} 
          />
        
          <Route path="/add-employee/" element={
            <PrivateRoute>
              <CreateEmployeeComponent />
            </PrivateRoute>} 
          />
          <Route path="/add-employee/:id" element={
            <PrivateRoute>
              <CreateEmployeeComponent />
            </PrivateRoute>}
          />
          <Route path="/view-employee/:id" element={
            <PrivateRoute>
              <ViewEmployeeComponent />
            </PrivateRoute>}
          />
          
          
        </Routes>
      </div>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
