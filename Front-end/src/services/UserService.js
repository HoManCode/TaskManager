import ajax from "../services/ajax";

const USER_API_BASE_URL = "/api/users";

class UserService {
  getUsersByAdmin(userJwt) {
    return Promise.resolve(ajax(USER_API_BASE_URL+"/admin","GET",userJwt));
  }

  getUserById(id,userJwt) {
    return Promise.resolve(ajax(`${USER_API_BASE_URL}/${id}`,"GET",userJwt));
  }
}

export default new UserService();
