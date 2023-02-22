import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TaskService from "../services/TaskService";
import { useUser } from '../services/UserProvider';

const CreateTaskComponent = () => {
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [storyPoints, setStoryPoints] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useUser();

  const TaskData = { description, dueDate, storyPoints, status  };
  

  function saveTask(e) {
    e.preventDefault();

    if (
      TaskData.firstName !== "" &&
      TaskData.lastName !== "" &&
      TaskData.email !== ""
    ) {
      if (id) {
        TaskService.updateUser()
          .then(navigate("/dashboard"))
          .catch((e) => console.log(e));
      } else {
        TaskService.create(user.jwt,TaskData)
          .then(navigate("/dashboard"))
          .catch((e) => console.log(e));
      }
    } else {
      alert("Please, fill in all inputes");
    }
  }

  function tile() {
    if (id) {
      return "Update Task";
    } else {
      return "Create Task";
    }
  }

  useEffect(() => {
    if (id) {
      TaskService.getUserById(id)
        .then((res) => {
          setDescription(res.data.description);
          setDueDate(res.data.dueDate);
          setStoryPoints(res.data.storyPoints);
          setStatus(res.data.status);
        })
        .catch((e) => console.log(e));
    }
  }, []);

  const routeChange = () => {
    let path = "/dashboard";
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
                  <label> Description:</label> 
                    <input
                      className="form-control"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      type="text"
                    />
                </div>
                <div className="form-group mb-2">
                <label> Due Date:</label> 
                  <input
                    className="form-control"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    type="date"
                  />
                </div>
                <div className="form-group mb-2">
                 <label> Story Points:</label> 
                  <input
                    className="form-control"
                    value={storyPoints}
                    onChange={(e) => setStoryPoints(e.target.value)}
                    type="number"
                  />
                </div>
                <div className="form-group mb-2">
                <label> Status:</label>
                  <input
                    className="form-control"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    defaultValue="BACKLOG"
                  />
                </div>
                <button
                  onClick={(e) => saveTask(e)}
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

export default CreateTaskComponent;
