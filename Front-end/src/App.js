import "./App.css";
import React from "react";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import HeaderComponents from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponents";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateEmployeeComponent from "./components/CreateEmployeeComponent";
import ViewEmployeeComponent from "./components/ViewEmployeeComponent";

function App() {
  return (
    <BrowserRouter>
      <HeaderComponents />
      <div className="container">
        <Routes>
          <Route path="/" element={<ListEmployeeComponent />} />
          <Route path="/employees" element={<ListEmployeeComponent />} />
          <Route path="/add-employee/" element={<CreateEmployeeComponent />} />
          <Route
            path="/add-employee/:id"
            element={<CreateEmployeeComponent />}
          />
          <Route
            path="/view-employee/:id"
            element={<ViewEmployeeComponent />}
          />
        </Routes>
      </div>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
