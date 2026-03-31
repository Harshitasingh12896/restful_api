import axios from "axios";

const API = "http://localhost:8081/auth";

const authService = {

  login: async (email, password) => {
    const res = await axios.post(`${API}/login`, { email, password });

    localStorage.setItem("token", res.data.token);

    return true;
  },

  signup: async (email, password) => {
    return axios.post(`${API}/signup`, { email, password });
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  }
};

export default authService;