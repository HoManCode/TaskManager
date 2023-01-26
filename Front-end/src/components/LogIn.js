import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogIn = () =>{
const [userName, setUserName] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();


const routeChange = () => {
    let path = "/employees";
    navigate(path);
};

const validateUserPass = () => {
    if(userName !== "" && password !== "" ){
        let path = "/add-employee";
        navigate(path);
    } else {
        alert("Please, fill in all inputes");
    }
}


return (
    <div>
    <div className="container">
      <div className="row">
        <div className="card col-md-6 offset-md-3">
          <h2 className="text-center">Welcome</h2>
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <input
                  className="form-control"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
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
                  placeholder="password"
                />
              </div>
              <button
                onClick={(e) => validateUserPass(e)}
                className="btn btn-success"
              >
                Login
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
export default LogIn;