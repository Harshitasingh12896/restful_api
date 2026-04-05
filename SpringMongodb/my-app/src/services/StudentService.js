import axios from "axios";

const API = "http://localhost:8081/api/v1/Student";

// ✅ CREATE AXIOS INSTANCE
const api = axios.create({
  baseURL: API,
});

// ✅ ADD INTERCEPTOR (VERY IMPORTANT)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// GET all students
export const getAllStudents = () => {
  return api.get("/getAll");
};

// SAVE student
export const saveStudent = (student) => {
  return api.post("/save", student);
};

// UPDATE student
export const updateStudent = (id, student) => {
  return api.put(`/edit/${id}`, student);
};

// DELETE student
export const deleteStudent = (id) => {
  return api.delete(`/delete/${id}`);
};

// GET single student
export const getStudentById = (id) => {
  return api.get(`/student/${id}`);
};