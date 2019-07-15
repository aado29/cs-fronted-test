import {
  FETCH_COUNTERS,
  FETCH_COUNTERS_ERROR,
  FETCH_COUNTERS_SUCCESS,
  ADD_COUNTER,
  ADD_COUNTER_ERROR,
  ADD_COUNTER_SUCCESS,
  SET_COUNTER,
  SET_COUNTER_ERROR,
  SET_COUNTER_SUCCESS,
  REMOVE_COUNTER,
  REMOVE_COUNTER_ERROR,
  REMOVE_COUNTER_SUCCESS,
  SET_ORDER,
} from './../actions/counters';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  hasError: false,
  success: false,
  orderBy: 'title',
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
    case SET_COUNTER:
      return {
        ...state,
        isLoading: true,
        hasError: false,
        error: null,
      };
    case SET_COUNTER_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        error: action.payload,
      };
    case SET_COUNTER_SUCCESS:
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
    case SET_ORDER:
      return {
        ...state,
        orderBy: action.payload.orderBy,
        data: action.payload.data,
      };
    default:
      return state;
  };
};

export default counterReduce;