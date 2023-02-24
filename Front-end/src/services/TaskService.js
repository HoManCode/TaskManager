
import ajax from "../services/ajax";

const TASK_API_BASE_URL = "/api/tasks";

class TaskService  {

create(userJwt,TaskData){
  return Promise.resolve(ajax(TASK_API_BASE_URL,"POST",userJwt,TaskData));
}

getTasks(userJwt) {
  return Promise.resolve(ajax(TASK_API_BASE_URL,"GET",userJwt));
}

getTaskById(id,userJwt) {
  return Promise.resolve(ajax(`${TASK_API_BASE_URL}/${id}`,"GET",userJwt));
}

updateUser(id,userJwt,TaskData) {
  return Promise.resolve(ajax(`${TASK_API_BASE_URL}/${id}`,"PUT",userJwt,TaskData));
}




    
}

export default new TaskService();  