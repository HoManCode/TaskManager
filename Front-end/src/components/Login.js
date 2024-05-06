import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../services/UserProvider";
import DashNav from "../services/DashNav";
import jwt_decode from "jwt-decode";

const Login = () =>{
  const user = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate(); 
  const [authorities, setAuthorities] = useState([]);
  

  useEffect(() => {
    if (user && user.jwt) {
      const decodedJwt = jwt_decode(user.jwt);
      setAuthorities(decodedJwt.authorities);
    }
  }, [user, user.jwt]);

  const sendLoginRequest = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    const reqBody = {
      username: username,
      password: password,
    };
  
    try {
      const response = await fetch("api/auth/login", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "post",
        body: JSON.stringify(reqBody),
      });
  
      if (response.status === 200) {
        const data = await response.text();
        user.setJwt(data);
        if (user && user.jwt) {
          const decodedJwt = jwt_decode(user.jwt);
          setAuthorities(decodedJwt.authorities);
        }
        DashNav(authorities[0], navigate);
      } else if (response.status === 401 || response.status === 403) {
        setErrorMsg("Invalid username or password");
      } else {
        setErrorMsg("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


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
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
              </div>
              <div className="showPass">
                <input
                    id="check"
                    type="checkbox"
                    value={showPassword}
                    onChange={() =>
                        setShowPassword((prev) => !prev)
                    }
                />
                <label for="checkbox">Show password</label>
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
