import { combineReducers } from 'redux';
import types from '../actionTypes';

export const timestamp = (state = 0, action = { type: null }) => {
  switch (action.type) {
    case types.UPDATE_TIMESTAMP:
      return action.timestamp;
    default:
      return state;
  }
};

export const suggestion = (state = false, action = { type: null }) => {
  switch (action.type) {
    case types.TOGGLE_SUGGESTION:
      return action.status;
    default:
      return state;
  }
};

export const transfer = (state = {}, action = { type: null }) => {
  switch (action.type) {
    case types.SUGGEST_TRANSFER:
      return {
        fromId: action.fromId,
        fromStock: action.fromStock,
        toId: action.toId,
        toStock: action.toStock,
        message: action.message,
      };
    case types.RESET_TRANSFER:
      return {
        fromId: '',
        fromStock: '',
        toId: '',
        toStock: '',
        message: '',
      };
    default:
      return state;
  }
};

export const inventory = (state = {}, action = { type: null }) => {
  switch (action.type) {
    case types.ADD_INVENTORY:
      return {
        id: action.id,
        store: action.store,
        product: action.product,
        stock: action.stock,
        timestamp: action.timestamp,
      };
    case types.UPDATE_INVENTORY:
      return (state.id !== action.id) ? state
        : {
          ...state,
          stock: action.stock,
          timestamp: action.timestamp,
        };
    default:
      return state;
  }
};

export const inventories = (state = [], action = { type: null }) => {
  switch (action.type) {
    case types.ADD_INVENTORY:
      return [
        ...state, inventory({}, action),
      ];
    case types.UPDATE_INVENTORY:
      return state.map(
        (item) => inventory(item, action),
      );
    default:
      return state;
  }
};

export const alert = (state = {}, action = { type: null }) => {
  switch (action.type) {
    case types.UPDATE_ALERT:
      return {
        message: action.message,
        severity: action.severity,
      };
    default:
      return state;
  }
};

export const query = (state = {}, action = { type: null }) => {
  switch (action.type) {
    case types.UPDATE_QUERY:
      return {
        store: action.storeQuery,
        product: action.productQuery,
      };
    default:
      return state;
  }
};

export default combineReducers({
  inventories, alert, query, timestamp, suggestion, transfer,
});
