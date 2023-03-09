import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TaskService from "../services/TaskService";
import { useUser } from '../services/UserProvider';
import DropdownOptions from "./DropdownOptions";

const CreateTaskComponent = () => {
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [storyPoints, setStoryPoints] = useState("");
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("Status");
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useUser();


  const TaskData = { description, dueDate, storyPoints, status  };
  

  function saveTask(e) {
    e.preventDefault();

    if (
      TaskData.description !== "" &&
      TaskData.dueDate !== "" &&
      TaskData.storyPoints !== "" &&
      TaskData.status !== ""
    ) {
      if (id) {
        TaskService.updateUser(id,user.jwt,TaskData)
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

  const options= [
    {value:"BACKLOG",label:"BACKLOG"},
    {value:"TO_DO",label:"TO_DO"},
    {value:"DESIGN",label:"DESIGN"},
    {value:"IN_PROGRESS",label:"IN_PROGRESS"},
    {value:"REVIEW",label:"REVIEW"},
    {value:"TEST",label:"TEST"},
    {value:"DONE",label:"DONE"},
    {value:"CANCELLED",label:"CANCELLED"},
  ]

  useEffect(() => {
    if (id) {
      TaskService.getTaskById(id,user.jwt)
        .then((res) => {
          setDescription(res.description);
          setDueDate(res.dueDate);
          setStoryPoints(res.storyPoints);
          setStatus(res.status);
        })
        .catch((e) => console.log(e));
    }
  }, [id]);

  const routeChange = () => {
    let path = "/dashboard";
    navigate(path);
  };

  const handleTitle = (e) => {
    console.log(e);
    setTitle(e);
  }

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
                <DropdownOptions title={`${title}`} options={options} handleEvent={handleTitle}/>
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
