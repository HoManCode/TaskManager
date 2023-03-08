import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../services/UserProvider";
import Cookies from "js-cookie";
import DropdownOptions from "./DropdownOptions";

const Signup = () =>{
  const user = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const options= [
    {value:"ADMIN",label:"ADMIN"},
    {value:"MANAGER",label:"MANAGER"},
    {value:"DESIGN",label:"EMPLOYEE"},
  ]


  const registerAndLoginUser = (e) => {
    e.preventDefault();
    const reqBody = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
    }

    fetch("api/users/register", { 
      headers: { 
        "Content-Type": "application/json"
       },
      method: "post",
      body: JSON.stringify(reqBody),
    })
    .then((response) => {
      if (response.status === 200)
        return Promise.all([response.json(), response.headers]);
      else return Promise.reject("Invalid login attempt");
    })
    .then(([body, headers]) => {
      user.setJwt(Cookies.get("jwt"));
      navigate("/dashboard");
    })
    .catch((message) => {
      alert(message);
    });

  }


return (
    <div>
    <div className="container">
      <div className="row">
        <div className="card col-md-6 offset-md-3">
          <h2 className="text-center">Signup</h2>
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <input
                  className="form-control"
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                  type="text"
                  placeholder="First Name"
                />
              </div>
              <div className="form-group mb-2">
                <input
                  className="form-control"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  placeholder="Last Name"
                />
              </div>
              <div className="form-group mb-2">
                <input
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="Username"
                />
              </div>
              <div className="form-group mb-2">
                <input
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="text"
                  placeholder="Password"
                />
              </div>
              <DropdownOptions placeHolder={"Role"} options={options}/>
              <button
                disabled={username.length === 0 || password.length === 0}
                onClick={(e) => registerAndLoginUser(e)}
                className="btn btn-success"
              >
                Register
              </button>{" "}
              <button className="btn btn-danger" onClick={() => navigate("/login")}>
                Exit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
export default Signup;