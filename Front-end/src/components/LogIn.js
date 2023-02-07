import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../services/UserProvider";
import Cookies from "js-cookie";

const Login = () =>{
  const user = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  const sendLoginRequest = () => {
    setErrorMsg("");
    const reqBody = {
      username: username,
      password: password,
    }

    fetch("api/auth/login", { 
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
          <h2 className="text-center">Welcome</h2>
          <div className="card-body">
            <form>
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
              <button
                disabled={username.length === 0 || password.length === 0}
                onClick={() => sendLoginRequest()}
                className="btn btn-success"
              >
                Login
              </button>{" "}
              <button className="btn btn-danger" onClick={() => navigate("/")}>
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
export default Login;