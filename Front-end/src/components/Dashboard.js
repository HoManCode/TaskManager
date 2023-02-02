import React, { useEffect, useState } from "react";
import EmployeeService from "../services/EmployeeService";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [taskArray, setTaskArray] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllEmployee();
  }, []);

  function getAllEmployee() {
    EmployeeService.getEmployees()
      .then((res) => {
        setTaskArray(res.data);
        console.log(res);
      })
      .catch((e) => console.log(e));
    }

  const toVeiwEmployee = (id) => {
    let path = `/view-employee/${id}`;
    navigate(path);
  };

  return (
    <div className="container">
      <a href="/add-employee">
        <button className="btn btn-primary mb-2 mt-3">Create New Task</button>
      </a>
      <h2 className="text-center">My Tasks</h2>

      <div className="row">
        <table className="table table-striped tabled-bordered">
          <thead>
            <tr>
              <th> Task ID</th>
              <th> Task Description</th>
              <th> Task Due Date</th>
              <th> Task Story Points</th>
            </tr>
          </thead>
          <tbody>
            {taskArray.map((employee) => (
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
export default Dashboard;
