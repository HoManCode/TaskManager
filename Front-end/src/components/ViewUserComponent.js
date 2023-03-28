import React, { useState, useEffect } from "react";
import UserService from "../services/UserService";
import { useParams } from "react-router-dom";
import { useUser } from '../services/UserProvider';

function ViewUserComponent() {
  const [User, setUser] = useState([]);
  const user = useUser();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      UserService.getUserById(id,user.jwt)
        .then((res) => {
          setUser(res);
        })
        .catch((e) => console.log(e));
    }
  }, []);
  return (
    <div>
      <div className="card col-md-6 offset-md-3">
        <h3 className="text-center">View User Details</h3>
        <div className="row">
          <label>First Name: </label>
          <div> {User.firstName} </div>
        </div>
        <div className="row">
          <label>Last Name: </label>
          <div> {User.lastName} </div>
        </div>
        <div className="row">
          <label>Username: </label>
          <div> {User.username} </div>
        </div>
        <div className="row">
          <label>Role: </label>
          <div> {User.role} </div>
        </div>
      </div>
    </div>
  );
}

export default ViewUserComponent;
