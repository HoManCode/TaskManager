import React from 'react';
import { useNavigate } from "react-router-dom";
import { useUser } from "../services/UserProvider";

const Logout = () => {
    const user = useUser();
    const navigate = useNavigate(); 
    return (
        <div>
    <div className="container">
      <div className="row">
        <div className="card col-md-6 offset-md-3">
          <h2 className="text-center">Are you sure you want to log out from TMS?</h2>
          <div className="form-group mb-2">
            <button
                onClick={() => localStorage.removeItem(user)}
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