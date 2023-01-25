import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/v1/employees";

class EmployeeService {
  getEmployees() {
    return Promise.resolve(axios.get(EMPLOYEE_API_BASE_URL));
  }

  updateEmployee(id, employeeData) {
    return Promise.resolve(
      axios.put(`${EMPLOYEE_API_BASE_URL}/${id}`, employeeData)
    );
  }

  saveEmployee(employeeData) {
    return Promise.resolve(axios.post(EMPLOYEE_API_BASE_URL, employeeData));
  }

  getEmployeeById(id) {
    return Promise.resolve(axios.get(`${EMPLOYEE_API_BASE_URL}/${id}`));
  }

  deleteEmployeeById(id) {
    return Promise.resolve(axios.delete(`${EMPLOYEE_API_BASE_URL}/${id}`));
  }
}

export default new EmployeeService();
