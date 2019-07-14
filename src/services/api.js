import axios from 'axios';

const request = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/api/v1`,
});

request.defaults.headers.post['Accept'] = 'application/json';
request.defaults.headers.post['Content-Type'] = 'application/json';

export const getCounters = () => {
  return request
    .get('/counters')
    .then(data => data.data);
}

export const addCounter = (params) => {
  return request
    .post('/counter', JSON.stringify(params))
    .then(data => data.data);
}

export const increaseCounter = (idCounter) => {
  return request
    .post('/counter/inc', JSON.stringify({id: idCounter}))
    .then(data => data.data);
}

export const decreaseCounter = (idCounter) => {
  return request
    .post('/counter/dec', JSON.stringify({id: idCounter}))
    .then(data => data.data);
}

export const removeCounter = (idCounter) => {
  return request
    .delete('/counter/dec', JSON.stringify({id: idCounter}))
    .then(data => data.data);
}

export default {
  getCounters,
  addCounter,
  increaseCounter,
  decreaseCounter,
  removeCounter,
};