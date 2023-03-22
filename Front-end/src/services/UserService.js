import ajax from "../services/ajax";

const USER_API_BASE_URL = "/api/users";

class UserService {
  getUsersAdmin(userJwt) {
    return Promise.resolve(ajax(USER_API_BASE_URL+"/admin","GET",userJwt));
  }
}

export default new UserService();
