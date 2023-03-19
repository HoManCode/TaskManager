import "./App.css";
import React, { useEffect, useState } from "react";
import ListUserComponent from "./components/ListUserComponent";
import HeaderComponents from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateUserComponent from "./components/CreateUserComponent";
import CreateTaskComponent from "./components/CreateTaskComponent";
import ViewUserComponent from "./components/ViewUserComponent";
import ViewTaskComponent from "./components/ViewTaskComponent";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute"
import HomePage from "./components/HomePage"
import EmployeeDashboard from "./components/EmployeeDashboard";
import ManagerDashboard from "./components/ManagerDashboard";
import AdminDashboard from "./components/AdminDashboard";
import Signup from "./components/Signup";
import jwt_decode from "jwt-decode";
import { useUser } from "./services/UserProvider";

function App() {
  const [roles, setRoles] = useState([]);
  const user = useUser();

  useEffect(() =>{
    setRoles(getRolesFromJWT());
  },[user.jwt]);

  function getRolesFromJWT() {
    if(user.jwt){
      const decodedJwt = jwt_decode(user.jwt);
      return decodedJwt.authorities;
    }
    return [];
  }
  return (
    <BrowserRouter>
      <HeaderComponents />
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<HomePage />} />
          <Route
            path="/admins/dashboard"
            element={
            roles.find((role) => role === "ROLE_ADMIN") ? (
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            ) : (
            <div>You don't have the appropriate role.</div>
            )
        }
        />
          <Route
            path="/employees/dashboard"
            element={
            roles.find((role) => role === "ROLE_EMPLOYEE") ? (
              <PrivateRoute>
                <EmployeeDashboard />
              </PrivateRoute>
            ) : (
            <div>You don't have the appropriate role.</div>
            )
        }
        />
          <Route
          path="/managers/dashboard"
          element={
            roles.find((role) => role === "ROLE_MANAGER") ? (
              <PrivateRoute>
                <ManagerDashboard />
              </PrivateRoute>
            ) : (
              <div>You don't have the appropriate role.</div>
            )
          }
          />
          <Route path="/Users" element={
            <PrivateRoute>
              <ListUserComponent />
            </PrivateRoute>} 
          />
        
          <Route path="/add-User/" element={
            <PrivateRoute>
              <CreateUserComponent />
            </PrivateRoute>} 
          />
          <Route path="/add-User/:id" element={
            <PrivateRoute>
              <CreateUserComponent />
            </PrivateRoute>}
          />
          <Route path="/view-User/:id" element={
            <PrivateRoute>
              <ViewUserComponent />
            </PrivateRoute>}
          />
          <Route path="/add-Task/:id" element={
            <PrivateRoute>
              <CreateTaskComponent />
            </PrivateRoute>}
          />

          <Route path="/add-Task" element={
            <PrivateRoute>
              <CreateTaskComponent />
            </PrivateRoute>}
          />

          <Route path="/view-Task/:id" element={
            <PrivateRoute>
              <ViewTaskComponent />
            </PrivateRoute>}
          />
          
          
        </Routes>
      </div>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
