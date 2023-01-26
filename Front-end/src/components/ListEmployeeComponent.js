import React, { useEffect, useState } from "react";
import EmployeeService from "../services/EmployeeService";
import { Link, useNavigate } from "react-router-dom";

const ListEmployeeComponent = () => {
  const [employeeArray, setEmployeeArray] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllEmployee();
  }, []);

  function getAllEmployee() {
    EmployeeService.getEmployees()
      .then((res) => {
        setEmployeeArray(res.data);
        console.log(res);
      })
      .catch((e) => console.log(e));
  }

  function deleteEmployee(e, id) {
    e.preventDefault();
    EmployeeService.deleteEmployeeById(id)
      .then(
        setEmployeeArray(
          employeeArray.filter((employee) => employee.email === id)
        )
      )
      .catch((e) => console.log(e));
  }

  const toVeiwEmployee = (id) => {
    let path = `/view-employee/${id}`;
    navigate(path);
  };

  return (
    <div className="container">
      <a href="/add-employee">
        <button className="btn btn-primary mb-2 mt-3">Add Employee</button>
      </a>
      <h2 className="text-center">Employees List</h2>

      <div className="row">
        <table className="table table-striped tabled-bordered">
          <thead>
            <tr>
              <th> Employee First Name</th>
              <th> Employee Last Name</th>
              <th> Employee Email</th>
              <th> Actions</th>
            </tr>
          </thead>
          <tbody>
            {employeeArray.map((employee) => (
              <tr key={employee.id}>
                <td> {employee.firstName} </td>
                <td> {employee.lastName} </td>
                <td> {employee.email} </td>
                <td>
                  <Link
                    to={`/add-employee/${employee.id}`}
                    className="btn btn-info"
                    href=""
                  >
                    Update
                  </Link>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={(e) => deleteEmployee(e, employee.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => toVeiwEmployee(employee.id)}
                    className="btn btn-info"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ListEmployeeComponent;
