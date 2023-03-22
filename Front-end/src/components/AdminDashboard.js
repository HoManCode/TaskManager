import React, { useEffect, useState } from "react";
import DropdownOptions from "./DropdownOptions";
import ListTaskComponent from "./ListTaskComponent";
import ListUserComponent from "./ListUserComponent";
import TaskService from "../services/TaskService";
import { useUser } from '../services/UserProvider';
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";



const AdminDashboard = () => {

  const [title,setTitle] = useState("Select user/task");
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState(users);
  const navigate = useNavigate();
  const user = useUser();
  const options= [
    {value:"USERS",label:"Users"},
    {value:"TASKS",label:"Tasks"},
  ]

  

  

  const handleEvent = (e) => {
    setTitle(e);
  }
  
  return (
    <div className="container">
      <DropdownOptions title={`${title}`} options={options} handleEvent={handleEvent}/>
      {
        (title === "USERS") ? <ListUserComponent/> : <ListTaskComponent/>
      }
    </div>
  );
};
export default AdminDashboard;
