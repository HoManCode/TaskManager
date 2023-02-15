import React, { useState, useEffect } from "react";
import UserService from "../services/UserService";
import { useParams } from "react-router-dom";

function ViewUserComponent() {
  const [User, setUser] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      UserService.getUserById(id)
        .then((res) => {
          setUser(res.data);
        })
        .catch((e) => console.log(e));
    }
  }, []);
  return (
    <div>
      <div className="card col-md-6 offset-md-3">
        <h3 className="text-center">View User Details</h3>
        <div className="row">
          <label>User First Name: </label>
          <div> {User.firstName} </div>
        </div>
        <div className="row">
          <label>User Last Name: </label>
          <div> {User.lastName} </div>
        </div>
        <div className="row">
          <label>User Email: </label>
          <div> {User.email} </div>
        </div>
      </div>
    </div>
  );
}

export default ViewUserComponent;
