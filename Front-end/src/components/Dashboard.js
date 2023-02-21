import React, { useEffect, useState } from "react";
import TaskService from "../services/TaskService";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from '../services/UserProvider';


const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const user = useUser();

  useEffect(() => {
    TaskService.getTasks(user.jwt).then((tasks) =>{
      setTasks(tasks);
    });
    if (!user.jwt) {
      console.warn("No valid jwt found, redirecting to login page");
      navigate("/login");
    }
  }, [user.jwt]);
  
  

  const createTask = () => {
    TaskService.create(user.jwt);
    //navigate(`/tasks/${task.id}`);
  };

  return (
    <div className="container">
        <button className="btn btn-primary mb-2 mt-3"onClick={() => createTask()}>Create New Task</button>
      <h2 className="text-center">My Tasks</h2>

      <div className="row">
        <table className="table table-striped tabled-bordered">
          <thead>
            <tr>
              <th> Task ID</th>
              <th> Task Description</th>
              <th> Task Due Date</th>
              <th> Task Story Points</th>
            </tr>
          </thead>
          <tbody>
          {tasks.map((task) => (
              <tr key={task.id}>
                <td> {task.id} </td>
                <td> {task.id} </td>
                <td> {task.id} </td>
                <td> {task.id} </td>
            <td>
                <button
                    style={{ marginLeft: "10px" }}
                    className="btn btn-info"
                  >
                    Update
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    className="btn btn-info"
                  >
                    View
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
export default Dashboard;
