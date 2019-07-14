import {
  FETCH_COUNTERS,
  FETCH_COUNTERS_ERROR,
  FETCH_COUNTERS_SUCCESS,
  ADD_COUNTER,
  ADD_COUNTER_ERROR,
  ADD_COUNTER_SUCCESS,
  REMOVE_COUNTER,
  REMOVE_COUNTER_ERROR,
  REMOVE_COUNTER_SUCCESS,
} from './../actions/counters';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  hasError: false,
  success: false,
};

const counterReduce = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COUNTERS:
      return {
        ...state,
        isLoading: true,
        hasError: false,
        error: null,
      };
    case FETCH_COUNTERS_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        error: action.payload,
      };
    case FETCH_COUNTERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case ADD_COUNTER:
      return {
        ...state,
        isLoading: true,
        hasError: false,
        error: null,
      };
    case ADD_COUNTER_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        error: action.payload,
      };
    case ADD_COUNTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case REMOVE_COUNTER:
      return {
        ...state,
        isLoading: true,
        hasError: false,
        error: null,
      };
    case REMOVE_COUNTER_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        error: action.payload,
      };
    case REMOVE_COUNTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    default:
      return state;
  };
};

export default counterReduce;