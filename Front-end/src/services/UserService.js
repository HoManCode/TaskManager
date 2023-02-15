import axios from "axios";

const USER_API_BASE_URL = "api/users";

class UserService {
  getUsers() {
    return Promise.resolve(axios.get(USER_API_BASE_URL));
  }

  updateUser(id, employeeData) {
    return Promise.resolve(
      axios.put(`${USER_API_BASE_URL}/${id}`, employeeData)
    );
  }

  saveUser(employeeData) {
    return Promise.resolve(axios.post(USER_API_BASE_URL, employeeData));
  }

  getUserById(id) {
    return Promise.resolve(axios.get(`${USER_API_BASE_URL}/${id}`));
  }

  deleteUserById(id) {
    return Promise.resolve(axios.delete(`${USER_API_BASE_URL}/${id}`));
  }
}

export default new UserService();
