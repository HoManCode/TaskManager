
import ajax from "../services/ajax";

const TASK_API_BASE_URL = "api/tasks";

class TaskService  {

create(userJwt){
    ajax(TASK_API_BASE_URL,"POST",userJwt).then((task) =>{
        console.log(task);
      });
}
    
}

export default new TaskService();  