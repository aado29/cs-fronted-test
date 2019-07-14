import React from 'react';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import reducers from '../store/reducers';
import './style.scss';

let store = createStore(
  reducers,
  applyMiddleware(
    thunk,
    logger,
  ),
);

function Root() {
  return (
    <Provider store={store}>
      <div className="root">
        <h1>Initial View</h1>
      </div>
    </Provider>
  );
}

export default Root;
