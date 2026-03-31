import axios from "axios";

const API = "http://localhost:8081/api/v1/Student";

const token = localStorage.getItem("token");

axios.get(API, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

// GET all students
export const getAllStudents = () => {
  return axios.get(API + "/getAll");
};

// SAVE student
export const saveStudent = (student) => {
  return axios.post(API + "/save", student);
};

// UPDATE student
export const updateStudent = (id, student) => {
  return axios.put(API + "/edit/" + id, student);
};

// DELETE student
export const deleteStudent = (id) => {
  return axios.delete(API + "/delete/" + id);
};

// GET single student
export const getStudentById = (id) => {
  return axios.get(API + "/student/" + id);
};