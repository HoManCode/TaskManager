import React, { useState, useEffect } from "react";
import EmployeeService from "../services/EmployeeService";
import { useParams } from "react-router-dom";

function ViewEmployeeComponent() {
  const [employee, setEmployee] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      EmployeeService.getEmployeeById(id)
        .then((res) => {
          setEmployee(res.data);
        })
        .catch((e) => console.log(e));
    }
  }, []);
  return (
    <div>
      <div className="card col-md-6 offset-md-3">
        <h3 className="text-center">View Employee Details</h3>
        <div className="row">
          <label>Employee First Name: </label>
          <div> {employee.firstName} </div>
        </div>
        <div className="row">
          <label>Employee Last Name: </label>
          <div> {employee.lastName} </div>
        </div>
        <div className="row">
          <label>Employee Email: </label>
          <div> {employee.emailId} </div>
        </div>
      </div>
    </div>
  );
}

export default ViewEmployeeComponent;
