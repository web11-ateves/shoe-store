/* eslint-disable no-unused-vars */
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { v4 } from 'uuid';
import data from '../data.json';
import reducers from './reducers';
import sagas from '../sagas';

const initialInventories = data.stores.map((store) => (
  data.models.map((product) => (
    {
      id: v4(),
      store,
      product,
      stock: 0,
      timestamp: '',
    }))
)).flat();

export const initialState = {
  inventories: initialInventories,
  alert: { message: '', severity: 'info' },
  query: { store: '', product: '' },
  timestamp: Date.now(),
  suggestion: false,
  transfer: { message: '' },
};

const { console } = window;

const logger = (store) => (next) => (action) => {
  console.groupCollapsed('dispatching', action.type);
  console.log('prev state', store.getState());
  console.log('action', action);
  const result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};

const saver = (store) => (next) => (action) => {
  const result = next(action);
  // localStorage['redux-store'] = JSON.stringify(store.getState());
  return result;
};

export const sagaMiddleware = createSagaMiddleware();

export const storeFactory = (storeInitialState = initialState) => applyMiddleware(
  sagaMiddleware, logger, saver,
)(createStore)(
  reducers, (localStorage['redux-store'])
    ? JSON.parse(localStorage['redux-store'])
    : storeInitialState,
);

const store = storeFactory();

sagaMiddleware.run(sagas);

export default store;
