import apiService from '../../services/api';

export const FETCH_COUNTERS = "FETCH_COUNTERS";
export const FETCH_COUNTERS_ERROR = "FETCH_COUNTERS_ERROR";
export const FETCH_COUNTERS_SUCCESS = "FETCH_COUNTERS_SUCCESS";

export const ADD_COUNTER = "ADD_COUNTER";
export const ADD_COUNTER_ERROR = "ADD_COUNTER_ERROR";
export const ADD_COUNTER_SUCCESS = "ADD_COUNTER_SUCCESS";

export const SET_COUNTER = "SET_COUNTER";
export const SET_COUNTER_ERROR = "SET_COUNTER_ERROR";
export const SET_COUNTER_SUCCESS = "SET_COUNTER_SUCCESS";

export const REMOVE_COUNTER = "REMOVE_COUNTER";
export const REMOVE_COUNTER_ERROR = "REMOVE_COUNTER_ERROR";
export const REMOVE_COUNTER_SUCCESS = "REMOVE_COUNTER_SUCCESS";

export const SET_ORDER = "SET_ORDER";

export const getCounters = () => {
  return (dispatch, getState) => {
    dispatch({
      type: FETCH_COUNTERS
    });
    apiService.getCounters()
      .then(data => dispatch({
        type: FETCH_COUNTERS_SUCCESS,
        payload: data.sort(orderBy(getState().counters.orderBy)),
      }))
      .catch(err => dispatch({
        type: FETCH_COUNTERS_ERROR,
        payload: err
      }))
  }
}

export const addCounter = title => {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_COUNTER
    });
    apiService.addCounter(title)
      .then(data => dispatch({
        type: ADD_COUNTER_SUCCESS,
        payload: getState().counters.data.concat(data).sort(orderBy(getState().counters.orderBy)),
      }))
      .catch(err => dispatch({
        type: ADD_COUNTER_ERROR,
        payload: err
      }))
  }
}

export const setCounter = (idCounter, type = 'increase') => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_COUNTER
    });
    apiService[`${type}Counter`](idCounter)
      .then(data => dispatch({
        type: SET_COUNTER_SUCCESS,
        payload: getState().counters.data.map(item => {
          if (item.id === data.id) {
            item.count = data.count
          }
          return item;
        }).sort(orderBy(getState().counters.orderBy)),
      }))
      .catch(err => dispatch({
        type: SET_COUNTER_ERROR,
        payload: err
      }))
  }
}

export const removeCounter = idCounter => {
  return (dispatch, getState) => {
    dispatch({
      type: REMOVE_COUNTER
    });
    apiService.removeCounter(idCounter)
      .then(id => dispatch({
        type: REMOVE_COUNTER_SUCCESS,
        payload: getState().counters.data.filter(item => item.id !== id).sort(orderBy(getState().counters.orderBy)),
      }))
      .catch(err => dispatch({
        type: REMOVE_COUNTER_ERROR,
        payload: err
      }))
  }
}

export const setOrder = (type = 'title') => {
  return (dispatch, getState) => {
    const counters = getState().counters.data;

    return dispatch({
      type: SET_ORDER,
      payload: {
        order: type,
        data: counters.sort(orderBy(type)),
      },
    });
  }
}

const orderBy = type => (a, b) => {
  const genreA = typeof a[type] === 'string' ? a[type].toUpperCase() : a[type];
  const genreB = typeof b[type] === 'string' ? b[type].toUpperCase() : b[type];
  
  let comparison = 0;
  if (genreA > genreB) {
    comparison = 1;
  } else if (genreA < genreB) {
    comparison = -1;
  }
  return comparison;
}