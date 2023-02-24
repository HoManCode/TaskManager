import "./App.css";
import React from "react";
import ListUserComponent from "./components/ListUserComponent";
import HeaderComponents from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponents";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateUserComponent from "./components/CreateUserComponent";
import CreateTaskComponent from "./components/CreateTaskComponent";
import ViewUserComponent from "./components/ViewUserComponent";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute"
import HomePage from "./components/HomePage"
import Dashboard from "./components/Dashboard";
import Signup from "./components/Signup";

function App() {
  return (
    <BrowserRouter>
      <HeaderComponents />
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>} 
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
          
          
        </Routes>
      </div>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
