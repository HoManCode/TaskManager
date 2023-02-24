import React, { useState, useEffect } from "react";
import TaskService from "../services/TaskService";
import { useParams } from "react-router-dom";
import { useUser } from '../services/UserProvider';

function ViewTaskComponent() {
  const [task, setTask] = useState([]);
  const user = useUser();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      TaskService.getTaskById(id,user.jwt)
        .then((res) => {
          setTask(res);
        })
        .catch((e) => console.log(e));
    }
  }, []);
  return (
    <div>
      <div className="card col-md-6 offset-md-3">
        <h3 className="text-center">View Task Details</h3>
        <div className="row">
          <label>Description: </label>
          <div> {task.description} </div>
        </div>
        <div className="row">
          <label>Due Date: </label>
          <div> {task.dueDate} </div>
        </div>
        <div className="row">
          <label>Story Points: </label>
          <div> {task.storyPoints} </div>
        </div>
        <div className="row">
          <label>Status: </label>
          <div> {task.status} </div>
        </div>
      </div>
    </div>
  );
}

export default ViewTaskComponent;
