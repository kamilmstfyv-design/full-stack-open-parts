import axios from "axios";
const url = "http://localhost:3001/persons";

const getData = () => {
  const request = axios.get(url);
  return request.then((response) => response.data);
};

const addData = (newData) => {
  const request = axios.post(url, newData);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const request = axios.delete(`${url}/${id}`);
  return request.then((response) => response.data);
};

const replaceNumber = (id, newInfo) => {
  const request = axios.put(`${url}/${id}`, newInfo);
  return request.then((response) => response.data);
};

export { getData, addData, deletePerson, replaceNumber };
