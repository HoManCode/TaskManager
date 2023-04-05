import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../services/UserService";
import DropdownOptions from "./DropdownOptions";
import DashNav from "../services/DashNav";
import jwt_decode from "jwt-decode";
import { useUser } from '../services/UserProvider';

const CreateUserComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useUser();
  const [authorities, setAuthorities] = useState(null);

  const UserData = { firstName, lastName, username,role };
  const options= [
    {value:"ROLE_ADMIN",label:"ADMIN"},
    {value:"ROLE_MANAGER",label:"MANAGER"},
    {value:"ROLE_EMPLOYEE",label:"EMPLOYEE"},
  ]

  useEffect(() => {
    if (user && user.jwt) {
      const decodedJwt = jwt_decode(user.jwt);
      setAuthorities(decodedJwt.authorities);
    }
  }, [user, user.jwt]);

  function saveUser(e) {
    e.preventDefault();

    if (
      UserData.firstName !== "" &&
      UserData.lastName !== "" &&
      UserData.username !== "" &&
      UserData.role !== ""
    ) {
      if (id) {
        UserService.updateUser(id,user.jwt, UserData)
        .then(DashNav(authorities[0],navigate))
        .catch((e) => console.log(e));
      } else {
        UserService.saveUser(UserData)
        .then(DashNav(authorities[0],navigate))
        .catch((e) => console.log(e));
      }
    } else {
      alert("Please, fill in all inputes");
    }
  }

  function title() {
    if (id) {
      return "Update User";
    } else {
      return "Add User";
    }
  }

  useEffect(() => {
    if (id) {
      UserService.getUserById(id,user.jwt)
        .then((res) => {
          setFirstName(res.firstName);
          setLastName(res.lastName);
          setUsername(res.username);
          setRole(res.role);
        })
        .catch((e) => console.log(e));
    }
  }, [id]);

  const routeChange = () => {
    let path = "/Users";
    navigate(path);
  };

  const handleRole = (e) => {
    setRole(e);
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3">
            <h2 className="text-center">{title()}</h2>
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
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="email"
                    placeholder="Enter username"
                  />
                </div>
                <div className="form-group mb-2">
                <DropdownOptions title={`${role}`} options={options} handleEvent={handleRole}/>
                </div>
                <button
                  onClick={(e) => saveUser(e)}
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

export default CreateUserComponent;
