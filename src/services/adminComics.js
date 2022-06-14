import axios from "axios";

const endpoint = "/comics";
const baseURL = `http://localhost:3000`;
const api = axios.create({
  baseURL,
});

const add = (data) => api.post(`/${endpoint}`, data);

const edit = (id) => api.put(id);

const remove = (id) => api.delete(id);

export { add, edit, remove };
