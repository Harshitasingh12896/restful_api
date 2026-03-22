import axios from "axios";

const API_URL = "http://localhost:8081/api/v1/Student";

class StudentService {

  getStudents() {
    return axios.get(API_URL + "/getAll");
  }

  saveStudent(student) {
    return axios.post(API_URL + "/save", student);
  }

  updateStudent(id, student) {
    return axios.put(API_URL + "/edit/" + id, student);
  }

  deleteStudent(id) {
    return axios.delete(API_URL + "/delete/" + id);
  }
}

export default new StudentService();