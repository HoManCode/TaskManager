
import ajax from "../services/ajax";

const TASK_API_BASE_URL = "/api/tasks";

class TaskService  {

create(userJwt,TaskData){
  return Promise.resolve(ajax(TASK_API_BASE_URL,"POST",userJwt,TaskData));
}

getTasks(userJwt) {
  return Promise.resolve(ajax(TASK_API_BASE_URL,"GET",userJwt));
}

getTasksAdmin(userJwt) {
  return Promise.resolve(ajax(TASK_API_BASE_URL+"/admin","GET",userJwt));
}

getTaskById(id,userJwt) {
  return Promise.resolve(ajax(`${TASK_API_BASE_URL}/${id}`,"GET",userJwt));
}

updateTask(id,userJwt,TaskData) {
  return Promise.resolve(ajax(`${TASK_API_BASE_URL}/${id}`,"PUT",userJwt,TaskData));
}

deleteTaskById(id,userJwt) {
  return Promise.resolve(ajax(`${TASK_API_BASE_URL}/${id}`,"DELETE",userJwt));
}




    
}

export default new TaskService();  