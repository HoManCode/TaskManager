import ajax from "./ajax";

const USER_API_BASE_URL = "/api/auth";

class AuthService {
  logoutUser() {
    return Promise.resolve(ajax(USER_API_BASE_URL+"/logout","GET"));
  }
}

export default new AuthService();
