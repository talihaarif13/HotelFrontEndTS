import axios from "axios";

const baseUrl = "http://localhost:3000/";
// Set config defaults when creating the instance
const axiosService = {
  post: (endpoint, token, payload) => {
    const instance = axios.create({
      baseURL: baseUrl,
      headers: {
        token: token,
      },
    });
    return instance.post(`${baseUrl}` + `${endpoint}`, payload);
  },
  get: (endpoint, token, payload) => {
    const instance = axios.create({
      baseURL: baseUrl,
      headers: {
        token: token,
      },
    });
    return instance.get(`${baseUrl}` + `${endpoint}`, payload);
  }
};

export default axiosService;