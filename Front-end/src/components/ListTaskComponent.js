import React, { useEffect, useState } from "react";
import TaskService from "../services/TaskService";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from '../services/UserProvider';



const ListTaskComponent = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const user = useUser();

  useEffect(() => {
    TaskService.getTasksAdmin(user.jwt).then((tasks) =>{
      setTasks(tasks);
    });
    if (!user.jwt) {
      console.warn("No valid jwt found, redirecting to login page");
      navigate("/login");
    }
  }, []);


  const toVeiwTask = (id) => {
    let path = `/view-Task/${id}`;
    navigate(path);
  };

  function deleteTask(id) {
    TaskService.deleteTaskById(id,user.jwt)
      .then(
        setTasks(
          tasks.filter((task) => task.email === id)
        )
      )
      .catch((e) => console.log(e));
  }
  
  return (
    <div className="container">
      <a href="/add-Task">
        <button className="btn btn-primary mb-2 mt-3" >Create New Task</button>
      </a>
      <h2 className="text-center">My Tasks</h2>

      <div className="row">
        <table className="table table-striped tabled-bordered">
          <thead>
            <tr>
              <th> Task ID</th>
              <th> Task Description</th>
              <th> Task Due Date</th>
              <th> Task Story Points</th>
              <th> Task Status</th>
              <th> Actions</th>
            </tr>
          </thead>
          <tbody>
          {tasks.map((task) => (
              <tr key={task.id}>
                <td> {task.id} </td>
                <td> {task.description} </td>
                <td> {task.dueDate} </td>
                <td> {task.storyPoints} </td>
                <td> {task.status} </td>
            <td>
                  <Link
                    to={`/add-Task/${task.id}`}
                    className="btn btn-info"
                    href=""
                  >
                    Update
                  </Link>
                  <button
                    style={{ marginLeft: "10px" }}
                    className="btn btn-info"
                    onClick={() => toVeiwTask(task.id)}
                  >
                    View
                </button>
                <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => deleteTask(task.id)}
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
export default ListTaskComponent;
