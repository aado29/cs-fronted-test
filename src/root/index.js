import React from 'react';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import reducers from '../store/reducers';
import Body from '../containers/body';
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
        <Body />
      </div>
    </Provider>
  );
}

export default Root;
