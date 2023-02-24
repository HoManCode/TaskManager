import React, { useEffect, useState } from "react";
import UserService from "../services/UserService";
import { Link, useNavigate } from "react-router-dom";

const ListUserComponent = () => {
  const [UserArray, setUserArray] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUser();
  }, []);

  function getAllUser() {
    UserService.getUsers()
      .then((res) => {
        setUserArray(res.data);
        console.log(res);
      })
      .catch((e) => console.log(e));
  }

  function deleteUser(e, id) {
    e.preventDefault();
    UserService.deleteUserById(id)
      .then(
        setUserArray(
          UserArray.filter((User) => User.email === id)
        )
      )
      .catch((e) => console.log(e));
  }

  const toVeiwUser = (id) => {
    let path = `/view-User/${id}`;
    navigate(path);
  };

  return (
    <div className="container">
      <a href="/add-User">
        <button className="btn btn-primary mb-2 mt-3">Add User</button>
      </a>
      <h2 className="text-center">Users List</h2>

      <div className="row">
        <table className="table table-striped tabled-bordered">
          <thead>
            <tr>
              <th> User First Name</th>
              <th> User Last Name</th>
              <th> User Email</th>
              <th> Actions</th>
            </tr>
          </thead>
          <tbody>
            {UserArray.map((User) => (
              <tr key={User.id}>
                <td> {User.firstName} </td>
                <td> {User.lastName} </td>
                <td> {User.email} </td>
                <td>
                  <Link
                    to={`/add-User/${User.id}`}
                    className="btn btn-info"
                    href=""
                  >
                    Update
                  </Link>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => toVeiwUser(User.id)}
                    className="btn btn-info"
                  >
                    View
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={(e) => deleteUser(e, User.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ListUserComponent;
