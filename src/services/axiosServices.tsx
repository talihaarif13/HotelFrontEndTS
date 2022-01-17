import axios, { AxiosRequestConfig } from "axios";

const baseUrl = "http://localhost:3000/";
// Set config defaults when creating the instance
const axiosService = {
  post: (endpoint: any, token: any, payload: any) => {
    const instance = axios.create({
      baseURL: baseUrl,
      headers: {
        token: token,
      },
    });
    return instance.post<number>(`${baseUrl}` + `${endpoint}`, payload);
  },
  get: (endpoint: any, token: any, payload: any) => {
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