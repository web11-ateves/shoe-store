import { v4 } from 'uuid';
import types from './actionTypes';

export const newInventoryArrived = (store, product, stock, transfer = false) => ({
  type: types.NEW_INVENTORY_ARRIVED,
  store,
  product,
  stock,
  transfer,
});

export const addInventory = (store, product, stock, timestamp) => ({
  type: types.ADD_INVENTORY,
  id: v4(),
  store,
  product,
  stock,
  timestamp,
});

export const updateInventory = (id, stock, timestamp) => ({
  type: types.UPDATE_INVENTORY,
  id,
  stock,
  timestamp,
});

export const toggleSuggestion = (status) => ({
  type: types.TOGGLE_SUGGESTION,
  status,
});

export const suggestTransfer = (fromId, fromStock, toId, toStock, message) => ({
  type: types.SUGGEST_TRANSFER,
  fromId,
  fromStock,
  toId,
  toStock,
  message,
});

export const confirmTransfer = (payload) => ({
  type: types.CONFIRM_INVENTORY_TRANSFER,
  fromId: payload.fromId,
  fromStock: payload.fromStock,
  toId: payload.toId,
  toStock: payload.toStock,
});

export const resetTransfer = () => ({
  type: types.RESET_TRANSFER,
  fromId: '',
  fromStock: '',
  toId: '',
  toStock: '',
  message: '',
});

export const updateAlert = (message, severity) => ({
  type: types.UPDATE_ALERT,
  message,
  severity,
});

export const updateQuery = (storeQuery, productQuery) => ({
  type: types.UPDATE_QUERY,
  storeQuery,
  productQuery,
});

export const updateTimestamp = (timestamp) => ({
  type: types.UPDATE_TIMESTAMP,
  timestamp,
});
