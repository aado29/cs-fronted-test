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

export const addCounter = (title) => {
  return request
    .post('/counter', { title })
    .then(data => data.data);
}

export const increaseCounter = (idCounter) => {
  return request
    .post('/counter/inc', {id: idCounter})
    .then(data => data.data);
}

export const decreaseCounter = (idCounter) => {
  return request
    .post('/counter/dec', {id: idCounter})
    .then(data => data.data);
}

export const removeCounter = (idCounter) => {
  return request
    .delete('/counter', {
      data: {id: idCounter}
    })
    .then(data => data.data);
}

export default {
  getCounters,
  addCounter,
  increaseCounter,
  decreaseCounter,
  removeCounter,
};