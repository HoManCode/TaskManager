import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

const CreateEmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const employeeData = { firstName, lastName, emailId };

  function saveEmployee(e) {
    e.preventDefault();

    if (
      employeeData.firstName !== "" &&
      employeeData.lastName !== "" &&
      employeeData.emailId !== ""
    ) {
      if (id) {
        EmployeeService.updateEmployee(id, employeeData)
          .then(navigate("/employees"))
          .catch((e) => console.log(e));
      } else {
        EmployeeService.saveEmployee(employeeData)
          .then(navigate("/employees"))
          .catch((e) => console.log(e));
      }
    } else {
      alert("Please, fill in all inputes");
    }
  }

  function tile() {
    if (id) {
      return "Update Employee";
    } else {
      return "Add Employee";
    }
  }

  useEffect(() => {
    if (id) {
      EmployeeService.getEmployeeById(id)
        .then((res) => {
          setFirstName(res.data.firstName);
          setLastName(res.data.lastName);
          setEmailId(res.data.emailId);
        })
        .catch((e) => console.log(e));
    }
  }, []);

  const routeChange = () => {
    let path = "/employees";
    navigate(path);
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3">
            <h2 className="text-center">{tile()}</h2>
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <input
                    className="form-control"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                    placeholder="Enter First Name"
                  />
                </div>
                <div className="form-group mb-2">
                  <input
                    className="form-control"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    placeholder="Enter Last Name"
                  />
                </div>
                <div className="form-group mb-2">
                  <input
                    className="form-control"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                    type="email"
                    placeholder="Enter Email"
                  />
                </div>
                <button
                  onClick={(e) => saveEmployee(e)}
                  className="btn btn-success"
                >
                  Save
                </button>{" "}
                <button className="btn btn-danger" onClick={routeChange}>
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployeeComponent;
