/**
 * Main store function
 */
"use strict";
import React from 'react'
import {render} from 'react-dom'
import {Router, browserHistory} from 'react-router'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import createLogger from 'redux-logger'
import {fromJS} from 'immutable'

import rootreducer from './reducers/root-reducer'
import rootSaga from './sagas/root-saga'
import routes from './routes'

const initialState = fromJS({});

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

/** create store and init it by initial formFields, enhance by middleware*/
const store = createStore(rootreducer, initialState, applyMiddleware(sagaMiddleware, process.env.NODE_ENV ? createLogger() : {}));

/** run root saga */
sagaMiddleware.run(rootSaga);


render(
//Provider allows us to receive formFields from store of our app (by connect function)
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>,
  document.getElementById('app-root')
);
