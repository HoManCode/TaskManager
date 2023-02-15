import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../services/UserService";

const CreateUserComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const UserData = { firstName, lastName, email };

  function saveUser(e) {
    e.preventDefault();

    if (
      UserData.firstName !== "" &&
      UserData.lastName !== "" &&
      UserData.email !== ""
    ) {
      if (id) {
        UserService.updateUser(id, UserData)
          .then(navigate("/Users"))
          .catch((e) => console.log(e));
      } else {
        UserService.saveUser(UserData)
          .then(navigate("/Users"))
          .catch((e) => console.log(e));
      }
    } else {
      alert("Please, fill in all inputes");
    }
  }

  function tile() {
    if (id) {
      return "Update User";
    } else {
      return "Add User";
    }
  }

  useEffect(() => {
    if (id) {
      UserService.getUserById(id)
        .then((res) => {
          setFirstName(res.data.firstName);
          setLastName(res.data.lastName);
          setEmail(res.data.email);
        })
        .catch((e) => console.log(e));
    }
  }, []);

  const routeChange = () => {
    let path = "/Users";
    navigate(path);
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3">
            <h2 className="text-center">{tile()}</h2>
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <input
                    className="form-control"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                    placeholder="Enter First Name"
                  />
                </div>
                <div className="form-group mb-2">
                  <input
                    className="form-control"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    placeholder="Enter Last Name"
                  />
                </div>
                <div className="form-group mb-2">
                  <input
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter Email"
                  />
                </div>
                <button
                  onClick={(e) => saveUser(e)}
                  className="btn btn-success"
                >
                  Save
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

export default CreateUserComponent;
