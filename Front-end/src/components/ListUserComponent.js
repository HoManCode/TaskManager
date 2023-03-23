import React, { useEffect, useState } from "react";
import UserService from "../services/UserService";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from '../services/UserProvider';

const ListUserComponent = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const user = useUser();


  useEffect(() => {
    UserService.getUsersByAdmin(user.jwt).then((users) =>{
      setUsers(users);
    });
    if (!user.jwt) {
      console.warn("No valid jwt found, redirecting to login page");
      navigate("/login");
    }
  }, []);

  function deleteUser(e, id) {
    e.preventDefault();
    UserService.deleteUserById(id)
      .then(
        setUsers(
          users.filter((User) => User.email === id)
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
      <a href="/signup">
        <button className="btn btn-primary mb-2 mt-3">Add User</button>
      </a>
      <h2 className="text-center">Users List</h2>

      <div className="row">
        <table className="table table-striped tabled-bordered">
          <thead>
            <tr>
              <th> User First Name</th>
              <th> User Last Name</th>
              <th> Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td> {user.firstName} </td>
                <td> {user.lastName} </td>
                <td>
                  <Link
                    to={`/add-User/${user.id}`}
                    className="btn btn-info"
                    href=""
                  >
                    Update
                  </Link>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => toVeiwUser(user.id)}
                    className="btn btn-info"
                  >
                    View
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={(e) => deleteUser(e, user.id)}
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
