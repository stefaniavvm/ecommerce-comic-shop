import axios from "axios";

const endpoint = "/products";
const baseURL = `http://localhost:3000`;
const api = axios.create({
  baseURL,
});

const get = () => api.get(`/${endpoint}`);

const add = (data) => api.post(`/${endpoint}`, data);

const edit = (id) => api.put(id);

const remove = (id) => api.delete(id);

export { get, add, edit, remove };
