import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../services/UserProvider";
import DashNav from "../services/DashNav";
import jwt_decode from "jwt-decode";

const Login = () =>{
  const user = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate(); 
  const [authorities, setAuthorities] = useState([]);
  

  useEffect(() => {
    if (user && user.jwt) {
      const decodedJwt = jwt_decode(user.jwt);
      setAuthorities(decodedJwt.authorities);
    }
  }, [user, user.jwt]);

  const sendLoginRequest = (e) => {
    e.preventDefault();
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
      if (response.status === 200) return response.text();
      else if (response.status === 401 || response.status === 403) {
        setErrorMsg("Invalid username or password");
      } else {
        setErrorMsg(
          "Something went wrong"
        );
      }
    })
    .then((data) => {
      if (data) {
        user.setJwt(data);
        if (user && user.jwt) {
          const decodedJwt = jwt_decode(user.jwt);
          setAuthorities(decodedJwt.authorities);
        }
        DashNav(authorities[0],navigate); 
      }
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
              {errorMsg ? (
              <div className="form-group mb-2">
                {errorMsg}
              </div>
              ) : (
              <></>
              )}
              <button
                disabled={username.length === 0 || password.length === 0}
                onClick={(e) => sendLoginRequest(e)}
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
