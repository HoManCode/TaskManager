import React, { useEffect, useState } from "react";
import TaskService from "../services/TaskService";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from '../services/UserProvider';


const Dashboard = () => {
  const [tasks, setTasks] = useState(null);
  const navigate = useNavigate();
  const user = useUser();

  
  

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
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Dashboard;
