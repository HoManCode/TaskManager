import React, { useState } from "react";
import DropdownOptions from "./DropdownOptions";
import ListTaskComponent from "./ListTaskComponent";
import ListUserComponent from "./ListUserComponent";



const AdminDashboard = () => {

  const [title,setTitle] = useState("Select user/task");
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
