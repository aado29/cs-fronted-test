import { combineReducers } from 'redux';
import counters from './counters';

const reducers = combineReducers({
  counters,
});

export default reducers;