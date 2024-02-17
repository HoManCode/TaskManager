import React from 'react';
import { useNavigate } from "react-router-dom";
import { useUser } from "../services/UserProvider";
import AuthService from "../services/AuthService";

const Logout = () => {
    const user = useUser();
    const navigate = useNavigate(); 

    const removeUserNavigate = () => {
      localStorage.removeItem(user.jwt);
      AuthService.logoutUser();
      navigate("/");
    }

    return (
        <div>
    <div className="container">
      <div className="row">
        <div className="card col-md-6 offset-md-3">
          <h2 className="text-center">Are you sure you want to log out from TMS?</h2>
          <div className="form-group mb-2">
            <button
                onClick={() => removeUserNavigate()}
                className="btn btn-success"
              >
                Logout
            </button>{" "}
            <button className="btn btn-danger" onClick={() => navigate("/")}>
                Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Logout;