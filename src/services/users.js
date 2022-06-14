import axios from "axios";

const endpoint = "/users";
const baseURL = `http://localhost:3000`;
const api = axios.create({
  baseURL,
});

const get = () => api.get(`/${endpoint}`);

const add = (data) => api.post(`/${endpoint}`, data);
const login = (data) => api.post(`/${endpoint}/login`, data);
export { get, add, login };
