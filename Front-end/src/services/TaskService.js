
import ajax from "../services/ajax";

const TASK_API_BASE_URL = "api/tasks";

class TaskService  {

create(userJwt,TaskData){
  return Promise.resolve(ajax(TASK_API_BASE_URL,"POST",userJwt,TaskData));
}

getTasks(userJwt) {
  return Promise.resolve(ajax(TASK_API_BASE_URL,"GET",userJwt));
}


    
}

export default new TaskService();  